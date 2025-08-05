import axios from 'axios';
import { z } from 'zod';

import { ProducerSchema } from './schemas/producerSchemas';
import type { Producer, CreateProducer, UpdateProducer } from '../types/types';

const API_BASE_URL = '/api';

export async function getProducers(): Promise<Producer[]> {
  try {
    const response = await axios.get(`${API_BASE_URL}/producers`);
    const validatedData = z.array(ProducerSchema).parse(response.data);
    return validatedData;
  } catch (error) {
    console.error('Error fetching producers:', error);
    throw error;
  }
}

export async function getProducerById(id: string): Promise<Producer> {
  try {
    const response = await axios.get(`${API_BASE_URL}/producers/${id}`);
    const validatedData = ProducerSchema.parse(response.data);
    return validatedData;
  } catch (error) {
    console.error(`Error fetching producer with ID ${id}:`, error);
    throw error;
  }
}

export async function createProducer(producerData: CreateProducer): Promise<Producer> {
  try {
    const response = await axios.post(`${API_BASE_URL}/producers`, producerData);
    const validatedData = ProducerSchema.parse(response.data);
    return validatedData;
  } catch (error) {
    console.error('Error creating producer:', error);
    throw error;
  }
}

export async function updateProducer(id: string, producerData: UpdateProducer): Promise<Producer> {
  try {
    const response = await axios.put(`${API_BASE_URL}/producers/${id}`, producerData);
    const validatedData = ProducerSchema.parse(response.data);
    return validatedData;
  } catch (error) {
    console.error(`Error updating producer with ID ${id}:`, error);
    throw error;
  }
}