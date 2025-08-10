import React from 'react';
import {
  Box,
  Text,
  VStack,
  SimpleGrid,
  Heading,
  Button,
  Flex,
} from '@chakra-ui/react';
import { ResponsivePie, type PieSvgProps } from '@nivo/pie';
import { useNavigate } from 'react-router';
import { Card } from '@chakra-ui/react';

import { useDashboard } from '@/hooks/useDashboard';
import { SelectCustom, type SelectValue } from './components/Select';

export const DashboardPage: React.FC = () => {
  const {
    totalProducers,
    totalFarms,
    totalHectares,
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
      onSelect: (value: SelectValue) => setFilterByCrop(value.value),
      placeholder: 'Filtrar por Safra',
    },
    {
      id: 'state',
      collention: listCollectionStates,
      onSelect: (value: SelectValue) => setFilterByState(value.value),
      placeholder: 'Filtrar por Estado',
    },
    {
      id: 'culture',
      collention: listCollectionCultures,
      onSelect: (value: SelectValue) => setFilterByCulture(value.value),
      placeholder: 'Filtrar por Cultura',
    },
  ];

  const commonPieProps: Omit<
    PieSvgProps<{ id: string; value: number; label: string }>,
    'width' | 'height' | 'data'
  > = {
    margin: { top: 40, right: 80, bottom: 80, left: 80 },
    innerRadius: 0.5,
    padAngle: 0.7,
    cornerRadius: 3,
    activeOuterRadiusOffset: 8,
    borderWidth: 1,
    borderColor: {
      from: 'color',
      modifiers: [['darker', 0.2] as ['darker', number]],
    },
    arcLinkLabelsSkipAngle: 10,
    arcLinkLabelsTextColor: '#333333',
    arcLinkLabelsThickness: 2,
    arcLinkLabelsColor: { from: 'color' },
    arcLabelsSkipAngle: 10,
    arcLabelsTextColor: {
      from: 'color',
      modifiers: [['darker', 2] as ['darker', number]],
    },
    defs: [
      {
        id: 'dots',
        type: 'patternDots',
        background: 'inherit',
        color: 'rgba(255,255,255,0.3)',
        size: 4,
        padding: 1,
        stagger: true,
      },
      {
        id: 'lines',
        type: 'patternLines',
        background: 'inherit',
        color: 'rgba(255,255,255,0.3)',
        rotation: -45,
        lineWidth: 6,
        spacing: 10,
      },
    ],
    fill: [
      { match: { id: 'ruby' }, id: 'dots' },
      { match: { id: 'c' }, id: 'dots' },
      { match: { id: 'go' }, id: 'dots' },
      { match: { id: 'python' }, id: 'dots' },
      { match: { id: 'scala' }, id: 'lines' },
      { match: { id: 'lisp' }, id: 'lines' },
      { match: { id: 'elixir' }, id: 'lines' },
      { match: { id: 'javascript' }, id: 'lines' },
    ],
    legends: [
      {
        anchor: 'bottom',
        direction: 'row',
        justify: false,
        translateX: 0,
        translateY: 100,
        itemsSpacing: 0,
        itemWidth: 100,
        itemHeight: 18,
        itemTextColor: '#999',
        itemDirection: 'left-to-right',
        itemOpacity: 1,
        symbolSize: 18,
        symbolShape: 'circle',
        effects: [{ on: 'hover', style: { itemTextColor: '#000' } }],
      },
    ],
  };

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
        <Card.Root variant="outline" bg="green.50" boxShadow="sm">
          <Card.Body gap="2">
            <Text fontSize="lg" fontWeight="bold">
              Total de Fazendas
            </Text>
            <Text fontSize="4xl" fontWeight="extrabold">
              {totalFarms}
            </Text>
          </Card.Body>
        </Card.Root>
        <Card.Root variant="outline" bg="purple.50" boxShadow="sm">
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
        {/* <VStack align="stretch">
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
          ].map(({ data, label, colors }) => (
            <Box key={label} height="500px" width="100%">
              <Heading as="h3" size="md" mb={4}>
                {label}
              </Heading>
              {data.length > 0 ? (
                <ResponsivePie
                  data={data}
                  {...commonPieProps}
                  colors={colors}
                />
              ) : (
                <Text>Não há dados para exibir.</Text>
              )}
            </Box>
          ))}
        </VStack> */}
      </Box>

      <Box bg="bg.surface" p={4} borderRadius="md" boxShadow="sm" mt={6}>
        <Flex>
          <Button
            variant="outline"
            colorScheme="primary"
            onClick={() => navigate('/')}
          >
            Voltar para Home
          </Button>
        </Flex>
      </Box>
    </Box>
  );
};
