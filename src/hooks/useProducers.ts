import { useQuery } from "@tanstack/react-query";
import { useDispatch, useSelector } from "react-redux";

import { getProducers } from "@/services/producerService";
import { setProducers } from "@/features/productoresSlice";
import type { RootState } from "@/store/GlobalStore";
import type { Producer } from "@/types/types";

export const useProducers = () => {
  const dispatch = useDispatch();
  const { producers } = useSelector((state: RootState) => state.producers);

  const { isLoading, error } = useQuery<Producer[]>({
    queryKey: ["producers"],
    queryFn: async () => {
      const producers = await getProducers();

      dispatch(setProducers(producers));

      return producers;
    },
  });

  return {
    producers,
    isLoading,
    error: error?.message || null,
  };
};
