// import React from "react"
// import { redirect } from "next/navigation"
// import { getSession, login } from "@/lib"

// const page = () => {
//   const session = getSession()
//   return (
//     <div>
//       <section>
//         <form
//           action={async (formData) => {
//             "use server"
//             await login(formData)
//             redirect("/dashboard")
//           }}
//         >
//           <div>
//             <label htmlFor="email">Email</label>
//             <input type="email" id="email" name="email" />
//           </div>
//           <div>
//             <label htmlFor="password">Password</label>
//             <input type="password" id="password" name="password" />
//           </div>
//           <button type="submit">Login</button>
//         </form>

//         <form>
//           <button type="submit">logout</button>
//         </form>
//       </section>

//       <pre>{JSON.stringify(session, null, 2)}</pre>
//     </div>
//   )
// }

// export default page
