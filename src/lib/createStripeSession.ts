// lib/api/create-stripe-session.ts
export async function createStripeSession({
  title,
  price,
  email,
  id,
  user_id,
}: {
  title: string;
  price: number;
  email: string;
  id: string;
  user_id: string;
}) {
  const res = await fetch("/api/checkout", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ title, price, id, email, user_id }),
  });

  if (!res.ok) {
    const { error } = await res.json();
    throw new Error(error || "Checkout session creation failed");
  }

  const { url } = await res.json();
  return url;
}
