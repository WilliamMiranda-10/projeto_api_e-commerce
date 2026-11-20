import { z } from "zod";

export const createPurchaseSchema = z.object({
  purchases_date: z.iso.date(
    "Data inválida. Use o formato AAAA-MM-DD (ex.: 1900-01-01)."
  ),
  delivery_address: z
    .string()
    .trim()
    .min(8, "O endereço deve conter no minímo 8 caracteres."),
  products: z
    .array(
      z.object({
        product_id: z.uuidv4("ID do produto inválido. Informe um UUID válido."),
        product_amount: z
          .number()
          .int()
          .min(1, "A quantidade deve ser maior que 0."),
      })
    )
    .min(1, "Adicione pelo menos um produto."),
});
