import AddProduct from "@/components/dashboard/add-product";
import { AppSidebar } from "@/components/dashboard/app-sidebar";
import ProductsContainer from "@/components/dashboard/product-container";
import { Separator } from "@/components/ui/separator";
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { getAuthenticatedUser } from "@/lib/getUserData";
import { prisma } from "@/lib/prisma";
import { ProductEvent } from "@/types";

// const products = [
//   {
//     id: "1",
//     title: "Wireless Headphones",
//     description: "High-quality noise-canceling headphones.",
//     date: "2025-04-12",
//     price: 129.99,
//     image: "https://images.unsplash.com/photo-1517849845537-4d257902454a",
//   },
//   {
//     id: "2",
//     title: "Gaming Keyboard",
//     description: "RGB mechanical keyboard with blue switches.",
//     date: "2025-04-10",
//     price: 89.99,
//     image: "https://images.unsplash.com/photo-1587202372775-98973d07f3f3",
//   },
// ];

export default async function Page() {
  const { role, id } = await getAuthenticatedUser();
  const events = await prisma.event.findMany({
    orderBy: { date: "desc" },
    where: { user_id: id },
  });

  const formattedEvents: ProductEvent[] = events.map((event) => ({
    ...event,
    id: event.id.toString(),
  }));

  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <header className="flex h-16 shrink-0 items-center gap-2 border-b px-4">
          <SidebarTrigger className="-ml-1" />
          <Separator orientation="vertical" className="mr-2 h-4" />
          <h2>Welcome to your dashboard!</h2>
        </header>

        {role === "admin" && <AddProduct userId={id} />}

        {/* Product Cards */}
        {events ? (
          <ProductsContainer role={role} events={formattedEvents} id={id} />
        ) : (
          <p>No products added yet!</p>
        )}
      </SidebarInset>
    </SidebarProvider>
  );
}
