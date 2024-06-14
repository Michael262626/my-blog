import * as z from "zod"

export  const SignUpValidation = z.object({
    name: z.string().min(2, 'Too short'),
    username: z.string().min(2, 'Too short'),
    email: z.string().email(),
    password: z.string().min(8, 'Password must be at least 8 characters'),
})

export  const SignInValidation = z.object({
    email: z.string().email(),
    password: z.string().min(8, 'Password must be at least 8 characters'),
})
export  const postValidation = z.object({
    caption: z.string().min(5, { message: "Minimum 5 characters." }).max(2200, { message: "Maximum 2,200 characters" }),
    file: z.custom<File[]>(),
    location: z.string().min(1, { message: "This field is required" }).max(1000, { message: "Maximum 1000 characters." }),
    tags: z.string(),
});