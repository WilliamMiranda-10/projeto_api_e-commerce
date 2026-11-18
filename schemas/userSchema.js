import { z } from "zod";

export const createUserSchema = z.object({
  name: z.string().min(2, "O nome deve ter pelo menos 2 caracteres."),
  surname: z.string().min(2, "O sobrenome deve ter pelo menos 2 caracteres."),
  email: z.email("Digite um e-mail válido."),
  password: z.string().min(6, "A senha deve ter no minimo 6 caracteres."),
});

export const updateUserSchema = createUserSchema
  .partial()
  .refine((data) => Object.keys(data).length > 0, {
    message: "Preencha pelo menos um campo para atualizar",
  });
