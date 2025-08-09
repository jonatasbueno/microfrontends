import { z } from 'zod';
import { ProducerSchema } from './schemas/producerSchemas';
import type { Producer, CreateProducer, UpdateProducer } from '../types/types';
import {
  getMockProducers,
  findMockProducerById,
  addMockProducer,
  updateMockProducer,
} from '../mocks/producers';

/**
 * Busca todos os produtores.
 * @returns {Promise<Producer[]>} Uma promessa que resolve para uma lista de produtores.
 * @throws {Error} Se ocorrer um erro ao buscar os produtores.
 */
export async function getProducers(): Promise<Producer[]> {
  try {
    const data = await getMockProducers();
    const validatedData = z.array(ProducerSchema).parse(data);
    return validatedData;
  } catch (error) {
    console.error('Error fetching producers:', error);
    throw error;
  }
}

/**
 * Busca um produtor pelo ID.
 * @param {string} id - O ID do produtor a ser buscado.
 * @returns {Promise<Producer>} Uma promessa que resolve para o produtor encontrado.
 * @throws {Error} Se o produtor não for encontrado ou se ocorrer um erro na busca.
 */
export async function getProducerById(id: string): Promise<Producer> {
  try {
    const producer = await findMockProducerById(id);
    if (!producer) {
      throw new Error('Producer not found');
    }
    const validatedData = ProducerSchema.parse(producer);
    return validatedData;
  } catch (error) {
    console.error(`Error fetching producer with ID ${id}:`, error);
    throw error;
  }
}

/**
 * Cria um novo produtor.
 * @param {CreateProducer} producerData - Os dados do novo produtor.
 * @returns {Promise<Producer>} Uma promessa que resolve para o produtor criado.
 * @throws {Error} Se ocorrer um erro ao criar o produtor.
 */
export async function createProducer(
  producerData: CreateProducer,
): Promise<Producer> {
  try {
    const newProducer = await addMockProducer(producerData);
    const validatedData = ProducerSchema.parse(newProducer);
    return validatedData;
  } catch (error) {
    console.error('Error creating producer:', error);
    throw error;
  }
}

/**
 * Atualiza um produtor existente.
 * @param {string} id - O ID do produtor a ser atualizado.
 * @param {UpdateProducer} producerData - Os dados a serem atualizados no produtor.
 * @returns {Promise<Producer>} Uma promessa que resolve para o produtor atualizado.
 * @throws {Error} Se o produtor não for encontrado ou se ocorrer um erro na atualização.
 */
export async function updateProducer(
  id: string,
  producerData: UpdateProducer,
): Promise<Producer> {
  try {
    const updatedProducer = await updateMockProducer(id, producerData);
    if (!updatedProducer) {
      throw new Error('Producer not found');
    }
    const validatedData = ProducerSchema.parse(updatedProducer);
    return validatedData;
  } catch (error) {
    console.error(`Error updating producer with ID ${id}:`, error);
    throw error;
  }
}
