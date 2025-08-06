import React, { useState } from "react";
import {
  Box,
  Text,
  VStack,
  Button,
  useBreakpointValue,
  Card,
  Separator,
  ButtonGroup,
  Flex,
} from "@chakra-ui/react";
import { Table } from "@chakra-ui/react";
import { useNavigate } from "react-router";
import { useProducers } from "../hooks/useProducers";
import useDebounce from "../hooks/useDebounce";
import type { Producer } from "../types/types";
import { Loading } from "@/components/ui/Loading/loading";
import { AlertCustom } from "@/components/ui/Alert/alert";
import { InputCustom } from "@/components/ui/Input/input";

export const HomePage: React.FC = () => {
  const { producers, error, isLoading } = useProducers();
  const [searchTerm, setSearchTerm] = useState("");
  const debouncedSearchTerm = useDebounce(searchTerm, 500);
  const navigate = useNavigate();
  const isMobile = useBreakpointValue({ base: true, md: false });

  const filteredProducers = producers.filter(
    (producer: Producer) =>
      producer.name.toLowerCase().includes(debouncedSearchTerm.toLowerCase()) ||
      producer.cpfOrCnpj.includes(debouncedSearchTerm)
  );

  const handleDetailsClick = (id: string) => navigate(`/details/${id}`);

  if (isLoading) {
    return <Loading />;
  }

  if (error) {
    return (
      <AlertCustom title="Erro" description="Erro ao carregar produtores" />
    );
  }

  return (
    <>
      <Text textStyle="2xl" mb={4}>
        Lista de Produtores
      </Text>

      {filteredProducers.length === 0 ? (
        <Text>Nenhum produtor encontrado.</Text>
      ) : (
        <Flex
          bg={"white"}
          direction="column"
          p={4}
          borderRadius="md"
          boxShadow="sm"
        >
          <Box borderRadius="md" boxShadow="sm">
            <InputCustom
              placeholder="Buscar por nome ou CPF/CNPJ..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </Box>

          {isMobile ? (
            <VStack gap={4} align="stretch">
              {filteredProducers.map((producer) => (
                <Card.Root key={producer.id}>
                  <Card.Body>
                    <Card.Title>{producer.name}</Card.Title>
                    <Card.Description>
                      CPF/CNPJ: {producer.cpfOrCnpj}
                    </Card.Description>
                    <Card.Description>Cidade: {producer.city}</Card.Description>
                    <Card.Description>
                      Estado: {producer.state}
                    </Card.Description>
                    <Card.Description>
                      Propriedades: {producer.properties.length}
                    </Card.Description>
                  </Card.Body>
                  <Separator size="sm" my={4} />
                  <ButtonGroup gap={2} p={4}>
                    <Button
                      colorScheme="blue"
                      onClick={() => handleDetailsClick(producer.id)}
                    >
                      Detalhes
                    </Button>
                  </ButtonGroup>
                </Card.Root>
              ))}
            </VStack>
          ) : (
            <Table.Root size="md" variant="line">
              <Table.Header>
                <Table.Row>
                  <Table.ColumnHeader fontWeight={700} fontSize={"md"}>
                    CPF ou CNPJ
                  </Table.ColumnHeader>
                  <Table.ColumnHeader fontWeight={700} fontSize={"md"}>
                    Nome do Produtor
                  </Table.ColumnHeader>
                  <Table.ColumnHeader fontWeight={700} fontSize={"md"}>
                    Estado
                  </Table.ColumnHeader>
                  <Table.ColumnHeader fontWeight={700} fontSize={"md"}>
                    Cidade
                  </Table.ColumnHeader>
                  <Table.ColumnHeader fontWeight={700} fontSize={"md"}>
                    Ações
                  </Table.ColumnHeader>
                </Table.Row>
              </Table.Header>
              <Table.Body>
                {filteredProducers.map((producer) => (
                  <Table.Row key={producer.id}>
                    <Table.Cell>{producer.cpfOrCnpj}</Table.Cell>
                    <Table.Cell>{producer.name}</Table.Cell>
                    <Table.Cell>{producer.state}</Table.Cell>
                    <Table.Cell>{producer.city}</Table.Cell>
                    <Table.Cell>
                      <Button
                        size="sm"
                        colorScheme="blue"
                        onClick={() => handleDetailsClick(producer.id)}
                      >
                        Detalhes
                      </Button>
                    </Table.Cell>
                  </Table.Row>
                ))}
              </Table.Body>
            </Table.Root>
          )}
        </Flex>
      )}
    </>
  );
};
