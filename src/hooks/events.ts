import { createEvent } from "@/lib/addEvents";
import { deleteEvent } from "@/lib/deleteEvents";
import { getProductEvents } from "@/lib/getEvents";
import { updateEvent } from "@/lib/updateEvents";
import { ProductEvent } from "@/types";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

const key = "events";

export function useProductEvent({
  id,
  initialProducts,
}: {
  id: string;
  initialProducts: ProductEvent[];
}) {
  return useQuery({
    queryKey: [key],
    queryFn: () => getProductEvents({ id }),
    initialData: initialProducts,
    staleTime: 60 * 1000,
  });
}

export function useAddProductEvent() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createEvent,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [key] });
    },
  });
}

export function useDeleteProductEvent() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteEvent,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [key] });
    },
  });
}

export function useUpdateProductEvent() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: updateEvent,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [key] });
    },
  });
}
