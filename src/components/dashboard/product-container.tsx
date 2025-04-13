"use client";

import { ProductEvent } from "@/types";
import SellingProducts from "./selling-products";
import { useProductEvent } from "@/hooks/events";

const ProductsContainer = ({
  events,
  role,
  id,
}: {
  events: ProductEvent[];
  role: "admin" | "user";
  id: string;
}) => {
  const { data: productEvents = [] } = useProductEvent({
    id,
    initialProducts: events,
  });

  return (
    <div className="p-4 flex flex-wrap items-center gap-4">
      {productEvents.map((product: ProductEvent) => (
        <SellingProducts
          key={product.id}
          {...product}
          idFromUser={id}
          role={role}
        />
      ))}
    </div>
  );
};

export default ProductsContainer;
