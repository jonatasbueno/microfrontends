import {
  Box,
  Text,
  VStack,
  Card,
  Separator,
  ButtonGroup,
  Flex,
  Table,
} from "@chakra-ui/react";

import { useProducers } from "@/hooks/useProducers";
import { formatCpfCnpj } from "@/utils/functions/formatCpfCnpj";
import { Loading } from "@/components/ui/Loading/loading";
import { AlertCustom } from "@/components/ui/Alert/alert";
import { InputCustom } from "@/components/ui/Input/input";
import { EyeButton } from "./components/EyeButton";

export const HomePage: React.FC = () => {
  const {
    error,
    isLoading,
    filteredProducers,
    isMobile,
    searchTerm,
    redirectDetails,
    setSearchTerm,
  } = useProducers();

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

      <Flex
        bg={"white"}
        direction="column"
        p={4}
        gap={4}
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

        {filteredProducers.length === 0 && (
          <Text>Nenhum produtor encontrado.</Text>
        )}

        {filteredProducers.length > 0 && (
          <>
            {isMobile ? (
              <VStack gap={4} align="stretch">
                {filteredProducers.map((producer) => (
                  <Card.Root key={producer.id}>
                    <Card.Body>
                      <Card.Title>{producer.name}</Card.Title>
                      <Card.Description>
                        CPF/CNPJ: {formatCpfCnpj(producer.cpfOrCnpj)}
                      </Card.Description>
                      <Card.Description>
                        Cidade: {producer.city}
                      </Card.Description>
                      <Card.Description>
                        Estado: {producer.state}
                      </Card.Description>
                      <Card.Description>
                        Propriedades: {producer.properties.length}
                      </Card.Description>
                    </Card.Body>
                    <Separator size="sm" my={4} />
                    <ButtonGroup gap={2} p={4}>
                      <EyeButton
                        handleClick={() => redirectDetails(producer.id)}
                      />
                    </ButtonGroup>
                  </Card.Root>
                ))}
              </VStack>
            ) : (
              <Table.Root
                size="md"
                variant="line"
                borderStyle={"solid"}
                borderWidth={"thin"}
              >
                <Table.Header>
                  <Table.Row>
                    <Table.ColumnHeader fontWeight={700}>
                      CPF ou CNPJ
                    </Table.ColumnHeader>
                    <Table.ColumnHeader fontWeight={700}>
                      Nome do Produtor
                    </Table.ColumnHeader>
                    <Table.ColumnHeader fontWeight={700}>
                      Estado
                    </Table.ColumnHeader>
                    <Table.ColumnHeader fontWeight={700}>
                      Cidade
                    </Table.ColumnHeader>
                    <Table.ColumnHeader fontWeight={700}>
                      Ações
                    </Table.ColumnHeader>
                  </Table.Row>
                </Table.Header>
                <Table.Body>
                  {filteredProducers.map((producer) => (
                    <Table.Row key={producer.id}>
                      <Table.Cell>
                        {formatCpfCnpj(producer.cpfOrCnpj)}
                      </Table.Cell>
                      <Table.Cell>{producer.name}</Table.Cell>
                      <Table.Cell>{producer.state}</Table.Cell>
                      <Table.Cell>{producer.city}</Table.Cell>
                      <Table.Cell>
                        <EyeButton
                          handleClick={() => redirectDetails(producer.id)}
                        />
                      </Table.Cell>
                    </Table.Row>
                  ))}
                </Table.Body>
              </Table.Root>
            )}
          </>
        )}
      </Flex>
    </>
  );
};
