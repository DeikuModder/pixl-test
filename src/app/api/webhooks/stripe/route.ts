import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";
import { prisma } from "@/lib/prisma";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: "2025-03-31.basil",
});

const endpointSecret = process.env.STRIPE_WEBHOOK_SECRET!;

export async function POST(req: NextRequest) {
  const body = await req.text();
  const sig = req.headers.get("stripe-signature");

  let event: Stripe.Event;

  try {
    if (!sig) throw new Error("Missing Stripe signature");

    event = stripe.webhooks.constructEvent(body, sig, endpointSecret);
  } catch (err) {
    console.error("Webhook signature verification failed:", err);
    return new Response("Webhook Error", { status: 400 });
  }

  if (event.type === "checkout.session.completed") {
    const session = event.data.object as Stripe.Checkout.Session;

    const metadata = session.metadata;
    const event_id = metadata?.event_id;
    const user_id = metadata?.user_id ?? "";

    // // Simulated user_id — in production you'd store it via metadata or in your DB
    // const user_id = session.customer_email || "guest@example.com";

    try {
      await prisma.transaction.create({
        data: {
          event_id: event_id || "unknown",
          user_id,
          status: session.payment_status || "unknown",
          price: session.amount_total ? session.amount_total / 100 : 0,
        },
      });

      console.log("✅ Transaction created for event:", event_id);
    } catch (dbErr) {
      console.error("❌ DB insert failed:", dbErr);
    }
  }

  return NextResponse.json({ received: true });
}
