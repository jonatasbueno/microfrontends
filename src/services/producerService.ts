import { z } from "zod";
import { ProducerSchema } from "./schemas/producerSchemas";
import type { Producer, CreateProducer, UpdateProducer } from "../types/types";
import {
  getMockProducers,
  findMockProducerById,
  addMockProducer,
  updateMockProducer,
} from "../mocks/producers";

export async function getProducers(): Promise<Producer[]> {
  try {
    const data = await getMockProducers();
    const validatedData = z.array(ProducerSchema).parse(data);
    return validatedData;
  } catch (error) {
    console.error("Error fetching producers:", error);
    throw error;
  }
}

export async function getProducerById(id: string): Promise<Producer> {
  try {
    const producer = await findMockProducerById(id);
    if (!producer) {
      throw new Error("Producer not found");
    }
    const validatedData = ProducerSchema.parse(producer);
    return validatedData;
  } catch (error) {
    console.error(`Error fetching producer with ID ${id}:`, error);
    throw error;
  }
}

export async function createProducer(
  producerData: CreateProducer
): Promise<Producer> {
  try {
    const newProducer = await addMockProducer(producerData);
    const validatedData = ProducerSchema.parse(newProducer);
    return validatedData;
  } catch (error) {
    console.error("Error creating producer:", error);
    throw error;
  }
}

export async function updateProducer(
  id: string,
  producerData: UpdateProducer
): Promise<Producer> {
  try {
    const updatedProducer = await updateMockProducer(id, producerData);
    if (!updatedProducer) {
      throw new Error("Producer not found");
    }
    const validatedData = ProducerSchema.parse(updatedProducer);
    return validatedData;
  } catch (error) {
    console.error(`Error updating producer with ID ${id}:`, error);
    throw error;
  }
}
