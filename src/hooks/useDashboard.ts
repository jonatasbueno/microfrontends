import type { RootState } from '@/store/GlobalStore';
import { createListCollection } from '@chakra-ui/react/collection';
import { useMemo, useState } from 'react';
import { useSelector } from 'react-redux';

/**
 * @typedef {object} DashboardData
 * @property {number} totalProducers - Número total de produtores.
 * @property {number} totalFarms - Número total de fazendas.
 * @property {number} totalHectares - Total de hectares registrados.
 * @property {Array<object>} pieDataState - Dados para o gráfico de pizza por estado.
 * @property {Array<object>} pieDataCulture - Dados para o gráfico de pizza por cultura.
 * @property {Array<object>} pieDataLandUse - Dados para o gráfico de pizza por uso do solo.
 */

/**
 * @typedef {object} UseDashboardReturn
 * @property {Producer[]} producers - Lista de todos os produtores.
 * @property {string | null} filterByCrop - Filtro de safra atual.
 * @property {(crop: string | null) => void} setFilterByCrop - Função para definir o filtro de safra.
 * @property {string | null} filterByState - Filtro de estado atual.
 * @property {(state: string | null) => void} setFilterByState - Função para definir o filtro de estado.
 * @property {string | null} filterByCulture - Filtro de cultura atual.
 * @property {(culture: string | null) => void} setFilterByCulture - Função para definir o filtro de cultura.
 * @property {string[]} availableCrops - Lista de safras disponíveis para filtro.
 * @property {string[]} availableStates - Lista de estados disponíveis para filtro.
 * @property {string[]} availableCultures - Lista de culturas disponíveis para filtro.
 * @property {DashboardData} dashboardData - Dados calculados para o dashboard.
 */

/**
 * Hook personalizado para gerenciar os dados do dashboard, incluindo indicadores e gráficos, com funcionalidades de filtragem.
 * @returns {UseDashboardReturn} Objeto contendo os dados e funções relacionadas ao dashboard.
 */
export const useDashboard = () => {
  const { producers } = useSelector((state: RootState) => state.producers);

  const [filterByCrop, setFilterByCrop] = useState<string | null>(null);
  const [filterByState, setFilterByState] = useState<string | null>(null);
  const [filterByCulture, setFilterByCulture] = useState<string | null>(null);

  const filteredProducers = useMemo(() => {
    let filtered = producers;

    if (filterByCrop) {
      filtered = filtered.filter((producer) =>
        producer.properties.some((property) =>
          property.cultures.some(
            (culture) => culture.year.toString() === filterByCrop,
          ),
        ),
      );
    }

    if (filterByState) {
      filtered = filtered.filter((producer) =>
        producer.properties.some(
          (property) => property.state === filterByState,
        ),
      );
    }

    if (filterByCulture) {
      filtered = filtered.filter((producer) =>
        producer.properties.some((property) =>
          property.cultures.some((culture) => culture.name === filterByCulture),
        ),
      );
    }

    return filtered;
  }, [producers, filterByCrop, filterByState, filterByCulture]);

  const dashboardData = useMemo(() => {
    const totalProducers = filteredProducers.length;
    const totalFarms = filteredProducers.reduce(
      (accumulator, producer) => accumulator + producer.properties.length,
      0,
    );

    const totalHectares = filteredProducers.reduce(
      (accumulator, producer) =>
        accumulator +
        producer.properties.reduce(
          (propertyAccumulator, property) =>
            propertyAccumulator + property.totalArea,
          0,
        ),
      0,
    );

    const farmsByState = filteredProducers.reduce((accumulator, producer) => {
      producer.properties.forEach((property) => {
        accumulator[property.state] = (accumulator[property.state] || 0) + 1;
      });
      return accumulator;
    }, {} as Record<string, number>);
    const pieDataState = Object.entries(farmsByState).map(([id, value]) => ({
      id,
      value,
      label: id,
    }));

    const culturesCount = filteredProducers.reduce((accumulator, producer) => {
      producer.properties.forEach((property) => {
        property.cultures.forEach((culture) => {
          accumulator[culture.name] = (accumulator[culture.name] || 0) + 1;
        });
      });
      return accumulator;
    }, {} as Record<string, number>);

    const pieDataCulture = Object.entries(culturesCount).map(([id, value]) => ({
      id,
      value,
      label: id,
    }));

    const totalArableArea = filteredProducers.reduce(
      (accumulator, producer) =>
        accumulator +
        producer.properties.reduce(
          (propertyAccumulator, property) =>
            propertyAccumulator + property.arableArea,
          0,
        ),
      0,
    );
    const totalVegetationArea = filteredProducers.reduce(
      (accumulator, producer) =>
        accumulator +
        producer.properties.reduce(
          (propertyAccumulator, property) =>
            propertyAccumulator + property.vegetationArea,
          0,
        ),
      0,
    );

    const pieDataLandUse = [
      {
        id: 'Área Agricultável',
        label: 'Área Agricultável',
        value: totalArableArea,
      },
      {
        id: 'Área de Vegetação',
        label: 'Área de Vegetação',
        value: totalVegetationArea,
      },
    ];

    return {
      totalProducers,
      totalFarms,
      totalHectares,
      pieDataState,
      pieDataCulture,
      pieDataLandUse,
    };
  }, [filteredProducers]);

  const availableCrops = useMemo(() => {
    const crops = new Set<string>();

    producers.forEach((producer) => {
      producer.properties.forEach((property) => {
        property.cultures.forEach((culture) =>
          crops.add(culture.year.toString()),
        );
      });
    });
    return Array.from(crops).sort();
  }, [producers]);

  const availableStates = useMemo(() => {
    const states = new Set<string>();

    producers.forEach((producer) => {
      producer.properties.forEach((property) => states.add(property.state));
    });
    return Array.from(states).sort();
  }, [producers]);

  const availableCultures = useMemo(() => {
    const cultures = new Set<string>();

    producers.forEach((producer) => {
      producer.properties.forEach((property) => {
        property.cultures.forEach((culture) => cultures.add(culture.name));
      });
    });
    return Array.from(cultures).sort();
  }, [producers]);

  const listCollectionCrops = useMemo(
    () =>
      createListCollection({
        items: availableCrops.map((crop) => ({ label: crop, value: crop })),
      }),
    [availableCrops],
  );

  const listCollectionStates = useMemo(
    () =>
      createListCollection({
        items: availableStates.map((crop) => ({ label: crop, value: crop })),
      }),
    [availableStates],
  );

  const listCollectionCultures = useMemo(
    () =>
      createListCollection({
        items: availableCultures.map((crop) => ({ label: crop, value: crop })),
      }),
    [availableCultures],
  );

  return {
    ...dashboardData,
    listCollectionCrops,
    listCollectionStates,
    listCollectionCultures,
    setFilterByState,
    setFilterByCulture,
    setFilterByCrop,
  };
};
