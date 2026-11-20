import { z } from "zod";

export const createPurchaseSchema = z.object({
  purchases_date: z.iso.date(),
  delivery_address: z
    .string()
    .trim()
    .min(8, "O endereço deve conter no minímo 8 caracteres."),
  products: z
    .array(
      z.object({
        product_id: z.uuidv4(),
        product_amount: z
          .number()
          .int()
          .min(1, "A quantidade deve ser maior que 0."),
      })
    )
    .min(1, "Adicione pelo menos um produto."),
});
