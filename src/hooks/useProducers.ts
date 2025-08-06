import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router";
import { useQuery } from "@tanstack/react-query";
import { useBreakpointValue } from "@chakra-ui/react/hooks";

import { getProducers } from "@/services/producerService";
import { setProducers } from "@/features/productoresSlice";
import { useDebounce } from "@/hooks/useDebounce";
import type { RootState } from "@/store/GlobalStore";
import type { Producer } from "@/types/types";

export const useProducers = () => {
  const dispatch = useDispatch();
  const { producers } = useSelector((state: RootState) => state.producers);
  const [searchTerm, setSearchTerm] = useState("");
  const debouncedSearchTerm = useDebounce(searchTerm, 500);
  const navigate = useNavigate();
  const isMobile = useBreakpointValue({ base: true, md: false });

  const { isLoading, error } = useQuery<Producer[]>({
    queryKey: ["producers"],
    queryFn: async () => {
      const producers = await getProducers();

      dispatch(setProducers(producers));

      return producers;
    },
  });

  const filteredProducers = producers.filter(
    (producer: Producer) =>
      producer.name.toLowerCase().includes(debouncedSearchTerm.toLowerCase()) ||
      producer.cpfOrCnpj.includes(debouncedSearchTerm)
  );

  const redirectDetails = (id: string) => navigate(`/details/${id}`);

  return {
    isLoading,
    error: error?.message || null,
    filteredProducers,
    isMobile,
    searchTerm,
    redirectDetails,
    setSearchTerm,
  };
};
