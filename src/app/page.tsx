import SellingProducts from "@/components/dashboard/selling-products";
import LogoutBtn from "@/components/logout-button";
import { getAuthenticatedUser } from "@/lib/getUserData";
import { prisma } from "@/lib/prisma";
import { ProductEvent } from "@/types";
import Link from "next/link";
import { LayoutDashboard } from "lucide-react";
import TypewriterWrap from "@/components/typewriter";

export default async function Home() {
  const events = await prisma.event.findMany({
    orderBy: { date: "desc" },
  });

  const formattedEvents: ProductEvent[] = events.map((event) => ({
    ...event,
    id: event.id.toString(),
  }));

  const { role, id, email } = await getAuthenticatedUser();

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-white to-[#acacff]">
      {/* Header */}
      <header className="flex items-center justify-between p-4 border-b shadow-md text-white bg-[#1c1c87]">
        <Link
          href="/"
          className="text-xl font-bold tracking-tight hover:opacity-80 transition-opacity"
        >
          Pixl<span className="text-[#b45252]">Hub</span>
        </Link>

        <div className="flex items-center gap-4">
          <Link
            href="/dashboard"
            className="inline-flex items-center gap-1 text-sm font-medium hover:underline"
          >
            <LayoutDashboard size={18} />
            Dashboard
          </Link>
          <LogoutBtn />
        </div>
      </header>

      {/* Hero */}
      <section className="flex flex-col items-center justify-center text-center py-12 px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 text-gray-900">
          The best{" "}
          <span className=" text-[#b45252]">
            <TypewriterWrap />
          </span>
        </h1>
        <p className="text-muted-foreground max-w-xl mt-2">
          Discover our marketplace full of great offers and the best products
          available.
        </p>
      </section>

      {/* Products */}
      <section className="p-4 sm:p-6 md:p-8 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 place-items-center">
        {formattedEvents.map((product: ProductEvent) => (
          <SellingProducts
            key={product.id}
            {...product}
            role={role}
            idFromUser={id}
            email={email}
          />
        ))}
      </section>
    </div>
  );
}
