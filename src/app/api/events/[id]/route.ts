// /app/api/events/[id]/route.ts
import { prisma } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

type Context = {
  params: {
    id: string;
  };
};

export async function GET(_: Request, { params }: Context) {
  try {
    const { id } = await params;

    const event = await prisma.event.findMany({
      where: { user_id: id },
    });

    if (!event) {
      return NextResponse.json({ error: "Event not found" }, { status: 404 });
    }

    const formattedEvents = event.map((event) => {
      return { ...event, id: event.id.toString() };
    });

    return NextResponse.json(formattedEvents);
  } catch (err) {
    console.error("Error fetching event:", err);
    return NextResponse.json(
      { error: "Failed to fetch event" },
      { status: 500 }
    );
  }
}

export async function DELETE(_: Request, { params }: Context) {
  try {
    const { id } = await params;

    const formattedId = Number(id);

    if (isNaN(formattedId)) {
      return NextResponse.json({ error: "Invalid ID" }, { status: 400 });
    }

    await prisma.event.delete({
      where: { id: formattedId },
    });

    return NextResponse.json(
      { message: "Event deleted successfully" },
      { status: 200 }
    );
  } catch (err) {
    console.error("Error fetching event:", err);
    return NextResponse.json(
      { error: "Failed to fetch event" },
      { status: 500 }
    );
  }
}

export async function PATCH(req: NextRequest, { params }: Context) {
  const { id } = await params;

  const formattedId = Number(id);

  if (isNaN(formattedId)) {
    return NextResponse.json({ error: "Invalid ID" }, { status: 400 });
  }

  try {
    const { title, description, date, price, image } = await req.json();

    const updated = await prisma.event.update({
      where: { id: formattedId },
      data: {
        ...(title && { title }),
        ...(description && { description }),
        ...(date && { date }),
        ...(price && { price: Number(price) }),
        ...(image && { image }),
      },
    });

    return NextResponse.json({ ...updated, id: updated.id.toString() });
  } catch (error) {
    console.error("Error updating event:", error);
    return NextResponse.json(
      { error: "Failed to update event" },
      { status: 500 }
    );
  }
}
