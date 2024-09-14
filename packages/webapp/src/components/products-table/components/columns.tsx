import { ColumnDef } from "@tanstack/react-table";

import { Badge } from "../../ui/badge";

import placeholder from "@/assets/placeholder.png";
import { DataTableColumnHeader } from "./data-table-column-header";
import { DataTableRowActions } from "./data-table-row-actions";
import { capitalizeFirstLetter } from "@/lib/utils";
import { Link } from "@tanstack/react-router";
import { ProductResponseBody } from "@/lib/schemas/product";

export const columns: ColumnDef<ProductResponseBody>[] = [
  {
    accessorKey: "productName",
    header: ({ column }) => <DataTableColumnHeader column={column} title="" />,
    cell: ({ row }) => {
      return (
        <div className="flex space-x-2">
          <Link
            to="/organization/$orgUrlSlug/store/$storeUrlSlug/products/$productId"
            params={(prev) => ({
              ...prev,
              orgUrlSlug: prev.orgUrlSlug!,
              storeUrlSlug: prev.storeUrlSlug!,
              productId: row.original.id,
            })}
            className="flex items-center gap-8"
          >
            <img
              alt="Uploaded image"
              className={`aspect-square w-12 h-12 rounded-md object-cover`}
              src={row.original.images[0] || placeholder}
            />
            <span className="max-w-[500px] truncate font-medium">
              {row.getValue("productName")}
            </span>
          </Link>
        </div>
      );
    },
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "availability",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Status" />
    ),
    cell: ({ row }) => (
      <Badge variant="outline">
        {capitalizeFirstLetter(row.original.availability)}
      </Badge>
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "sku",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="SKU" />
    ),
    cell: ({ row }) => <div className="w-[80px]">{row.getValue("sku")}</div>,
    enableSorting: false,
    enableHiding: false,
  },
  {
    id: "actions",
    cell: ({ row }) => <DataTableRowActions row={row} />,
  },
];
