import React from 'react';
import {
  Box,
  Text,
  VStack,
  SimpleGrid,
  Heading,
  Separator,
  Accordion,
  useDisclosure,
} from '@chakra-ui/react';
import { Table } from '@chakra-ui/react';
import { useParams, useNavigate } from 'react-router';
import { useSelector } from 'react-redux';
import { type RootState } from '@/store/GlobalStore';
import { formatCpfCnpj } from '../utils/functions/formatCpfCnpj';
import { PairButton } from '@/components/ui/PairButton/PairButton';
import { ProducerFormModal } from '@/components/container/ProducerFormModal';

export const DetailsPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { open, onOpen, onClose } = useDisclosure();
  const { producers } = useSelector((state: RootState) => state.producers);
  const producer = producers.find((p) => p.id === id)!;

  const groupCulturesByYear = (cultures: any[]) => {
    const grouped: Record<string, any[]> = {};
    cultures.forEach((culture) => {
      (grouped[culture.year] ??= []).push(culture);
    });
    return Object.entries(grouped).sort(([a], [b]) => Number(b) - Number(a));
  };

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
            </Text>{' '}
            {producer?.name}
          </Text>
          <Text>
            <Text as="span" fontWeight="bold">
              CPF/CNPJ:
            </Text>{' '}
            {formatCpfCnpj(producer?.cpfOrCnpj).value}
          </Text>
          <Text>
            <Text as="span" fontWeight="bold">
              Cidade:
            </Text>{' '}
            {producer?.city}
          </Text>
          <Text>
            <Text as="span" fontWeight="bold">
              Estado:
            </Text>{' '}
            {producer?.state}
          </Text>
        </SimpleGrid>
      </Box>

      <Box bg="bg.surface" p={6} borderRadius="md" boxShadow="sm" mb={6}>
        <Heading as="h2" size="lg" mb={4}>
          Propriedades Rurais
        </Heading>
        {producer?.properties?.length === 0 ? (
          <Text>Nenhuma propriedade cadastrada para este produtor.</Text>
        ) : (
          <Accordion allowMultiple>
            {producer?.properties.map((property) => (
              <AccordionItem key={property.id}>
                <h2>
                  <AccordionButton>
                    <Box flex="1" textAlign="left">
                      <Text fontWeight="bold">{property.farmName}</Text>
                    </Box>
                    <AccordionIcon />
                  </AccordionButton>
                </h2>
                <AccordionPanel pb={4}>
                  <SimpleGrid columns={{ base: 1, md: 2 }} gap={2} mb={4}>
                    <Text>
                      <Text as="span" fontWeight="bold">
                        Cidade:
                      </Text>{' '}
                      {property.city}
                    </Text>
                    <Text>
                      <Text as="span" fontWeight="bold">
                        Estado:
                      </Text>{' '}
                      {property.state}
                    </Text>
                    <Text>
                      <Text as="span" fontWeight="bold">
                        Área Total (ha):
                      </Text>{' '}
                      {property.totalArea}
                    </Text>
                    <Text>
                      <Text as="span" fontWeight="bold">
                        Área Agricultável (ha):
                      </Text>{' '}
                      {property.arableArea}
                    </Text>
                    <Text>
                      <Text as="span" fontWeight="bold">
                        Área de Vegetação (ha):
                      </Text>{' '}
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
                      {groupCulturesByYear(property.cultures).map(
                        ([year, cultures]) => (
                          <Box key={year} width="100%">
                            <Text fontWeight="semibold" mt={2}>
                              Ano: {year}
                            </Text>
                            <Table.Root size="sm" variant="simple">
                              <Table.Header>
                                <Table.Row>
                                  <Table.ColumnHeader>Nome</Table.ColumnHeader>
                                  <Table.ColumnHeader>Ano</Table.ColumnHeader>
                                </Table.Row>
                              </Table.Header>
                              <Table.Body>
                                {cultures.map((culture) => (
                                  <Table.Row key={culture.id}>
                                    <Table.Cell>{culture.name}</Table.Cell>
                                    <Table.Cell>{culture.year}</Table.Cell>
                                  </Table.Row>
                                ))}
                              </Table.Body>
                            </Table.Root>
                          </Box>
                        ),
                      )}
                    </VStack>
                  )}
                </AccordionPanel>
              </AccordionItem>
            ))}
          </Accordion>
        )}
      </Box>

      <PairButton
        primary={{ title: 'Voltar', onClick: () => navigate(-1) }}
        secondary={{ title: 'Editar', onClick: onOpen }}
      />

      <ProducerFormModal isOpen={open} onClose={onClose} producer={producer} />
    </Box>
  );
};
