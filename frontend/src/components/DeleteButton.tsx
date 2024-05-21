import {
  InvalidateQueryFilters,
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";
import axios, { AxiosError } from "axios";
import { Button } from "@/components/ui/button";
import { Delete, Trash } from "lucide-react";
import {
  AlertDialog,
  AlertDialogTrigger,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogCancel,
  AlertDialogAction,
} from "@/components/ui/alert-dialog";
import { LocalStore } from "@/store/localstore";
import { useToast } from "@/components/ui/use-toast";
import { cn } from "@/lib/utils";

interface DeleteButtonProps {
  id: number;
  url: any;
  isSegmentLeadDelete?: boolean;
  entity: string; // For example: 'leads', 'users'
  onDeleteSuccess: () => void; // Callback to perform after a successful delete
  message?: string; // Custom message for the delete confirmation
  queryKey: string | (string | number)[];
  type?: string; // React Query key for cache invalidation
}

const DeleteButton: React.FC<DeleteButtonProps> = ({
  id,
  url,
  entity,
  type,
  onDeleteSuccess,
  isSegmentLeadDelete,
  message = "This will permanently delete the item and remove it from our servers.",
  queryKey,
}) => {
  const { toast } = useToast();
  const queryClient = useQueryClient();

  // if(!isSegmentLeadDelete){

  //   mutation = useMutation({
  //     mutationFn: async () =>
  //       await axios.delete(`${url}/${entity}/${id}`, {
  //         headers: { Authorization: `Bearer ${LocalStore.getAccessToken()}` },
  //       }),
  //     onSuccess: () => {
  //       toast({
  //         variant: "default",
  //         title: "Success ✅",
  //         description: `${
  //           entity.charAt(0).toUpperCase() + entity.slice(1)
  //         } deleted successfully`,
  //       });
  //       queryClient.invalidateQueries(queryKey as InvalidateQueryFilters);
  //       onDeleteSuccess();
  //     },
  //     onError: (error: AxiosError<{ message: string }>) => {
  //       toast({
  //         variant: "destructive",
  //         title: "Uh oh! Something went wrong.",
  //         description:
  //           error.response?.data?.message ||
  //           `An error occurred while deleting the ${entity}.`,
  //       });
  //     },
  //   });
  // }
  // else{
  //   mutation = useMutation({
  //     mutationFn: async () =>
  //       await axios.delete(`${url}`, {
  //         headers: { Authorization: `Bearer ${LocalStore.getAccessToken()}` },
  //       }),
  //     onSuccess: () => {
  //       toast({
  //         variant: "default",
  //         title: "Success ✅",
  //         description: `${
  //           entity.charAt(0).toUpperCase() + entity.slice(1)
  //         } deleted successfully`,
  //       });
  //       queryClient.invalidateQueries(queryKey as InvalidateQueryFilters);
  //       onDeleteSuccess();
  //     },
  //     onError: (error: AxiosError<{ message: string }>) => {
  //       toast({
  //         variant: "destructive",
  //         title: "Uh oh! Something went wrong.",
  //         description:
  //           error.response?.data?.message ||
  //           `An error occurred while deleting the ${entity}.`,
  //       });
  //     },
  //   });
  // }

  const mutationFn = isSegmentLeadDelete
    ? async () =>
        await axios.delete(`${url}`, {
          headers: { Authorization: `Bearer ${LocalStore.getAccessToken()}` },
        })
    : async () =>
        await axios.delete(`${url}/${entity}/${id}`, {
          headers: { Authorization: `Bearer ${LocalStore.getAccessToken()}` },
        });

  const mutation = useMutation({
    mutationFn,
    onSuccess: () => {
      toast({
        variant: "default",
        title: "Success ✅",
        description: `${
          entity.charAt(0).toUpperCase() + entity.slice(1)
        } deleted successfully`,
      });
      queryClient.invalidateQueries(queryKey as InvalidateQueryFilters);
      onDeleteSuccess();
    },
    onError: (error: AxiosError<{ message: string }>) => {
      toast({
        variant: "destructive",
        title: "Uh oh! Something went wrong.",
        description:
          error.response?.data?.message ||
          `An error occurred while deleting the ${entity}.`,
      });
    },
  });

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild className="hover:bg-gray-100 w-full">
        <Button
          variant={type === "button" ? "default" : "mini"}
          className={cn(
            type === "button"
              ? "flex-row items-center justify-start pl-6 gap-8 flex w-full bg-white text-black shadow-none border-none font-bold hover:bg-gray-100 h-12 border border-gray-50"
              : "flex-col w-12"
          )}
        >
          <Trash size={16} className="font-bold" />
          <p className={cn(type === "button" ? "" : "text-xs h-1")}>Remove</p>
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you sure you want to delete?</AlertDialogTitle>
          <AlertDialogDescription>{message}</AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction onClick={() => mutation.mutate()}>
            Delete
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default DeleteButton;
