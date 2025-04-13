// lib/api/update-event.ts
import { ProductEvent } from "@/types";

export async function updateEvent({
  id,
  data,
}: {
  id: string;
  data: Partial<ProductEvent>;
}) {
  const res = await fetch(`/api/events/${id}`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });

  if (!res.ok) {
    const error = await res.json();
    throw new Error(error.error || "Failed to update event");
  }

  return res.json();
}
