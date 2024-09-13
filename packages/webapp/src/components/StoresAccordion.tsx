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

export function StoressAccordion() {
  const { activeOrganization } = useGetActiveOrganization();

  const { data: stores } = useQuery({
    queryKey: ["stores"],
    queryFn: () => getAllStores(activeOrganization!.id),
    enabled: Boolean(activeOrganization),
  });

  const { orgName } = useParams({ strict: false });

  if (!orgName) return null;

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
            <p className="text-sm text-muted-foreground">Your stores</p>
          </div>
        </AccordionTrigger>
        {stores?.map((store) => {
          return (
            <AccordionContent key={store.id}>
              <Link
                to={"/organization/$orgName/store/$storeName"}
                activeProps={{
                  className: "font-bold",
                }}
                params={{ orgName, storeName: store.storeUrlSlug }}
              >
                {store.storeName}
              </Link>
            </AccordionContent>
          );
        })}
      </AccordionItem>
    </Accordion>
  );
}
