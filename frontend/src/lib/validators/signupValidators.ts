// signupFormSchema.ts
import { z } from "zod"

export const signupFormSchema = z.object({
  firstName: z.string().min(1, { message: "First name is required." }),
  lastName: z.string().min(1, { message: "Last name is required." }),
  email: z.string().email({ message: "Please provide a valid email." }),
  password: z
    .string()
    .min(8, { message: "Password must be at least 8 characters long." }),
  // organizationId: z.string().transform(Number),
})

export type SignupFormType = z.infer<typeof signupFormSchema>
