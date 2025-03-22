import {z} from "zod";

export const createOrEditJobSchema = z.object({
    company: z
        .string()
        .min(3, {message: 'O nome da empresa precisa ter pelo menos 3 caracteres.'})
        .max(50, {message: 'O nome da empresa pode ter no máximo 50 caracteres.'}),
    link: z
        .string()
        .url({message: 'Por favor, insira um link válido.'}),
    location: z
        .string()
        .min(3, {message: 'O local precisa ter pelo menos 3 caracteres.'})
        .max(50, {message: 'O local pode ter no máximo 50 caracteres.'}),
    remote: z.boolean(),
    role: z
        .string()
        .min(3, {message: 'O cargo precisa ter pelo menos 3 caracteres.'})
        .max(50, {message: 'O cargo pode ter no máximo 50 caracteres.'}),
    salary: z
        .string()
        .min(3, {message: 'O salário precisa ter pelo menos 3 caracteres.'})
        .max(50, {message: 'O salário pode ter no máximo 50 caracteres.'}),
});

export const loginSchema = z.object({
    email: z.string().email({message: 'Por favor, insira um email válido.'}),
    password: z
        .string()
        .min(7, {message: 'A senha precisa ter pelo menos 7 caracteres.'})
        .max(20, {message: 'A senha pode ter no máximo 20 caracteres.'}),
});
