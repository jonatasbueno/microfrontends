
import { http, HttpResponse } from 'msw';

const producers: Producer[] = [
  {
    id: '1',
    cpfOrCnpj: '111.111.111-11',
    name: 'João da Silva',
    city: 'São Paulo',
    state: 'SP',
    status: 'active',
    properties: [
      {
        id: '1-1',
        name: 'Fazenda 1',
        city: 'Campinas',
        state: 'SP',
        totalArea: 100,
        arableArea: 50,
        vegetationArea: 50,
        cultures: [
          { id: '1-1-1', name: 'Soja' },
          { id: '1-1-2', name: 'Milho' },
        ],
      },
    ],
  },
  {
    id: '2',
    cpfOrCnpj: '222.222.222-22',
    name: 'Maria Oliveira',
    city: 'Rio de Janeiro',
    state: 'RJ',
    status: 'active',
    properties: [
      {
        id: '2-1',
        name: 'Fazenda 2',
        city: 'Campos dos Goytacazes',
        state: 'RJ',
        totalArea: 200,
        arableArea: 100,
        vegetationArea: 100,
        cultures: [{ id: '2-1-1', name: 'Cana-de-açúcar' }],
      },
    ],
  },
  {
    id: '3',
    cpfOrCnpj: '33.333.333/0001-33',
    name: 'Agropecuária LTDA',
    city: 'Belo Horizonte',
    state: 'MG',
    status: 'inactive',
    properties: [],
  },
  {
    id: '4',
    cpfOrCnpj: '444.444.444-44',
    name: 'José Souza',
    city: 'Curitiba',
    state: 'PR',
    status: 'active',
    properties: [
      {
        id: '4-1',
        name: 'Fazenda 3',
        city: 'Londrina',
        state: 'PR',
        totalArea: 500,
        arableArea: 0,
        vegetationArea: 500,
        cultures: [],
      },
    ],
  },
  {
    id: '5',
    cpfOrCnpj: '555.555.555-55',
    name: 'Ana Costa',
    city: 'Porto Alegre',
    state: 'RS',
    status: 'active',
    properties: [
      {
        id: '5-1',
        name: 'Fazenda 4',
        city: 'Pelotas',
        state: 'RS',
        totalArea: 300,
        arableArea: 200,
        vegetationArea: 0,
        cultures: [{ id: '5-1-1', name: 'Arroz' }],
      },
    ],
  },
];

export const handlers = [
  http.get('/producers', () => {
    return HttpResponse.json(producers);
  }),

  http.post('/producers', async ({ request }) => {
    const newProducer = await request.json() as Omit<Producer, 'id' | 'status' | 'properties'>;

    if (producers.some(p => p.cpfOrCnpj === newProducer.cpfOrCnpj)) {
      return new HttpResponse('Error: CPF or CNPJ already registered.', { status: 400 });
    }

    const producer: Producer = {
      ...newProducer,
      id: new Date().toISOString(),
      status: 'active',
      properties: [],
    };

    producers.push(producer);

    return HttpResponse.json(producer, { status: 201 });
  }),

  http.put('/producers/:id', async ({ params, request }) => {
    const { id } = params;
    const updatedData = await request.json() as Partial<Producer>;
    const producerIndex = producers.findIndex(p => p.id === id);

    if (producerIndex === -1) {
      return new HttpResponse(null, { status: 404 });
    }

    producers[producerIndex] = { ...producers[producerIndex], ...updatedData };

    return HttpResponse.json(producers[producerIndex]);
  }),
];
