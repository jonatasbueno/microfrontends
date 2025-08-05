export type Culture = {
  id: string;
  name: string;
};

export type Property = {
  id: string;
  name: string;
  city: string;
  state: string;
  totalArea: number;
  arableArea: number;
  vegetationArea: number;
  cultures: Culture[];
};

export type Producer = {
  id: string;
  cpfOrCnpj: string;
  name: string;
  city: string;
  state: string;
  status: 'active' | 'inactive';
  properties: Property[];
};

export type ProducersState = {
  producers: Producer[];
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;
};
