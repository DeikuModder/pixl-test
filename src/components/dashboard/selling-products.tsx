"use client";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { FormEventHandler, useState } from "react";
import { useDeleteProductEvent, useUpdateProductEvent } from "@/hooks/events";

type SellingProductProps = {
  id: string;
  role: "admin" | "user";
  title: string;
  description: string;
  date: string;
  price: number;
  image?: string;
};

const SellingProducts = ({
  id,
  role,
  title,
  description,
  date,
  price,
  image,
}: SellingProductProps) => {
  const [editOpen, setEditOpen] = useState(false);
  const [deleteOpen, setDeleteOpen] = useState(false);
  const { mutate: deleteEvent, isPending } = useDeleteProductEvent();
  const { mutate: updateEvent, isPending: isPendingUpdate } =
    useUpdateProductEvent();

  const handleEdit: FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const update = {
      title: formData.get("title") as string,
      description: formData.get("description") as string,
      date: formData.get("date") as string,
      price: Number(formData.get("price")),
      image: formData.get("image") as string,
    };

    updateEvent(
      { id: id, data: update },
      {
        onSuccess: () => {
          setEditOpen(false);
        },
      }
    );
  };

  const handleDelete = async () => {
    deleteEvent(id, {
      onSuccess: () => {
        setDeleteOpen(false);
      },
    });
  };

  return (
    <article className="w-[300px] h-[400px] border border-muted rounded-2xl p-4 shadow-sm bg-background flex flex-col justify-between gap-2">
      {image && (
        <div className="h-[150px] w-full relative overflow-hidden rounded-md">
          <img src={image} alt={title} className="object-cover object-center" />
        </div>
      )}

      <div className="space-y-1">
        <h2 className="text-lg font-semibold">{title}</h2>
        <p className="text-muted-foreground text-sm">{description}</p>
        <p className="text-muted-foreground font-semibold">{date}</p>
        <p className="text-primary font-bold">${price}</p>
      </div>

      {role === "admin" ? (
        <div className="flex justify-end gap-2 mt-2">
          {/* Edit Dialog */}
          <Dialog open={editOpen} onOpenChange={setEditOpen}>
            <DialogTrigger asChild>
              <Button variant="outline" size="sm">
                Edit
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Edit Product</DialogTitle>
                <DialogDescription>
                  Update the details of your product.
                </DialogDescription>
              </DialogHeader>
              <form onSubmit={handleEdit} className="space-y-4">
                <Input placeholder="Title" defaultValue={title} name="title" />
                <Textarea
                  placeholder="Description"
                  defaultValue={description}
                  name="description"
                />
                <Input
                  type="number"
                  placeholder="Price"
                  defaultValue={price}
                  name="price"
                />
                <Input
                  type="url"
                  placeholder="Image URL (optional)"
                  defaultValue={image}
                  name="image"
                />
                <DialogFooter>
                  <Button type="submit" disabled={isPendingUpdate}>
                    {isPendingUpdate ? "Updating..." : "Save"}
                  </Button>
                </DialogFooter>
              </form>
            </DialogContent>
          </Dialog>

          {/* Delete Dialog */}
          <Dialog open={deleteOpen} onOpenChange={setDeleteOpen}>
            <DialogTrigger asChild>
              <Button variant="destructive" size="sm">
                Delete
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Are you sure?</DialogTitle>
                <DialogDescription>
                  This action cannot be undone. This will permanently delete
                  your product.
                </DialogDescription>
              </DialogHeader>
              <DialogFooter>
                <Button variant="ghost" onClick={() => setDeleteOpen(false)}>
                  Cancel
                </Button>
                <Button
                  variant="destructive"
                  onClick={handleDelete}
                  disabled={isPending}
                >
                  {isPending ? "Deleting..." : "Confirm Delete"}
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
      ) : (
        <Dialog open={editOpen} onOpenChange={setEditOpen}>
          <DialogTrigger asChild>
            <Button variant="outline" size="sm">
              Buy
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Buy Product</DialogTitle>
              <DialogDescription>
                Update the details of your product.
              </DialogDescription>
            </DialogHeader>
          </DialogContent>
        </Dialog>
      )}
    </article>
  );
};

export default SellingProducts;
