"use client";

import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useRef, useState } from "react";
import { useAddProductEvent } from "@/hooks/events";
import { format } from "date-fns";
import { uploadImage } from "@/lib/supabase";
import { Label } from "../ui/label";

type AddProductProps = {
  userId: string;
};

const AddProduct = ({ userId }: AddProductProps) => {
  const formRef = useRef<HTMLFormElement>(null);
  const [open, setOpen] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const { mutate, isPending } = useAddProductEvent();

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setSelectedFile(e.target.files[0]);
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsUploading(true);

    const formData = new FormData(e.currentTarget);
    let imageUrl = "";

    try {
      // Upload image if selected
      if (selectedFile) {
        // Add timestamp to filename to make it unique
        const timestamp = Date.now();
        const fileExt = selectedFile.name.split(".").pop();
        const fileName = `${timestamp}.${fileExt}`;
        const filePath = `products/${userId}/${fileName}`;

        imageUrl = await uploadImage("events-images", filePath, selectedFile);
      }

      const newProduct = {
        title: formData.get("title") as string,
        description: formData.get("description") as string,
        date: format(new Date(), "MM-dd-yyyy"),
        price: Number(formData.get("price")),
        image_url: imageUrl,
        user_id: userId,
      };

      mutate(newProduct, {
        onSuccess: (data) => {
          setOpen(false);
          console.log(data);

          setSelectedFile(null);
          formRef.current?.reset();
        },
        onSettled: () => {
          setIsUploading(false);
        },
      });
    } catch (error) {
      console.error("Error uploading image:", error);
      setIsUploading(false);
      // You might want to add error handling here (toast notification, etc.)
    }
  };

  return (
    <div className="p-4">
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
          <Button className="bg-[#1b871b] hover:bg-[#52b452]">
            Add New Product
          </Button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Add a New Product</DialogTitle>
            <DialogDescription>
              Fill out the form to add a new product to your store.
            </DialogDescription>
          </DialogHeader>
          <form onSubmit={handleSubmit} className="space-y-4" ref={formRef}>
            <Input name="title" placeholder="Title" required />
            <Textarea name="description" placeholder="Description" required />
            <Input
              name="price"
              type="number"
              placeholder="Price"
              required
              min="0"
              step="0.01"
            />
            <div className="grid w-full max-w-sm items-center gap-1.5">
              <Label htmlFor="picture">Product Image (optional)</Label>
              <Input
                id="picture"
                type="file"
                accept="image/*"
                onChange={handleFileChange}
              />
              {selectedFile && (
                <div className="text-sm text-muted-foreground">
                  Selected: {selectedFile.name}
                </div>
              )}
            </div>
            <DialogFooter>
              <Button
                type="submit"
                disabled={isPending || isUploading}
                className="bg-[#1b871b] hover:bg-[#52b452]"
              >
                {isPending || isUploading ? "Processing..." : "Create Product"}
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default AddProduct;
