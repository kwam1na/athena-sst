import { columns } from "./products-table/components/columns";
import { DataTable } from "./products-table/components/data-table";
import { useQuery } from "@tanstack/react-query";
import { getAllProducts } from "@/api/product.ts";
import { ErrorPage } from "./states/error";
import TableSkeleton from "./states/loading/table-skeleton";
import { EmptyState } from "./states/empty/empty-state";
import { PackageXIcon } from "lucide-react";
import { Link } from "@tanstack/react-router";
import { Button } from "./ui/button";
import { PlusIcon } from "@radix-ui/react-icons";
import { StoreResponse } from "@/lib/schemas/store";

export default function Products({ store }: { store: StoreResponse }) {
  const { data, isLoading, isFetching, error } = useQuery({
    queryKey: ["products"],
    queryFn: () => getAllProducts(store.id),
  });

  return (
    <div className="hidden h-full flex-1 flex-col space-y-8 p-8 md:flex">
      {isLoading && <TableSkeleton />}
      {!isLoading && !error && data && data.length > 0 && (
        <DataTable data={data} columns={columns} />
      )}
      {error && <ErrorPage title={error.message} />}
      {data && data.length == 0 && !isFetching && (
        <EmptyState
          icon={<PackageXIcon className="w-16 h-16 text-muted-foreground" />}
          text={`No products in ${store.storeName}`}
          cta={
            <Link
              to="/organization/$orgName/store/$storeName/products/new"
              params={(prev) => ({
                ...prev,
                storeName: prev.storeName!,
                orgName: prev.orgName!,
              })}
            >
              <Button variant={"outline"}>
                <PlusIcon className="w-4 h-4 mr-2" />
                Add product
              </Button>
            </Link>
          }
        />
      )}
    </div>
  );
}
