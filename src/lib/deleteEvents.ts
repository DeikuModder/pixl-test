// lib/api/delete-event.ts
export async function deleteEvent(id: string) {
  const res = await fetch(`/api/events/${id}`, {
    method: "DELETE",
  });

  if (!res.ok) {
    const error = await res.json();
    throw new Error(error.error || "Failed to delete event");
  }

  return res.json();
}
