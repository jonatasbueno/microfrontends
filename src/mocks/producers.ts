import type { Producer, Property, Culture } from "../types/types";

const DELAY = 1500; // 1.5 seconds

const generateId = () =>
  Math.random().toString(36).substring(2, 15) +
  Math.random().toString(36).substring(2, 15);

const getRandomCpfCnpj = () => {
  const type = Math.random() > 0.5 ? "cpf" : "cnpj";
  if (type === "cpf") {
    return Array.from({ length: 11 }, () =>
      Math.floor(Math.random() * 10)
    ).join("");
  } else {
    return Array.from({ length: 14 }, () =>
      Math.floor(Math.random() * 10)
    ).join("");
  }
};

const getRandomName = () => {
  const firstNames = [
    "Ana",
    "Bruno",
    "Carla",
    "Daniel",
    "Eduarda",
    "Felipe",
    "Gabriela",
    "Hugo",
    "Isabela",
    "Julio",
  ];
  const lastNames = [
    "Silva",
    "Santos",
    "Oliveira",
    "Souza",
    "Pereira",
    "Almeida",
    "Costa",
    "Rodrigues",
    "Martins",
    "Lima",
  ];
  return `${firstNames[Math.floor(Math.random() * firstNames.length)]} ${
    lastNames[Math.floor(Math.random() * lastNames.length)]
  }`;
};

const getRandomCity = () => {
  const cities = [
    "São Paulo",
    "Rio de Janeiro",
    "Belo Horizonte",
    "Porto Alegre",
    "Curitiba",
    "Salvador",
    "Fortaleza",
    "Recife",
    "Manaus",
    "Brasília",
  ];
  return cities[Math.floor(Math.random() * cities.length)];
};

const getRandomState = () => {
  const states = ["SP", "RJ", "MG", "RS", "PR", "BA", "CE", "PE", "AM", "DF"];
  return states[Math.floor(Math.random() * states.length)];
};

const getRandomFarmName = () => {
  const prefixes = ["Fazenda", "Sítio", "Chácara", "Granja"];
  const suffixes = [
    "Alegria",
    "Esperança",
    "Paraíso",
    "Sol Nascente",
    "Bons Ventos",
    "Verde",
    "Ouro",
  ];
  return `${prefixes[Math.floor(Math.random() * prefixes.length)]} ${
    suffixes[Math.floor(Math.random() * suffixes.length)]
  }`;
};

const mockCultures: Culture[] = [
  { id: generateId(), name: "Soja", year: 2024 },
  { id: generateId(), name: "Milho", year: 2022 },
  { id: generateId(), name: "Algodão", year: 2023 },
  { id: generateId(), name: "Café", year: 2021 },
  { id: generateId(), name: "Trigo", year: 2024 },
];

const generateRandomCulture = (): Culture => {
  const baseCulture =
    mockCultures[Math.floor(Math.random() * mockCultures.length)];
  return {
    ...baseCulture,
    id: generateId(),
    year: 2020 + Math.floor(Math.random() * 5),
  }; // Random year between 2020 and 2024
};

const generateRandomProperty = (): Property => {
  const totalArea = Math.floor(Math.random() * (10000 - 100 + 1)) + 100;
  const arableArea =
    Math.floor(Math.random() * (totalArea * 0.8 - totalArea * 0.5 + 1)) +
    totalArea * 0.5;
  const vegetationArea =
    totalArea - arableArea - Math.floor(Math.random() * (totalArea * 0.1));

  const numCultures = Math.floor(Math.random() * 4); // 0 to 3 cultures
  const cultures = Array.from({ length: numCultures }, generateRandomCulture);

  return {
    id: generateId(),
    farmName: getRandomFarmName(),
    city: getRandomCity(),
    state: getRandomState(),
    totalArea: parseFloat(totalArea.toFixed(2)),
    arableArea: parseFloat(arableArea.toFixed(2)),
    vegetationArea: parseFloat(vegetationArea.toFixed(2)),
    cultures: cultures,
  };
};

const generateRandomProducer = (): Producer => {
  const numProperties = Math.floor(Math.random() * 3); // 0 to 2 properties
  const properties = Array.from(
    { length: numProperties },
    generateRandomProperty
  );

  return {
    id: generateId(),
    cpfOrCnpj: getRandomCpfCnpj(),
    name: getRandomName(),
    city: getRandomCity(),
    state: getRandomState(),
    properties: properties,
  };
};

export const mockProducers: Producer[] = [
  {
    id: generateId(),
    cpfOrCnpj: "12345678901",
    name: "João da Silva",
    city: "Goiânia",
    state: "GO",
    properties: [
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
    ],
  },
  {
    id: generateId(),
    cpfOrCnpj: "09876543210987",
    name: "Maria Oliveira",
    city: "Uberlândia",
    state: "MG",
    properties: [
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
    ],
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

// Add 15 more producers
for (let i = 0; i < 15; i++) {
  mockProducers.push(generateRandomProducer());
}

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

export const deleteMockProducer = (id: string): Promise<boolean> => {
  const index = mockProducers.findIndex((p) => p.id === id);
  if (index !== -1) {
    mockProducers.splice(index, 1);
    return simulateApiCall(true);
  }
  return simulateApiCall(false);
};
