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
    queryKey: ["products", store.id],
    queryFn: () =>
      getAllProducts({
        organizationId: store.organizationId,
        storeId: store.id,
      }),
  });

  return (
    <div>
      {isLoading && (
        <div className="p-8">
          <TableSkeleton />
        </div>
      )}
      {!isLoading && !error && data && data.length > 0 && (
        <div className="p-8">
          <DataTable data={data} columns={columns} />
        </div>
      )}
      {error && <ErrorPage title={error.message} />}
      {data && data.length == 0 && !isFetching && (
        <EmptyState
          icon={<PackageXIcon className="w-16 h-16 text-muted-foreground" />}
          text={
            <div className="flex gap-1 text-sm">
              <p className="text-muted-foreground">No products in</p>
              <p className="font-medium">{store.storeName}</p>
            </div>
          }
          cta={
            <Link
              to="/organization/$orgUrlSlug/store/$storeUrlSlug/products/new"
              params={(prev) => ({
                ...prev,
                storeUrlSlug: prev.storeUrlSlug!,
                orgUrlSlug: prev.orgUrlSlug!,
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
