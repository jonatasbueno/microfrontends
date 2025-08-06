import { z } from "zod";
import {
  CultureSchema,
  PropertySchema,
  ProducerSchema,
  CreateProducerSchema,
  UpdateProducerSchema,
} from "../services/schemas/producerSchemas";

export type Culture = z.infer<typeof CultureSchema>;
export type Property = z.infer<typeof PropertySchema>;
export type Producer = z.infer<typeof ProducerSchema>;
export type CreateProducer = z.infer<typeof CreateProducerSchema>;
export type UpdateProducer = z.infer<typeof UpdateProducerSchema>;

export type ProducersState = {
  producers: Producer[];
};