import React from "react";
import {
  Box,
  Text,
  VStack,
  SimpleGrid,
  Heading,
  Button,
  Flex,
  Select,
  Card,
  CardBody,
} from "@chakra-ui/react";
import { ResponsivePie, type PieSvgProps } from "@nivo/pie";
import { useNavigate } from "react-router";
import { useDashboard } from "../hooks/useDashboard";

export const DashboardPage: React.FC = () => {
  const {
    totalProducers,
    totalFarms,
    totalHectares,
    pieDataState,
    pieDataCulture,
    pieDataLandUse,
    filterByCrop,
    setFilterByCrop,
    filterByState,
    setFilterByState,
    filterByCulture,
    setFilterByCulture,
    availableCrops,
    availableStates,
    availableCultures,
  } = useDashboard();
  const navigate = useNavigate();

  const commonPieProps: Omit<
    PieSvgProps<{ id: string; value: number; label: string }>,
    "width" | "height" | "data"
  > = {
    margin: { top: 40, right: 80, bottom: 80, left: 80 },
    innerRadius: 0.5,
    padAngle: 0.7,
    cornerRadius: 3,
    activeOuterRadiusOffset: 8,
    borderWidth: 1,
    borderColor: {
      from: "color",
      modifiers: [["darker", 0.2] as ["darker", number]],
    },
    arcLinkLabelsSkipAngle: 10,
    arcLinkLabelsTextColor: "#333333",
    arcLinkLabelsThickness: 2,
    arcLinkLabelsColor: { from: "color" },
    arcLabelsSkipAngle: 10,
    arcLabelsTextColor: {
      from: "color",
      modifiers: [["darker", 2] as ["darker", number]],
    },
    defs: [
      {
        id: "dots",
        type: "patternDots",
        background: "inherit",
        color: "rgba(255, 255, 255, 0.3)",
        size: 4,
        padding: 1,
        stagger: true,
      },
      {
        id: "lines",
        type: "patternLines",
        background: "inherit",
        color: "rgba(255, 255, 255, 0.3)",
        rotation: -45,
        lineWidth: 6,
        spacing: 10,
      },
    ],
    fill: [
      { match: { id: "ruby" }, id: "dots" },
      { match: { id: "c" }, id: "dots" },
      { match: { id: "go" }, id: "dots" },
      { match: { id: "python" }, id: "dots" },
      { match: { id: "scala" }, id: "lines" },
      { match: { id: "lisp" }, id: "lines" },
      { match: { id: "elixir" }, id: "lines" },
      { match: { id: "javascript" }, id: "lines" },
    ],
    legends: [
      {
        anchor: "bottom",
        direction: "row",
        justify: false,
        translateX: 0,
        translateY: 100,
        itemsSpacing: 0,
        itemWidth: 100,
        itemHeight: 18,
        itemTextColor: "#999",
        itemDirection: "left-to-right",
        itemOpacity: 1,
        symbolSize: 18,
        symbolShape: "circle",
        effects: [{ on: "hover", style: { itemTextColor: "#000" } }],
      },
    ],
  };

  return (
    <Box p={4}>
      <Heading as="h1" size="xl" mb={6}>
        Dashboard de Indicadores
      </Heading>

      <SimpleGrid columns={{ base: 1, md: 3 }} spacing={4} mb={6}>
        <Card bg="blue.50" p={6} borderRadius="md" shadow="sm">
          <CardBody>
            <Text fontSize="lg" fontWeight="bold" mb={2}>
              Total de Produtores
            </Text>
            <Text fontSize="4xl" fontWeight="extrabold">
              {totalProducers}
            </Text>
          </CardBody>
        </Card>
        <Card bg="green.50" p={6} borderRadius="md" shadow="sm">
          <CardBody>
            <Text fontSize="lg" fontWeight="bold" mb={2}>
              Total de Fazendas
            </Text>
            <Text fontSize="4xl" fontWeight="extrabold">
              {totalFarms}
            </Text>
          </CardBody>
        </Card>
        <Card bg="purple.50" p={6} borderRadius="md" shadow="sm">
          <CardBody>
            <Text fontSize="lg" fontWeight="bold" mb={2}>
              Total de Hectares Registrados
            </Text>
            <Text fontSize="4xl" fontWeight="extrabold">
              {totalHectares.toFixed(2)} ha
            </Text>
          </CardBody>
        </Card>
      </SimpleGrid>

      <Box bg="surface" p={6} borderRadius="md" shadow="sm" mb={6}>
        <Heading as="h2" size="lg" mb={4}>
          Filtros
        </Heading>
        <SimpleGrid columns={{ base: 1, md: 3 }} spacing={4}>
          <Select
            placeholder="Filtrar por Safra"
            value={filterByCrop || ""}
            onChange={(e) => setFilterByCrop(e.target.value || null)}
          >
            {availableCrops.map((crop) => (
              <option key={crop} value={crop}>
                {crop}
              </option>
            ))}
          </Select>
          <Select
            placeholder="Filtrar por Estado"
            value={filterByState || ""}
            onChange={(e) => setFilterByState(e.target.value || null)}
          >
            {availableStates.map((state) => (
              <option key={state} value={state}>
                {state}
              </option>
            ))}
          </Select>
          <Select
            placeholder="Filtrar por Cultura"
            value={filterByCulture || ""}
            onChange={(e) => setFilterByCulture(e.target.value || null)}
          >
            {availableCultures.map((culture) => (
              <option key={culture} value={culture}>
                {culture}
              </option>
            ))}
          </Select>
        </SimpleGrid>
      </Box>

      <Box bg="surface" p={6} borderRadius="md" shadow="sm">
        <Heading as="h2" size="lg" mb={4}>
          Gráficos
        </Heading>
        <VStack align="stretch">
          <Box height="500px" width="100%">
            <Heading as="h3" size="md" mb={4}>
              Distribuição de Fazendas por Estado
            </Heading>
            {pieDataState.length > 0 ? (
              <ResponsivePie
                data={pieDataState}
                {...commonPieProps}
                colors={{ scheme: "pastel1" }}
              />
            ) : (
              <Text>Não há dados de fazendas por estado para exibir.</Text>
            )}
          </Box>

          <Box height="500px" width="100%">
            <Heading as="h3" size="md" mb={4}>
              Proporção das Culturas Registradas
            </Heading>
            {pieDataCulture.length > 0 ? (
              <ResponsivePie
                data={pieDataCulture}
                {...commonPieProps}
                colors={{ scheme: "set2" }}
              />
            ) : (
              <Text>Não há dados de culturas para exibir.</Text>
            )}
          </Box>

          <Box height="500px" width="100%">
            <Heading as="h3" size="md" mb={4}>
              Relação entre Área Agricultável e Área de Vegetação
            </Heading>
            {pieDataLandUse.length > 0 ? (
              <ResponsivePie
                data={pieDataLandUse}
                {...commonPieProps}
                colors={{ scheme: "paired" }}
              />
            ) : (
              <Text>Não há dados de uso do solo para exibir.</Text>
            )}
          </Box>
        </VStack>
      </Box>

      <Box bg="surface" p={4} borderRadius="md" shadow="sm" mt={6}>
        <Flex justifyContent="flex-start">
          <Button
            color="primary.500"
            borderColor="primary.500"
            bg="white"
            onClick={() => navigate("/")}
          >
            Voltar para Home
          </Button>
        </Flex>
      </Box>
    </Box>
  );
};
