import { useProductContext } from "../../contexts/ProductContext";
import { Label } from "../ui/label";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import View from "../View";
import { getErrorForField } from "@/lib/utils";
import { useQuery } from "@tanstack/react-query";
import { getAllCategories } from "@/api/category";
import { getAllSubcategories } from "@/api/subcategory";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "../ui/button";
import { useState } from "react";
import CategorySubcategoryManager from "./CategorySubcategoryManager";
import { CogIcon } from "lucide-react";
import { Skeleton } from "../ui/skeleton";

function ProductCategorization() {
  const categoryId = "categoryId";
  const subcategoryId = "subcategoryId";

  const { error, isLoading, productData, updateProductData } =
    useProductContext();

  const categoryError = getErrorForField(error, categoryId);
  const subcategoryError = getErrorForField(error, subcategoryId);

  const { data: categoriesData } = useQuery({
    queryKey: ["categories"],
    queryFn: getAllCategories,
  });

  const { data: subcategoriesData } = useQuery({
    queryKey: ["subcategories"],
    queryFn: getAllSubcategories,
  });

  const categories =
    categoriesData?.map((category: any) => ({
      name: category.categoryName,
      id: category.id,
    })) || [];

  const subcategories =
    subcategoriesData?.map((subcategory) => ({
      name: subcategory.subcategoryName,
      id: subcategory.id,
    })) || [];

  return (
    <>
      <div className="flex gap-8 px-4 py-8">
        <div className="flex flex-col gap-2 w-[50%]">
          <Label className="text-muted-foreground" htmlFor="category">
            Category
          </Label>
          {isLoading && <Skeleton className="h-[40px]" />}
          {!isLoading && (
            <Select
              onValueChange={(value: string) => {
                updateProductData({ categoryId: value });
              }}
              value={productData.categoryId}
            >
              <SelectTrigger id="category" aria-label="Select category">
                <SelectValue placeholder="Select category" />
              </SelectTrigger>

              <SelectContent>
                <SelectGroup>
                  {categories.map((category: any) => {
                    return (
                      <SelectItem key={category.id} value={category.id}>
                        {category.name}
                      </SelectItem>
                    );
                  })}
                </SelectGroup>
              </SelectContent>
            </Select>
          )}
          {categoryError && (
            <p className="text-red-500 text-sm font-medium">
              {categoryError.message}
            </p>
          )}
        </div>
        <div className="flex flex-col gap-2 w-[50%]">
          <Label className="text-muted-foreground" htmlFor="subcategory">
            Subcategory
          </Label>
          {isLoading && <Skeleton className="h-[40px]" />}
          {!isLoading && (
            <Select
              onValueChange={(value: string) => {
                if (value == "new") {
                  alert("new");
                } else updateProductData({ subcategoryId: value });
              }}
              value={productData.subcategoryId}
            >
              <SelectTrigger id="subcategory" aria-label="Select subcategory">
                <SelectValue placeholder="Select subcategory" />
              </SelectTrigger>
              <SelectContent>
                {subcategories.map((subcategory: any) => {
                  return (
                    <SelectItem key={subcategory.id} value={subcategory.id}>
                      {subcategory.name}
                    </SelectItem>
                  );
                })}
              </SelectContent>
            </Select>
          )}
          {subcategoryError && (
            <p className="text-red-500 text-sm font-medium">
              {subcategoryError.message}
            </p>
          )}
        </div>
      </div>
    </>
  );
}

function CategorizationManagerDialog({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) {
  const handleClose = () => {
    onClose();
  };

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{`Manage`}</DialogTitle>
        </DialogHeader>
        <CategorySubcategoryManager />
      </DialogContent>
    </Dialog>
  );
}

export function ProductCategorizationView() {
  const [dialogProps, setDialogProps] = useState({
    open: false,
  });

  return (
    <View
      className="h-auto"
      header={
        <div className="flex items-center justify-between">
          <p className="text-sm text-sm text-muted-foreground">
            Inventory (organization)
          </p>
          <div className="space-x-2">
            <Button
              className="text-muted-foreground"
              variant={"ghost"}
              size={"icon"}
              onClick={() => {
                setDialogProps({
                  open: true,
                });
              }}
            >
              <CogIcon className="w-4 h-4" />
            </Button>
          </div>
        </div>
      }
    >
      <CategorizationManagerDialog
        open={dialogProps.open}
        onClose={() => {
          setDialogProps((prev) => ({ ...prev, open: false }));
        }}
      />
      <ProductCategorization />
    </View>
  );
}
