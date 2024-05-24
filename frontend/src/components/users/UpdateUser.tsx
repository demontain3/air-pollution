// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import { useForm, UseFormReturn } from "react-hook-form";
// import { zodResolver } from "@hookform/resolvers/zod";
// import { z } from "zod";
// import { useToast } from "@/components/ui/use-toast";
// import { LocalStore } from "@/store/localStore";
// import {
//   Form,
//   FormControl,
//   FormField,
//   FormItem,
//   FormLabel,
//   FormMessage,
// } from "@/components/ui/form";
// import { Button } from "@/components/ui/button";
// import { Input } from "@/components/ui/input";
// import {
//   Select,
//   SelectContent,
//   SelectItem,
//   SelectTrigger,
//   SelectValue,
// } from "@/components/ui/select";
// import useUserCreated from "@/store/useUserCreated";
// import useMeStore from "@/store/useMeStore";
// import { useRouter } from "next/navigation";
// import { CalendarIcon } from "@radix-ui/react-icons";
// import { format } from "date-fns";

// import { cn } from "@/lib/utils";
// import { Calendar } from "@/components/ui/calendar";
// import {
//   Popover,
//   PopoverContent,
//   PopoverTrigger,
// } from "@/components/ui/popover";
// import { useMutation } from "@tanstack/react-query";
// import { SignupFormSchema, formSchema } from "@/lib/definition";
// import { signupFormSchema } from "@/lib/validators/signupValidators";
// import { labelLead } from "../auth-form/SignupForm";

// type userDataType = z.infer<typeof formSchema>;
// type Props = {
//   setIsOpen: (isOpen: boolean) => void;
//   user: userDataType | undefined;
//   refetch: () => void;
// };

// const UpdateUser = React.memo(function UpdateUser({
//   setIsOpen,
//   user,
//   refetch,
// }: Props) {
//   const { meData: userData } = useMeStore();
//   const { toast } = useToast();
//   const { setUserCreated } = useUserCreated();
//   const [date, setDate] = useState<Date | null>(null);

//   const taskCreationForm = useForm<userDataType>({
//     resolver: zodResolver(formSchema),
//     defaultValues: {
//         firstName: user?.firstName || "",
//         lastName: user?.lastName || "",
//         email: user?.email || "",
//         password: user?.password || "",
        
//     },
//   });

//   const router = useRouter();

//   console.log(user, "task");

//   const updateTaskMutation = useMutation({
//     mutationFn: async (data: userDataType) => {
//       setIsOpen(true);
//       const response = await axios.put(
//         `${process.env.NEXT_PUBLIC_BACKEND_URL}/user/${user?.id}`,
//         { ...data, organizationId: userData?.organizationId },
//         {
//           headers: {
//             Authorization: `Bearer ${LocalStore.getAccessToken()}`,
//           },
//         }
//       );

//       if (response.status >= 200 && response.status < 300) {
//         return response.data;
//       } else {
//         throw new Error("An error occurred while updating the task.");
//       }
//     },
//     onError: (err: any) => {
//       toast({
//         variant: "destructive",
//         title: "Uh oh! Something went wrong.",
//         description:
//           err.response?.data?.message ||
//           "An error occurred while updating the task.",
//       });
//       console.error("Error updating task:", err);
//     },
//     onSuccess: (data) => {
//       refetch();
//       setIsOpen(false);
//       toast({
//         variant: "default",
//         title: "Task updated successfully.",
//       });

//       taskCreationForm.reset();
//     },
//   });

//   const handleSubmit = (data: TaskData) => {
//     updateTaskMutation.mutate(data);
//   };

//   useEffect(() => {
//     // Check user roles if needed
//   }, [userData]);

//   useEffect(() => {
//     // Reset form values when task prop changes
//     taskCreationForm.reset({
//       name: task?.name || "",
//       taskDesc: task?.taskDesc || "",
//       priority: task?.priority || TaskStatus.High,
//       dueDate: task?.dueDate || new Date(),
//     });
//   }, [task, taskCreationForm.reset]);

