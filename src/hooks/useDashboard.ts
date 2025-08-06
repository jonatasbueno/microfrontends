import { useMemo } from "react";
import { useSelector } from "react-redux";

import { type RootState } from "@/store/GlobalStore";

export const useDashboard = () => {
  const { producers } = useSelector((state: RootState) => state.producers);

  const dashboardData = useMemo(() => {
    const totalProducers = producers.length;
    const totalFarms = producers.reduce(
      (acc, producer) => acc + producer.properties.length,
      0
    );
    const totalHectares = producers.reduce(
      (acc, producer) =>
        acc +
        producer.properties.reduce(
          (propAcc, prop) => propAcc + prop.totalArea,
          0
        ),
      0
    );

    const farmsByState = producers.reduce((acc, producer) => {
      producer.properties.forEach((prop) => {
        acc[prop.state] = (acc[prop.state] || 0) + 1;
      });
      return acc;
    }, {} as Record<string, number>);
    const pieDataState = Object.entries(farmsByState).map(([id, value]) => ({
      id,
      value,
      label: id,
    }));

    const culturesCount = producers.reduce((acc, producer) => {
      producer.properties.forEach((prop) => {
        prop.cultures.forEach((culture) => {
          acc[culture.name] = (acc[culture.name] || 0) + 1;
        });
      });
      return acc;
    }, {} as Record<string, number>);
    const pieDataCulture = Object.entries(culturesCount).map(([id, value]) => ({
      id,
      value,
      label: id,
    }));

    const totalArableArea = producers.reduce(
      (acc, producer) =>
        acc +
        producer.properties.reduce(
          (propAcc, prop) => propAcc + prop.arableArea,
          0
        ),
      0
    );
    const totalVegetationArea = producers.reduce(
      (acc, producer) =>
        acc +
        producer.properties.reduce(
          (propAcc, prop) => propAcc + prop.vegetationArea,
          0
        ),
      0
    );
    const pieDataLandUse = [
      {
        id: "Área Agricultável",
        label: "Área Agricultável",
        value: totalArableArea,
      },
      {
        id: "Área de Vegetação",
        label: "Área de Vegetação",
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
  }, [producers]);

  return { producers, ...dashboardData };
};
