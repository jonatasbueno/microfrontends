import React from 'react';
import { useNavigate } from 'react-router';
import {
  Box,
  Text,
  VStack,
  SimpleGrid,
  Heading,
  Button,
} from '@chakra-ui/react';
import { ResponsivePie } from '@nivo/pie';
import { Card } from '@chakra-ui/react';

import { useDashboard } from '@/hooks/useDashboard';
import { commonPieProps } from '@/utils/constants';
import { SelectCustom, type SelectValue } from './components/Select';

export const DashboardPage: React.FC = () => {
  const {
    totalProducers,
    totalFarms,
    totalHectares,
    pieDataCulture,
    pieDataLandUse,
    pieDataState,
    listCollectionCrops,
    listCollectionStates,
    listCollectionCultures,
    setFilterByCrop,
    setFilterByState,
    setFilterByCulture,
  } = useDashboard();
  const navigate = useNavigate();
  const SelectCustomProperties = [
    {
      id: 'crop',
      collention: listCollectionCrops,
      placeholder: 'Filtrar por Safra',
      onSelect: (value: SelectValue) => setFilterByCrop(value.value),
      onClear: () => setFilterByCrop(''),
    },
    {
      id: 'state',
      collention: listCollectionStates,
      placeholder: 'Filtrar por Estado',
      onSelect: (value: SelectValue) => setFilterByState(value.value),
      onClear: () => setFilterByState(''),
    },
    {
      id: 'culture',
      collention: listCollectionCultures,
      placeholder: 'Filtrar por Cultura',
      onSelect: (value: SelectValue) => setFilterByCulture(value.value),
      onClear: () => setFilterByCulture(''),
    },
  ];

  return (
    <Box p={4}>
      <Heading as="h1" size="xl" mb={6}>
        Dashboard de Indicadores
      </Heading>

      <SimpleGrid columns={{ base: 1, md: 3 }} gap={4} mb={6}>
        <Card.Root variant="outline" bg="blue.50" boxShadow="sm">
          <Card.Body gap="2">
            <Text fontSize="lg" fontWeight="bold">
              Total de Produtores
            </Text>
            <Text fontSize="4xl" fontWeight="extrabold">
              {totalProducers}
            </Text>
          </Card.Body>
        </Card.Root>

        <Card.Root variant="outline" bg="blue.50" boxShadow="sm">
          <Card.Body gap="2">
            <Text fontSize="lg" fontWeight="bold">
              Total de Fazendas
            </Text>
            <Text fontSize="4xl" fontWeight="extrabold">
              {totalFarms}
            </Text>
          </Card.Body>
        </Card.Root>

        <Card.Root variant="outline" bg="blue.50" boxShadow="sm">
          <Card.Body gap="2">
            <Text fontSize="lg" fontWeight="bold">
              Total de Hectares Registrados
            </Text>
            <Text fontSize="4xl" fontWeight="extrabold">
              {totalHectares.toFixed(2)} ha
            </Text>
          </Card.Body>
        </Card.Root>
      </SimpleGrid>

      <Box bg="bg.surface" p={6} borderRadius="md" boxShadow="sm" mb={6}>
        <Heading as="h2" size="lg" mb={4}>
          Filtros
        </Heading>

        <SimpleGrid columns={{ base: 1, md: 3 }} gap={4}>
          {SelectCustomProperties.map((props) => (
            <SelectCustom key={props.id} {...props} />
          ))}
        </SimpleGrid>
      </Box>

      <Box bg="bg.surface" p={6} borderRadius="md" boxShadow="sm">
        <Heading as="h2" size="lg" mb={4}>
          Gráficos
        </Heading>

        <VStack align="stretch">
          {[
            {
              data: pieDataState,
              label: 'Distribuição de Fazendas por Estado',
              colors: { scheme: 'pastel1' },
            },
            {
              data: pieDataCulture,
              label: 'Proporção das Culturas Registradas',
              colors: { scheme: 'set2' },
            },
            {
              data: pieDataLandUse,
              label: 'Relação entre Área Agricultável e Área de Vegetação',
              colors: { scheme: 'paired' },
            },
          ].map(({ data, label }) => (
            <Box key={label} height="500px" width="100%">
              <Heading as="h3" size="md" mb={4}>
                {label}
              </Heading>

              {data.length > 0 ? (
                <ResponsivePie data={data} {...commonPieProps} />
              ) : (
                <Text>Não há dados para exibir.</Text>
              )}
            </Box>
          ))}
        </VStack>
      </Box>

      <Box bg="bg.surface" p={4} borderRadius="md" boxShadow="sm" mt={6}>
        <Button
          color="blue.800"
          borderColor={'blue.800'}
          bg="transparent"
          onClick={() => navigate('/')}
        >
          Voltar para Home
        </Button>
      </Box>
    </Box>
  );
};
