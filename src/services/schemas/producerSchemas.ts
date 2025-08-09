import { z } from "zod";

export const CultureSchema = z.object({
  id: z.string(),
  name: z.string(),
  year: z.number(),
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
  name: z.string(),
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

export const CultureFormSchema = z.object({
  name: z.string().min(1, "Nome da cultura é obrigatório"),
  year: z
    .number()
    .min(1900, "Ano inválido")
    .max(new Date().getFullYear(), "Ano inválido"),
});

export const PropertyFormSchema = z
  .object({
    farmName: z.string().min(1, "Nome da fazenda é obrigatório"),
    city: z.string().min(1, "Cidade é obrigatória"),
    state: z.string().min(1, "Estado é obrigatório"),
    totalArea: z.number().min(0.01, "Área total deve ser maior que zero"),
    arableArea: z.number().min(0, "Área agricultável não pode ser negativa"),
    vegetationArea: z
      .number()
      .min(0, "Área de vegetação não pode ser negativa"),
    cultures: z.array(CultureFormSchema),
  })
  .refine((data) => data.arableArea + data.vegetationArea <= data.totalArea, {
    message:
      "A soma da área agricultável e de vegetação não pode exceder a área total da propriedade.",
    path: ["arableArea"],
  });

import { validateCpfCnpj } from "@/utils/functions/validateCpfCnpj";
import { getMockProducers } from "@/mocks/producers";

export const ProducerFormSchema = z
  .object({
    id: z.string().optional(), // Adicionado para permitir a edição
    cpfOrCnpj: z
      .string()
      .min(1, "CPF/CNPJ é obrigatório")
      .refine((value) => {
        const cleaned = value.replace(/\D/g, "");
        return cleaned.length === 11 || cleaned.length === 14;
      }, "CPF/CNPJ inválido"),
    name: z.string().min(1, "Nome é obrigatório"),
    city: z.string().min(1, "Cidade é obrigatória"),
    state: z.string().min(1, "Estado é obrigatória"),
    properties: z.array(PropertyFormSchema),
  })
  .superRefine(async (data, ctx) => {
    const cleanedCpfCnpj = data.cpfOrCnpj.replace(/\D/g, "");

    if (!validateCpfCnpj(cleanedCpfCnpj)) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "CPF/CNPJ inválido.",
        path: ["cpfOrCnpj"],
      });
      return;
    }

    const producers = await getMockProducers();
    const isCpfCnpjTaken = producers.some(
      (producer) =>
        producer.cpfOrCnpj.replace(/\D/g, "") === cleanedCpfCnpj &&
        (data.id ? producer.id !== data.id : true) // Se for edição, verifica se o ID é diferente
    );

    if (isCpfCnpjTaken) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "CPF/CNPJ já cadastrado.",
        path: ["cpfOrCnpj"],
      });
    }
  });
