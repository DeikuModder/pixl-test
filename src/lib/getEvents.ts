// lib/api/get-events.ts
export async function getProductEvents({ id }: { id: string }) {
  try {
    const res = await fetch(`/api/events/${id}`, {
      cache: "no-store",
    });

    return res.json();
  } catch (error) {
    console.log(error);
  }
}
