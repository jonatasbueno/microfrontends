import React from "react";
import { Box, Text, VStack } from "@chakra-ui/react";

import { useProducers } from "@/hooks/useProducers";
import { Loading } from "@/components/ui/Loading/loading";

const HomePage: React.FC = () => {
  const { producers, isLoadingProducers, error } = useProducers();

  if (isLoadingProducers) return <Loading />;

  if (error)
    return <Box p={4}>Error: {error || "Failed to load producers."}</Box>;

  return (
    <Box p={4}>
      <Text fontSize="2xl" mb={4}>
        Producers List
      </Text>
      {producers.length === 0 ? (
        <Text>No producers found.</Text>
      ) : (
        <VStack align="stretch">
          {producers.map((producer) => (
            <Box
              key={producer.id}
              p={5}
              shadow="md"
              borderWidth="1px"
              borderRadius="md"
            >
              <Text fontWeight="bold">Name: {producer.name}</Text>
              <Text>CPF/CNPJ: {producer.cpfOrCnpj}</Text>
              <Text>City: {producer.city}</Text>
              <Text>State: {producer.state}</Text>
              <Text>Properties: {producer.properties.length}</Text>
            </Box>
          ))}
        </VStack>
      )}
    </Box>
  );
};

export default HomePage;
