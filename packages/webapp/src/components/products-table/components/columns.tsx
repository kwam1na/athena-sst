import { ColumnDef } from "@tanstack/react-table";

import { Badge } from "../../ui/badge";

// import { labels, priorities, statuses } from "./data/data";
import { Product } from "./data/schema";
import { DataTableColumnHeader } from "./data-table-column-header";
import { DataTableRowActions } from "./data-table-row-actions";
import { capitalizeFirstLetter } from "@/lib/utils";
import { Link } from "@tanstack/react-router";

export const columns: ColumnDef<Product>[] = [
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
    accessorKey: "productName",
    header: ({ column }) => <DataTableColumnHeader column={column} title="" />,
    cell: ({ row }) => {
      return (
        <div className="flex space-x-2">
          <Link
            to="/products/$productId"
            params={(prev) => ({ ...prev, productId: row.original.id })}
          >
            <span className="max-w-[500px] truncate font-medium">
              {row.getValue("productName")}
            </span>
          </Link>
          <Badge variant="outline">
            {capitalizeFirstLetter(row.original.availability)}
          </Badge>
        </div>
      );
    },
    enableSorting: false,
    enableHiding: false,
  },
  {
    id: "actions",
    cell: ({ row }) => <DataTableRowActions row={row} />,
  },
];
