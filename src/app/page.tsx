import SellingProducts from "@/components/dashboard/selling-products";
import LogoutBtn from "@/components/logout-button";
import { getAuthenticatedUser } from "@/lib/getUserData";
import { prisma } from "@/lib/prisma";
import { ProductEvent } from "@/types";
import Link from "next/link";

export default async function Home() {
  const events = await prisma.event.findMany({
    orderBy: { date: "desc" },
  });

  const formattedEvents: ProductEvent[] = events.map((event) => ({
    ...event,
    id: event.id.toString(),
  }));

  const { role } = await getAuthenticatedUser();
  return (
    <div>
      <h1>Welcome</h1>
      <Link href="/dashboard">Dashboard</Link>
      <LogoutBtn />
      <div className="p-4 flex flex-wrap items-center gap-4">
        {formattedEvents.map((product: ProductEvent) => (
          <SellingProducts key={product.id} {...product} role={role} />
        ))}
      </div>
    </div>
  );
}
