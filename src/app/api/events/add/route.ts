// /app/api/events/[id]/route.ts
import { prisma } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const { title, description, price, date, user_id, image_url } =
      await req.json();

    if (!title || !description || !price || !date || !user_id) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    const parsedUserId = String(user_id); // just in case
    const parsedPrice = Number(price);

    const event = await prisma.event.create({
      data: {
        title,
        description,
        price: parsedPrice,
        date,
        user_id: parsedUserId,
        // image is optional, so we include it conditionally
        ...(image_url && { image_url }),
      },
    });

    return NextResponse.json(
      { ...event, id: event.id.toString() },
      { status: 201 }
    );
  } catch (error) {
    console.error("Failed to create event:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
