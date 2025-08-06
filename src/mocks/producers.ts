import type { Producer, Property, Culture } from "../types/types";

const DELAY = 1.5 * 60 * 1000;

const generateId = () =>
  Math.random().toString(36).substring(2, 15) +
  Math.random().toString(36).substring(2, 15);

const mockCultures: Culture[] = [
  { id: generateId(), name: "Soja", year: 2024 },
  { id: generateId(), name: "Milho", year: 2022 },
  { id: generateId(), name: "Algodão", year: 2023 },
  { id: generateId(), name: "Café", year: 2021 },
  { id: generateId(), name: "Trigo", year: 2024 },
];

const mockProperties: Property[] = [
  {
    id: generateId(),
    farmName: "Fazenda Boa Vista",
    city: "Rio Verde",
    state: "GO",
    totalArea: 1000,
    arableArea: 700,
    vegetationArea: 300,
    cultures: [mockCultures[0], mockCultures[1]],
  },
  {
    id: generateId(),
    farmName: "Sítio do Pica-Pau Amarelo",
    city: "Monteiro Lobato",
    state: "SP",
    totalArea: 250,
    arableArea: 150,
    vegetationArea: 100,
    cultures: [mockCultures[2]],
  },
];

export const mockProducers: Producer[] = [
  {
    id: generateId(),
    cpfOrCnpj: "12345678901",
    name: "João da Silva",
    city: "Goiânia",
    state: "GO",
    properties: [mockProperties[0]],
  },
  {
    id: generateId(),
    cpfOrCnpj: "09876543210987",
    name: "Maria Oliveira",
    city: "Uberlândia",
    state: "MG",
    properties: [mockProperties[1]],
  },
  {
    id: generateId(),
    cpfOrCnpj: "11223344556",
    name: "Pedro Souza",
    city: "Campo Grande",
    state: "MS",
    properties: [],
  },
];

const simulateApiCall = <T>(data: T): Promise<T> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(data);
    }, DELAY);
  });
};

export const getMockProducers = (): Promise<Producer[]> => {
  return simulateApiCall(mockProducers);
};

export const findMockProducerById = (
  id: string
): Promise<Producer | undefined> => {
  const producer = mockProducers.find((p) => p.id === id);
  return simulateApiCall(producer);
};

export const addMockProducer = (
  newProducer: Omit<Producer, "id" | "properties">
): Promise<Producer> => {
  const producer: Producer = {
    ...newProducer,
    id: generateId(),
    properties: [],
  };
  mockProducers.push(producer);
  return simulateApiCall(producer);
};

export const updateMockProducer = (
  id: string,
  updates: Partial<Producer>
): Promise<Producer | null> => {
  const index = mockProducers.findIndex((p) => p.id === id);
  if (index !== -1) {
    mockProducers[index] = { ...mockProducers[index], ...updates };
    return simulateApiCall(mockProducers[index]);
  }
  return simulateApiCall(null);
};
