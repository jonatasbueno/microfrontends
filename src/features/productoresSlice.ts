import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type {
  Culture,
  Property,
  Producer,
  ProducersState,
} from "../types/types";

const initialState: ProducersState = {
  producers: [],
};

const producersSlice = createSlice({
  name: "producers",
  initialState,
  reducers: {
    setProducers: (state, action: PayloadAction<Producer[]>) => {
      state.producers = action.payload;
    },

    addProducer: (
      state,
      action: PayloadAction<Omit<Producer, "id" | "properties">>
    ) => {
      if (
        state.producers.some((p) => p.cpfOrCnpj === action.payload.cpfOrCnpj)
      ) {
        console.error("Error: CPF or CNPJ already registered.");

        return;
      }

      const newProducer: Producer = {
        ...action.payload,
        id: action.payload.cpfOrCnpj,
        properties: [],
      };

      state.producers.push(newProducer);
    },

    updateProducer: (
      state,
      action: PayloadAction<Partial<Producer> & { id: string }>
    ) => {
      const { id, ...data } = action.payload;
      const producerIndex = state.producers.findIndex((p) => p.id === id);

      if (producerIndex !== -1) {
        state.producers[producerIndex] = {
          ...state.producers[producerIndex],
          ...data,
        };
      }
    },

    addProperty: (
      state,
      action: PayloadAction<{
        producerId: string;
        property: Omit<Property, "id">;
      }>
    ) => {
      const { producerId, property } = action.payload;

      if (property.arableArea + property.vegetationArea > property.totalArea) {
        console.error(
          "Error: The sum of arable and vegetation area cannot exceed the total area."
        );
        return;
      }

      const producer = state.producers.find((p) => p.id === producerId);

      if (producer) {
        producer.properties.push({
          ...property,
          id: `${producerId}-${new Date().toISOString()}`,
        });
      }
    },

    updateProperty: (
      state,
      action: PayloadAction<{ producerId: string; property: Property }>
    ) => {
      const { producerId, property } = action.payload;

      if (property.arableArea + property.vegetationArea > property.totalArea) {
        console.error(
          "Error: The sum of arable and vegetation area cannot exceed the total area."
        );
        return;
      }

      const producer = state.producers.find((p) => p.id === producerId);

      if (producer) {
        const propIndex = producer.properties.findIndex(
          (p) => p.id === property.id
        );

        if (propIndex !== -1) {
          producer.properties[propIndex] = property;
        }
      }
    },

    removeProperty: (
      state,
      action: PayloadAction<{ producerId: string; propertyId: string }>
    ) => {
      const { producerId, propertyId } = action.payload;
      const producer = state.producers.find((p) => p.id === producerId);

      if (producer)
        producer.properties = producer.properties.filter(
          (p) => p.id !== propertyId
        );
    },

    addCultureToProperty: (
      state,
      action: PayloadAction<{
        producerId: string;
        propertyId: string;
        culture: Omit<Culture, "id">;
      }>
    ) => {
      const { producerId, propertyId, culture } = action.payload;
      const producer = state.producers.find((p) => p.id === producerId);

      if (producer) {
        const prop = producer.properties.find((p) => p.id === propertyId);

        if (prop)
          prop.cultures.push({
            ...culture,
            id: `${propertyId}-${new Date().toISOString()}`,
            year: new Date().getFullYear(), // Adiciona o ano atual
          });
      }
    },
  },
});

export const {
  addProducer,
  updateProducer,
  addProperty,
  updateProperty,
  removeProperty,
  addCultureToProperty,
  setProducers,
} = producersSlice.actions;

export default producersSlice.reducer;
