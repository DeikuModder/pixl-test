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

type AddProductProps = {
  userId: string;
};

const AddProduct = ({ userId }: AddProductProps) => {
  const formRef = useRef<HTMLFormElement>(null);
  const [open, setOpen] = useState(false);
  const { mutate, isPending } = useAddProductEvent();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const newProduct = {
      title: formData.get("title") as string,
      description: formData.get("description") as string,
      date: format(new Date(), "MM-dd-yyyy"),
      price: Number(formData.get("price")),
      image: formData.get("image") as string,
      user_id: userId,
    };

    mutate(newProduct, {
      onSuccess: () => {
        setOpen(false);
      },
    });
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
            <Input name="price" type="number" placeholder="Price" required />
            <Input name="image" type="url" placeholder="Image URL (optional)" />
            <DialogFooter>
              <Button
                type="submit"
                disabled={isPending}
                className="bg-[#1b871b] hover:bg-[#52b452]"
              >
                {isPending ? "Creating..." : "Create Product"}
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default AddProduct;
