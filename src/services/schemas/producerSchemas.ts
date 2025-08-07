import { z } from "zod";

export const CultureSchema = z.object({
  id: z.string(),
  name: z.string(),
  year: z.number(), // Nova propriedade para o ano da safra
});

export const PropertySchema = z.object({
  id: z.string(),
  farmName: z.string(),
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
  name: z.string(), // Nome do produtor
  city: z.string(),
  state: z.string(),
  properties: z.array(PropertySchema),
});

export const UpdateProducerSchema = z.object({
  cpfOrCnpj: z.string().optional(),
  name: z.string().optional(),
  city: z.string().optional(),
  state: z.string().optional(),
  properties: z.array(PropertySchema).optional(),
});

export const CreateProducerSchema = z.object({
  cpfOrCnpj: z.string(),
  name: z.string(),
  city: z.string(),
  state: z.string(),
});

export const ProducerFormSchema = z.object({
  cpfOrCnpj: z.string()
    .min(1, "CPF/CNPJ é obrigatório")
    .refine(value => {
      const cleaned = value.replace(/\D/g, '');
      return cleaned.length === 11 || cleaned.length === 14;
    }, "CPF/CNPJ inválido"),
  name: z.string().min(1, "Nome é obrigatório"),
  city: z.string().min(1, "Cidade é obrigatória"),
  state: z.string().min(1, "Estado é obrigatório"),
});
