import { getErrorForField } from "@/lib/utils";
import { useProductContext } from "../../contexts/ProductContext";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Textarea } from "../ui/textarea";
import View from "../View";
import { Skeleton } from "../ui/skeleton";

export function ProductDetailsView() {
  const id = "productName";

  const { productData, isLoading, updateProductData, error } =
    useProductContext();

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    updateProductData({ productName: e.target.value });
  };

  const validationError = getErrorForField(error, id);

  return (
    <View
      className="h-auto"
      header={<p className="text-sm text-sm text-muted-foreground">Details</p>}
    >
      <div className="px-4 py-8 space-y-4">
        <div className="space-y-2">
          <Label className="text-muted-foreground" htmlFor="name">
            Name
          </Label>
          {isLoading && <Skeleton className="h-[40px]" />}
          {!isLoading && (
            <Input
              value={productData.productName || ""}
              onChange={handleNameChange}
            />
          )}
          {validationError && (
            <p className="text-red-500 text-sm font-medium">
              {validationError.message}
            </p>
          )}
        </div>
        <div className="space-y-2">
          <Label className="text-muted-foreground" htmlFor="description">
            Description
          </Label>
          {isLoading && <Skeleton className="h-[96px] w-full" />}
          {!isLoading && <Textarea />}
        </div>
      </div>
    </View>
  );
}
