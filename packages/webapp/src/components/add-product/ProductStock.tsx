import { useState } from "react";
import View from "../View";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { PlusCircledIcon, TrashIcon } from "@radix-ui/react-icons";
import { CardFooter } from "../ui/card";
import { useProductContext } from "../../contexts/ProductContext";
import { getErrorForField } from "@/lib/utils";
import { ProductType } from "@/lib/schemas/product";

type InventoryItem = {
  id: number;
  sku: string;
  stock: number;
  cost: number;
  price: number;
};

export function ProductStockView() {
  return (
    <View
      className="h-auto"
      header={
        <p className="text-sm text-muted-foreground">Inventory (stock)</p>
      }
    >
      <Stock />
    </View>
  );
}

function Stock() {
  const skuId = "sku";
  const priceId = "price";
  const costId = "unitCost";
  const inventoryCountId = "inventoryCount";

  const { error, updateProductData } = useProductContext();

  const skuValidationError = getErrorForField(error, skuId);
  const priceValidationError = getErrorForField(error, priceId);
  const costValidationError = getErrorForField(error, costId);
  const inventoryCountValidationError = getErrorForField(
    error,
    inventoryCountId
  );

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    type: "inventoryCount" | "sku" | "unitCost" | "price"
  ) => {
    if (type == "sku") updateProductData({ [type]: e.target.value });
    else if (type == "inventoryCount")
      updateProductData({ [type]: parseInt(e.target.value) });
    else updateProductData({ [type]: parseFloat(e.target.value) });
  };

  const [rows, setRows] = useState<InventoryItem[]>([
    {
      id: Date.now(),
      sku: "",
      stock: 0,
      cost: 0,
      price: 0,
    },
  ]);

  const addRow = () => {
    const newRow = {
      id: Date.now(),
      sku: "",
      stock: 0,
      cost: 0,
      price: 0,
    };
    setRows([...rows, newRow]);
  };

  const removeRow = (id: number) => {
    setRows(rows.filter((row) => row.id !== id));
  };

  return (
    <>
      {rows.length > 0 && (
        <Table className="">
          <TableHeader>
            <TableRow>
              <TableHead>SKU</TableHead>
              <TableHead>Stock</TableHead>
              <TableHead>Cost</TableHead>
              <TableHead>Price</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {rows.map((row, index) => (
              <TableRow key={row.id}>
                <TableCell>
                  <Label htmlFor={`sku-${index}`} className="sr-only">
                    SKU
                  </Label>
                  <Input
                    id={`sku-${index}`}
                    type="text"
                    placeholder="SKU"
                    onChange={(e) => handleChange(e, "sku")}
                  />
                  {skuValidationError && (
                    <p className="text-red-500 text-sm font-medium">
                      {skuValidationError.message}
                    </p>
                  )}
                </TableCell>
                <TableCell>
                  <Label htmlFor={`stock-${index}`} className="sr-only">
                    Stock
                  </Label>
                  <Input
                    id={`stock-${index}`}
                    type="number"
                    placeholder="1"
                    onChange={(e) => handleChange(e, "inventoryCount")}
                  />
                  {inventoryCountValidationError && (
                    <p className="text-red-500 text-sm font-medium">
                      {inventoryCountValidationError.message}
                    </p>
                  )}
                </TableCell>
                <TableCell>
                  <Label htmlFor={`cost-${index}`} className="sr-only">
                    Cost
                  </Label>
                  <Input
                    id={`cost-${index}`}
                    type="number"
                    placeholder="9.99"
                    onChange={(e) => handleChange(e, "unitCost")}
                  />
                  {costValidationError && (
                    <p className="text-red-500 text-sm font-medium">
                      {costValidationError.message}
                    </p>
                  )}
                </TableCell>
                <TableCell>
                  <Label htmlFor={`price-${index}`} className="sr-only">
                    Price
                  </Label>
                  <Input
                    id={`price-${index}`}
                    type="number"
                    placeholder="9.99"
                    onChange={(e) => handleChange(e, "price")}
                  />
                  {priceValidationError && (
                    <p className="text-red-500 text-sm font-medium">
                      {priceValidationError.message}
                    </p>
                  )}
                </TableCell>
                {index != 0 && (
                  <TableCell>
                    <Button
                      size="sm"
                      variant="ghost"
                      onClick={() => removeRow(row.id)}
                    >
                      <TrashIcon className="h-4 w-4 text-red-500" />
                    </Button>
                  </TableCell>
                )}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      )}
      {/* <CardFooter className="justify-center pt-4">
        <Button size="sm" variant="ghost" className="gap-1" onClick={addRow}>
          <PlusCircledIcon className="h-3.5 w-3.5" />
          Add Variant
        </Button>
      </CardFooter> */}
    </>
  );
}
