// /app/api/auth/me/route.ts
import { NextRequest, NextResponse } from "next/server";
import { verifyJWT } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export async function GET(req: NextRequest) {
  const token = req.cookies.get("token")?.value;

  if (!token) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const decoded = verifyJWT(token);
    const user = await prisma.user.findUnique({
      where: { id: decoded.userId },
    });

    if (!user)
      return NextResponse.json({ error: "Not found" }, { status: 404 });

    return NextResponse.json({
      user: {
        id: user.id.toString(),
        email: user.email,
        role: user.role as "admin" | "user",
        username: user.username,
      },
    });
  } catch (err) {
    console.log(err);
    return NextResponse.json({ error: "Invalid token" }, { status: 401 });
  }
}
