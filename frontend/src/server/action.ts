import { createSession, deleteSession } from "@/lib/mainlib"
import { FormState, SignupFormSchema } from "@/lib/definition"
import { redirect } from "next/navigation"

export async function signup(state: FormState, formData: FormData) {
  // Validate form fields
  const validatedFields = SignupFormSchema.safeParse({
    name: formData.get("name"),
    email: formData.get("email"),
    password: formData.get("password"),
  })

  // If any form fields are invalid, return early
  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
    }
  }

  // Create the user by post request on the backend
  console.log(validatedFields.data, "validatedFields")
  const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL
  const response = await fetch(`${backendUrl}/auth/signup`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(validatedFields.data),
  })
  if (!response.ok) {
    throw new Error("Failed to sign up")
  }
  const data = await response.json()
  console.log("data", data)
   // 4. Create user session
   await createSession(data.user.id)
   // 5. Redirect user
   redirect('/admindash')
  return { message: "Signed up successfully" }
}



export async function logout() {
    deleteSession()
    redirect('/auth/login')
  }
