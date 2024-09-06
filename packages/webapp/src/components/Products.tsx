import { columns } from "./products-table/components/columns";
import { DataTable } from "./products-table/components/data-table";
import { useQuery } from "@tanstack/react-query";
import { getAllProducts } from "@/api/product.ts";

export default function Products() {
  const { data, isLoading } = useQuery({
    queryKey: ["products"],
    queryFn: getAllProducts,
  });

  return (
    <div className="hidden h-full flex-1 flex-col space-y-8 p-8 md:flex">
      {!isLoading && data && <DataTable data={data} columns={columns} />}
    </div>
  );
}
