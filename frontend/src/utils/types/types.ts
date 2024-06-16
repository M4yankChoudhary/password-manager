import {z} from 'zod';

export const CreateVaultSchema = z.object({
    name: z.string().min(5),
    master_key: z.string().min(6),
    description: z.string().min(6)
})

export type CreateVaultType = z.infer<typeof CreateVaultSchema>

export const CreatePasswordSchema = z.object({
    username: z.string().min(5),
    domain: z.string().url().min(6),
    encrypted_password: z.string().min(6)
})

export type CreatePasswordType = z.infer<typeof CreatePasswordSchema>