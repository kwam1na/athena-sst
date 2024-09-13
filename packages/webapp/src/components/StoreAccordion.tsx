import { getAllStores } from "@/api/stores";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import useGetActiveOrganization from "@/hooks/useGetActiveOrganization";
import { useQuery } from "@tanstack/react-query";
import { Link, useParams, useRouter } from "@tanstack/react-router";
import { Store } from "lucide-react";
import { Button } from "./ui/button";

export function StoreAccordion() {
  const { activeOrganization } = useGetActiveOrganization();

  const { data: stores } = useQuery({
    queryKey: ["stores", activeOrganization?.id],
    queryFn: () => getAllStores(activeOrganization!.id),
    enabled: Boolean(activeOrganization),
  });

  const { storeUrlSlug } = useParams({ strict: false });

  const matchedStore = stores?.find((s) => s.storeUrlSlug == storeUrlSlug);

  if (stores?.length == 0) return null;

  const router = useRouter();

  const currentPath = router.state.location.pathname;

  return (
    <Accordion
      type="single"
      collapsible
      className="w-full pl-4 pr-14"
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
            to={"/organization/$orgUrlSlug/store/$storeUrlSlug/products"}
            activeProps={{
              className: "font-bold",
            }}
            params={(prev) => ({
              orgUrlSlug: prev.orgUrlSlug!,
              storeUrlSlug: prev.storeUrlSlug!,
            })}
          >
            <Button
              className={`${currentPath.includes("Products".toLowerCase()) ? "font-bold" : ""}`}
              variant={"ghost"}
            >
              Products
            </Button>
          </Link>
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
}
