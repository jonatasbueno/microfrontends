import React from "react";
import {
  Box,
  Text,
  VStack,
  SimpleGrid,
  Heading,
  Separator,
} from "@chakra-ui/react";
import { useParams, useNavigate } from "react-router";
import { useSelector } from "react-redux";
import { type RootState } from "@/store/GlobalStore";
import { formatCpfCnpj } from "../utils/functions/formatCpfCnpj";
import { PairButton } from "@/components/ui/PairButton/PairButton";

export const DetailsPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { producers } = useSelector((state: RootState) => state.producers);
  const producer = producers.find((p) => p.id === id)!;

  return (
    <Box p={4}>
      <Heading as="h1" size="xl" mb={6}>
        Detalhes do Produtor
      </Heading>

      <Box bg="bg.surface" p={6} borderRadius="md" boxShadow="sm" mb={6}>
        <Heading as="h2" size="lg" mb={4}>
          Dados Cadastrais
        </Heading>
        <SimpleGrid columns={{ base: 1, md: 2 }} gap={4}>
          <Text>
            <Text as="span" fontWeight="bold">
              Nome:
            </Text>{" "}
            {producer.name}
          </Text>
          <Text>
            <Text as="span" fontWeight="bold">
              CPF/CNPJ:
            </Text>{" "}
            {formatCpfCnpj(producer.cpfOrCnpj).value}
          </Text>
          <Text>
            <Text as="span" fontWeight="bold">
              Cidade:
            </Text>{" "}
            {producer.city}
          </Text>
          <Text>
            <Text as="span" fontWeight="bold">
              Estado:
            </Text>{" "}
            {producer.state}
          </Text>
        </SimpleGrid>
      </Box>

      <Box bg="bg.surface" p={6} borderRadius="md" boxShadow="sm" mb={6}>
        <Heading as="h2" size="lg" mb={4}>
          Propriedades Rurais
        </Heading>
        {producer.properties.length === 0 ? (
          <Text>Nenhuma propriedade cadastrada para este produtor.</Text>
        ) : (
          <VStack gap={8} align="stretch">
            {producer.properties.map((property) => (
              <Box
                key={property.id}
                p={4}
                borderWidth="1px"
                borderRadius="md"
                boxShadow="sm"
              >
                <Heading as="h3" size="md" mb={2}>
                  {property.farmName}
                </Heading>
                <SimpleGrid columns={{ base: 1, md: 2 }} gap={2} mb={4}>
                  <Text>
                    <Text as="span" fontWeight="bold">
                      Cidade:
                    </Text>{" "}
                    {property.city}
                  </Text>
                  <Text>
                    <Text as="span" fontWeight="bold">
                      Estado:
                    </Text>{" "}
                    {property.state}
                  </Text>
                  <Text>
                    <Text as="span" fontWeight="bold">
                      Área Total (ha):
                    </Text>{" "}
                    {property.totalArea}
                  </Text>
                  <Text>
                    <Text as="span" fontWeight="bold">
                      Área Agricultável (ha):
                    </Text>{" "}
                    {property.arableArea}
                  </Text>
                  <Text>
                    <Text as="span" fontWeight="bold">
                      Área de Vegetação (ha):
                    </Text>{" "}
                    {property.vegetationArea}
                  </Text>
                </SimpleGrid>

                <Separator my={2} />
                <Text fontWeight="bold" mb={2}>
                  Culturas:
                </Text>
                {property.cultures.length === 0 ? (
                  <Text fontSize="sm">
                    Nenhuma cultura cadastrada para esta propriedade.
                  </Text>
                ) : (
                  <VStack align="start" gap={1} pl={4}>
                    {property.cultures.map((culture) => (
                      <Text key={culture.id} fontSize="sm">
                        - {culture.name} ({culture.year})
                      </Text>
                    ))}
                  </VStack>
                )}
              </Box>
            ))}
          </VStack>
        )}
      </Box>

      <PairButton
        primary={{
          title: "Voltar",
          onClick: () => navigate(-1),
        }}
        secondary={{
          title: "Editar",
          onClick: () => console.log("Editar Produtor"),
        }}
      />
    </Box>
  );
};
