import { z } from "zod";

export const createProductSchema = z.object({
  name: z
    .string()
    .min(2, "O nome do produto deve ter pelo menos 2 caracteres."),
  price_in_cents: z
    .number({
      error: "O preço deve ser um número válido.",
    })
    .int("O preço deve ser um número inteiro.")
    .min(1, "O preço deve ser maior que zero."),
  amount: z
    .number({
      error: "A quantidade deve ser um número válido.",
    })
    .int("A quantidade deve ser um número inteiro.")
    .min(1, "A quantidade deve ser maior que zero."),
});

export const updateProductSchema = createProductSchema
  .partial()
  .refine((data) => Object.keys(data).length > 0, {
    message: "Preencha pelo menos um campo para atualizar.",
  });
