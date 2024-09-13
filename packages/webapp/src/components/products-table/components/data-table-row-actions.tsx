import { CheckCircledIcon, DotsHorizontalIcon } from "@radix-ui/react-icons";
import { Row } from "@tanstack/react-table";

import { Button } from "../../ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../../ui/dropdown-menu";

import { productSchema } from "./data/schema";
import { useNavigate } from "@tanstack/react-router";
import { deleteProduct } from "@/api/product";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { Ban } from "lucide-react";
import { useState } from "react";
import { AlertModal } from "@/components/ui/modals/alert-modal";

interface DataTableRowActionsProps<TData> {
  row: Row<TData>;
}

export function DataTableRowActions<TData>({
  row,
}: DataTableRowActionsProps<TData>) {
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  const queryClient = useQueryClient();

  const navigate = useNavigate();

  const product = productSchema.parse(row.original);

  const deleteItem = async () => {
    await deleteProduct(product.id);
  };

  const deleteMutation = useMutation({
    mutationFn: deleteItem,
    onSuccess: () => {
      toast(`Product '${product.productName}' deleted`, {
        icon: <CheckCircledIcon className="w-4 h-4" />,
      });

      queryClient.invalidateQueries({ queryKey: ["products"] });
      setIsDeleteModalOpen(false);
    },
    onError: () => {
      toast("Something went wrong", { icon: <Ban className="w-4 h-4" /> });
    },
  });

  return (
    <>
      <AlertModal
        title="Delete product?"
        isOpen={isDeleteModalOpen}
        loading={deleteMutation.isPending}
        onClose={() => {
          setIsDeleteModalOpen(false);
        }}
        onConfirm={() => {
          deleteMutation.mutate();
        }}
      />
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            variant="ghost"
            className="flex h-8 w-8 p-0 data-[state=open]:bg-muted"
          >
            <DotsHorizontalIcon className="h-4 w-4" />
            <span className="sr-only">Open menu</span>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-[160px]">
          <DropdownMenuItem
            onClick={() =>
              navigate({
                to: "/products/$productId",
                params: (prev) => ({ ...prev, productId: product.id }),
              })
            }
          >
            Edit
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem onClick={() => setIsDeleteModalOpen(true)}>
            Delete
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
}
