import {z} from "zod";

export const signUpObject = z.object({
    email : z.string().email(),
    password: z.string().min(8),
    name: z.string().optional()
})

export const signInObject = z.object({
    email : z.string().email(),
    password: z.string().min(8),
})

export const createBlogObject = z.object({
    title: z.string(),
    content: z.string()
})

export const updateBlogObject = z.object({
    title: z.string(),
    content: z.string()
})



//type inference in zod
export type SignUpObject = z.infer<typeof signUpObject>
export type SignInObject = z.infer<typeof signInObject>
export type CreateBlogObject = z.infer<typeof createBlogObject>
export type UpdateBlogObject = z.infer<typeof updateBlogObject>

