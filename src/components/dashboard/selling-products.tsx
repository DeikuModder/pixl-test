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
import Image from "next/image";
import { createStripeSession } from "@/lib/createStripeSession";

type SellingProductProps = {
  id: string;
  idFromUser: string;
  email: string;
  role: "admin" | "user";
  title: string;
  description: string;
  date: string;
  price: number;
  user_id: string;
  image_url: string | null;
};

const SellingProducts = ({
  id,
  idFromUser,
  email,
  role,
  title,
  description,
  date,
  price,
  user_id,
  image_url,
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
      {image_url && (
        <div className="h-[200px] w-full relative overflow-hidden rounded-md">
          <Image
            src={image_url}
            alt={title}
            width={300}
            height={200}
            className="object-cover object-center"
          />
        </div>
      )}

      <div className="space-y-1">
        <h2 className="text-lg font-semibold">{title}</h2>
        <p className="text-muted-foreground text-sm">{description}</p>
        <p className="text-muted-foreground font-semibold">{date}</p>
        <p className="text-primary font-bold">${price}</p>
      </div>

      {role === "admin" && idFromUser === user_id ? (
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
                  defaultValue={image_url ? image_url : ""}
                  name="image"
                />
                <DialogFooter>
                  <Button
                    type="submit"
                    disabled={isPendingUpdate}
                    className="bg-[#1b871b] hover:bg-[#52b452]"
                  >
                    {isPendingUpdate ? "Updating..." : "Save"}
                  </Button>
                </DialogFooter>
              </form>
            </DialogContent>
          </Dialog>

          {/* Delete Dialog */}
          <Dialog open={deleteOpen} onOpenChange={setDeleteOpen}>
            <DialogTrigger asChild>
              <Button
                variant="destructive"
                size="sm"
                className="bg-[#1b871b] hover:bg-[#52b452]"
              >
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
                  className="bg-[#1b871b] hover:bg-[#52b452]"
                >
                  {isPending ? "Deleting..." : "Confirm Delete"}
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
      ) : (
        <Button
          variant="outline"
          size="sm"
          onClick={async () => {
            try {
              const url = await createStripeSession({
                title,
                price,
                id,
                email,
                user_id: idFromUser,
              });
              window.location.href = url; // Redirect to Stripe
            } catch (err) {
              console.log(err);
            }
          }}
        >
          Buy
        </Button>
      )}
    </article>
  );
};

export default SellingProducts;
