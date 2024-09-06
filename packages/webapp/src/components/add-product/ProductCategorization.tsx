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

function ProductCategorization() {
  const categoryId = "categoryId";
  const subcategoryId = "subcategoryId";

  const { error, updateProductData } = useProductContext();

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
          <Select
            onValueChange={(value: string) => {
              updateProductData({ categoryId: value });
            }}
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
          <Select
            onValueChange={(value: string) => {
              updateProductData({ subcategoryId: value });
            }}
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

export function ProductCategorizationView() {
  return (
    <View
      className="h-auto"
      header={
        <p className="text-sm text-sm text-muted-foreground">
          Inventory (organization)
        </p>
      }
    >
      <ProductCategorization />
    </View>
  );
}