//   return (
//     <div>
//       <div>
//         <div className="sm:max-w-[600px]">
//           <div>
//             <div className="text-xl font-bold text-center">Update Task!</div>
//           </div>
//           <div className="grid gap-4 py-4">
//             <Form {...taskCreationForm}>
//               <form
//                 onSubmit={taskCreationForm.handleSubmit(handleSubmit)}
//                 className="mt-4 space-y-4"
//               >
//                 <FormField
//                   control={taskCreationForm.control}
//                   name="firstName"
//                   render={({ field }) => (
//                     <FormItem>
//                       <div className="relative">
//                         <FormLabel className={labelLead}>First Name *</FormLabel>
//                         <FormControl>
//                           <Input
//                             placeholder=""
//                             className="border block px-4 h-16 pt-4  w-full placeholder-gray-500 rounded-sm sm:text-sm mt-1 peer  placeholder:text-gray-500 bg-[#F7F7FC] shadow-none"
//                             {...field}
//                           />
//                         </FormControl>
//                       </div>
//                       <FormMessage />
//                     </FormItem>
//                   )}
//                 />
//                 <FormField
//                   control={taskCreationForm.control}
//                   name="lastName"
//                   render={({ field }) => (
//                     <FormItem>
//                       <div className="relative">
//                         <FormLabel className={labelLead}>Last Name *</FormLabel>
//                         <FormControl>
//                           <Input
//                             placeholder=""
//                             className="border block px-4 h-16 pt-4  w-full placeholder-gray-500 rounded-sm sm:text-sm mt-1 peer  placeholder:text-gray-500 bg-[#F7F7FC] shadow-none"
//                             {...field}
//                           />
//                         </FormControl>
//                       </div>
//                       <FormMessage />
//                     </FormItem>
//                   )}
//                 />
//                 <FormField
//                   control={taskCreationForm.control}
//                   name="email"
//                   render={({ field }) => (
//                     <FormItem>
//                       <div className="relative">
//                         <FormLabel className={labelLead}>Email *</FormLabel>
//                         <FormControl>
//                           <Input
//                             placeholder=""
//                             className="border block px-4 h-16 pt-4  w-full placeholder-gray-500 rounded-sm sm:text-sm mt-1 peer  placeholder:text-gray-500 bg-[#F7F7FC] shadow-none"
//                             {...field}
//                           />
//                         </FormControl>
//                       </div>
//                       <FormMessage />
//                     </FormItem>
//                   )}
//                 />
//                 <FormField
//                   control={taskCreationForm.control}
//                   name="password"
//                   render={({ field }) => (
//                     <FormItem>
//                       <div className="relative">
//                         <FormControl>
//                           <Input
//                             type="text"
//                             placeholder=""
//                             className="border block px-4 h-16 pt-4  w-full placeholder-gray-500 rounded-sm sm:text-sm mt-1 peer  placeholder:text-gray-500 bg-[#F7F7FC] shadow-none"
//                             {...field}
//                           />
//                         </FormControl>
//                         <FormLabel className={labelLead}>
//                           Password *
//                         </FormLabel>
//                       </div>
//                       <FormMessage />
//                     </FormItem>
//                   )}
//                 />


//                 <div>
//                   <Button
//                     type="submit"
//                     variant="default"
//                     disabled={updateTaskMutation.isPending}
//                     className={cn(
//                       updateTaskMutation.isPending
//                         ? `inline-flex items-center justify-center w-full px-6 py-6 text-sm font-semibold leading-5 text-gray-500 transition-all duration-200 bg-primary border border-transparent rounded-md`
//                         : `inline-flex items-center justify-center w-full px-6 py-6 text-sm font-semibold leading-5 text-white transition-all duration-200 bg-primary border border-transparent rounded-md`
//                     )}
//                     // onClick={() => setIsOpen()}
//                   >
//                     Update
//                   </Button>
//                 </div>
//               </form>
//             </Form>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// });

// UpdateUser.displayName = "UpdateUser";

// export default UpdateUser;