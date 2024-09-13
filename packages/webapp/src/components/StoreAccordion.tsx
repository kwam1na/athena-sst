import { getAllStores } from "@/api/stores";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import useGetActiveOrganization from "@/hooks/useGetActiveOrganization";
import { useQuery } from "@tanstack/react-query";
import { Link, useParams } from "@tanstack/react-router";
import { Store } from "lucide-react";

export function StoreAccordion() {
  const { activeOrganization } = useGetActiveOrganization();

  const { data: stores } = useQuery({
    queryKey: ["stores"],
    queryFn: () => getAllStores(activeOrganization!.id),
    enabled: Boolean(activeOrganization),
  });

  const { storeName, orgName } = useParams({ strict: false });

  const matchedStore = stores?.find((s) => s.storeUrlSlug == storeName);

  const isValidStoreName =
    stores && stores.some((store) => store.storeUrlSlug == storeName);

  if (!storeName || !orgName || !isValidStoreName) return null;

  return (
    <Accordion
      type="single"
      collapsible
      className="w-full px-4"
      defaultValue="item-1"
    >
      <AccordionItem value="item-1" className="border-none">
        <AccordionTrigger>
          <div className="flex items-center">
            <Store className="w-4 h-4 text-muted-foreground mr-2" />
            <p className="text-sm text-muted-foreground">
              {matchedStore?.storeName}
            </p>
          </div>
        </AccordionTrigger>
        <AccordionContent>
          <Link
            to={"/organization/$orgName/store/$storeName"}
            activeProps={{
              className: "font-bold",
            }}
            params={{ orgName, storeName }}
          >
            Products
          </Link>
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
}
