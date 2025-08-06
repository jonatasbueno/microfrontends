import { z } from "zod";

export const CultureSchema = z.object({
  id: z.string(),
  name: z.string(),
});

export const PropertySchema = z.object({
  id: z.string(),
  name: z.string(),
  city: z.string(),
  state: z.string(),
  totalArea: z.number(),
  arableArea: z.number(),
  vegetationArea: z.number(),
  cultures: z.array(CultureSchema),
});

export const ProducerSchema = z.object({
  id: z.string(),
  cpfOrCnpj: z.string(),
  name: z.string(),
  city: z.string(),
  state: z.string(),
  properties: z.array(PropertySchema),
});

export const CreateProducerSchema = z.object({
  cpfOrCnpj: z.string(),
  name: z.string(),
  city: z.string(),
  state: z.string(),
});

export const UpdateProducerSchema = z.object({
  cpfOrCnpj: z.string().optional(),
  name: z.string().optional(),
  city: z.string().optional(),
  state: z.string().optional(),
  status: z.enum(["active", "inactive"]).optional(),
  properties: z.array(PropertySchema).optional(),
});
