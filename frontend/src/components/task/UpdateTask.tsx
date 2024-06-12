import React, { useEffect, useState } from "react";
import axios from "axios";
import { useForm, UseFormReturn } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useToast } from "@/components/ui/use-toast";
import { LocalStore } from "@/store/localStore";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
// import useUserCreated from "@/store/useUserCreated";
import useMeStore from "@/store/useMeStore";
import { useRouter } from "next/navigation";
import {
  TaskStatus,
  taskSchema,
  transactionTaskSchema,
  transactionTaskType,
} from "@/lib/validators/TaskValidator";
import { CalendarIcon } from "@radix-ui/react-icons";
import { format } from "date-fns";

import { cn } from "@/lib/utils";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { useMutation } from "@tanstack/react-query";
import { labelLead } from "../auth-form/SignupForm";

type TaskData = z.infer<typeof transactionTaskSchema>;
type Props = {
  setIsOpen: (isOpen: boolean) => void;
  task: TaskData | undefined;
  refetch: () => void;
};

const UpdateTask = React.memo(function UpdateTask({
  setIsOpen,
  task,
  refetch,
}: Props) {
  const { meData: userData } = useMeStore();
  const { toast } = useToast();
  const [date, setDate] = useState<Date | null>(null);

  const taskCreationForm = useForm<TaskData>({
    resolver: zodResolver(transactionTaskSchema),
    defaultValues: {
      name: task?.name || "",
      note: task?.note || "",
      dueDate: task?.dueDate || new Date(),
      type: task?.type || transactionTaskType.DOCUMENT,
      customerId: task?.customerId || 0,
      // templateDocument: task?.templateDocument || null,
    },
  });

  const router = useRouter();

  console.log(task, "task");

  const updateTaskMutation = useMutation({
    mutationFn: async (data: TaskData) => {
      setIsOpen(true);
      const response = await axios.put(
        `${process.env.NEXT_PUBLIC_BACKEND_API_URL_LEADS}/tasks/${task?.id}`,
        { ...data },
        {
          headers: {
            Authorization: `Bearer ${LocalStore.getAccessToken()}`,
          },
        }
      );

      if (response.status >= 200 && response.status < 300) {
        return response.data;
      } else {
        throw new Error("An error occurred while updating the task.");
      }
    },
    onError: (err: any) => {
      toast({
        variant: "destructive",
        title: "Uh oh! Something went wrong.",
        description:
          err.response?.data?.message ||
          "An error occurred while updating the task.",
      });
      console.error("Error updating task:", err);
    },
    onSuccess: (data) => {
      refetch();
      setIsOpen(false);
      toast({
        variant: "default",
        title: "Task updated successfully.",
      });

      taskCreationForm.reset();
    },
  });

  const handleSubmit = (data: TaskData) => {
    updateTaskMutation.mutate(data);
  };

  useEffect(() => {
    // Check user roles if needed
  }, [userData]);

  useEffect(() => {
    // Reset form values when task prop changes
    taskCreationForm.reset({
      name: task?.name || "",
      note: task?.note || "",
      type: task?.type || transactionTaskType.DOCUMENT,
      customerId: task?.customerId || 0,
      dueDate: task?.dueDate || new Date(),
    });
  }, [task, taskCreationForm.reset]);

  return (
    <div>
      <div>
        <div className="sm:max-w-[600px]">
          <div>
            <div className="text-xl font-bold text-center">Update Task!</div>
          </div>
          <div className="grid gap-4 py-4">
            <Form {...taskCreationForm}>
              <form
                onSubmit={taskCreationForm.handleSubmit(handleSubmit)}
                className="mt-4 space-y-4"
              >
                <FormField
                  control={taskCreationForm.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <div className="relative">
                        <FormLabel className={labelLead}>Task Name *</FormLabel>
                        <FormControl>
                          <Input
                            placeholder=""
                            className="border block px-4 h-16 pt-4  w-full placeholder-gray-500 rounded-sm sm:text-sm mt-1 peer  placeholder:text-gray-500 bg-[#F7F7FC] shadow-none"
                            {...field}
                          />
                        </FormControl>
                      </div>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={taskCreationForm.control}
                  name="note"
                  render={({ field }) => (
                    <FormItem>
                      <div className="relative">
                        <FormControl>
                          <Input
                            type="text"
                            placeholder=""
                            className="border block px-4 h-16 pt-4  w-full placeholder-gray-500 rounded-sm sm:text-sm mt-1 peer  placeholder:text-gray-500 bg-[#F7F7FC] shadow-none"
                            {...field}
                          />
                        </FormControl>
                        <FormLabel className={labelLead}>
                          Description *
                        </FormLabel>
                      </div>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <div className="flex flex-row gap-2 ">
                  <FormField
                    control={taskCreationForm.control}
                    name="dueDate"
                    render={({ field }) => (
                      <FormItem className="flex flex-col">
                        <div className="relative">
                          <FormLabel htmlFor="dueDate" className={labelLead}>
                            Due Date
                          </FormLabel>
                          <Popover>
                            <PopoverTrigger asChild>
                              <FormControl>
                                <Button
                                  variant={"outline"}
                                  className={cn(
                                    "w-[250px]  h-16 text-md  pt-6 pl-4 bg-[#F7F7FC] shadow-none",
                                    !field.value && "text-muted-foreground"
                                  )}
                                >
                                  {field.value ? (
                                    format(new Date(field.value), "PPP") // Convert string to Date object
                                  ) : (
                                    <span>Pick a Due Date</span>
                                  )}
                                  <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                                </Button>
                              </FormControl>
                            </PopoverTrigger>
                            <PopoverContent
                              className="w-auto p-0"
                              align="start"
                            >
                              <Calendar
                                mode="single"
                                selected={field.value}
                                onSelect={field.onChange}
                                disabled={(date) => date < new Date()}
                                initialFocus
                              />
                            </PopoverContent>
                          </Popover>
                        </div>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={taskCreationForm.control}
                    name="type"
                    render={({ field }) => (
                      <FormItem>
                        <FormControl>
                          <div className="relative">
                            <FormLabel htmlFor="priority" className={labelLead}>
                              Priority
                            </FormLabel>
                            <Select
                              value={field.value}
                              onValueChange={(value: any) =>
                                field.onChange(value)
                              }
                            >
                              <SelectTrigger className="w-[300px] pt-6 pl-4  h-16 text-md  bg-[#F7F7FC] shadow-none ">
                                <SelectValue placeholder="Select Priority" />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value={TaskStatus.High}>
                                  HIGH
                                </SelectItem>
                                <SelectItem value={TaskStatus.Medium}>
                                  MEDIUM
                                </SelectItem>
                                <SelectItem value={TaskStatus.Low}>
                                  LOW
                                </SelectItem>
                              </SelectContent>
                            </Select>
                          </div>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <div>
                  <Button
                    type="submit"
                    variant="default"
                    disabled={updateTaskMutation.isPending}
                    className={cn(
                      updateTaskMutation.isPending
                        ? `inline-flex items-center justify-center w-full px-6 py-6 text-sm font-semibold leading-5 text-gray-500 transition-all duration-200 bg-primary border border-transparent rounded-md`
                        : `inline-flex items-center justify-center w-full px-6 py-6 text-sm font-semibold leading-5 text-white transition-all duration-200 bg-primary border border-transparent rounded-md`
                    )}
                    // onClick={() => setIsOpen()}
                  >
                    Update
                  </Button>
                </div>
              </form>
            </Form>
          </div>
        </div>
      </div>
    </div>
  );
});

UpdateTask.displayName = "UpdateTask";

export default UpdateTask;
