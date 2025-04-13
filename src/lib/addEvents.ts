// lib/api/create-event.ts
import { ProductEvent } from "@/types";

export async function createEvent(data: Omit<ProductEvent, "id">) {
  const res = await fetch("/api/events/add", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });

  if (!res.ok) {
    const error = await res.json();
    throw new Error(error.error || "Failed to create event");
  }

  return res.json();
}
