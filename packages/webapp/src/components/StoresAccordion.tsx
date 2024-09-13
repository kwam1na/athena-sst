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
import { Button } from "./ui/button";
import { useStoreModal } from "@/hooks/use-store-modal";
import { PlusIcon } from "@radix-ui/react-icons";
import { StoreActions } from "./StoreActions";

export function StoresAccordion() {
  const storeModal = useStoreModal();

  const { activeOrganization } = useGetActiveOrganization();

  const { storeUrlSlug } = useParams({ strict: false });

  const { data: stores } = useQuery({
    queryKey: ["stores", activeOrganization?.id],
    queryFn: () => getAllStores(activeOrganization!.id),
    enabled: Boolean(activeOrganization),
  });

  return (
    <Accordion
      type="single"
      collapsible
      className="w-full px-4"
      defaultValue="item-1"
    >
      <AccordionItem value="item-1" className="border-none">
        <div className="flex w-full gap-2 items-center justify-between">
          <div className="w-[85%]">
            <AccordionTrigger>
              <div className="flex items-center">
                <Store className="w-4 h-4 text-muted-foreground mr-2" />
                <p className="text-sm text-muted-foreground">Your stores</p>
              </div>
            </AccordionTrigger>
          </div>
          {stores && stores.length > 0 && (
            <div className="transition-opacity duration-300 opacity-50 hover:opacity-100">
              <StoreActions />
            </div>
          )}
        </div>
        {stores?.map((store) => {
          return (
            <AccordionContent
              key={store.id}
              className="w-full flex items-center"
            >
              <Link
                to={"/organization/$orgUrlSlug/store/$storeUrlSlug/products"}
                activeProps={{
                  className: "font-bold",
                }}
                params={(prev) => ({
                  ...prev,
                  orgUrlSlug: prev.orgUrlSlug!,
                  storeUrlSlug: store.storeUrlSlug,
                })}
              >
                <Button
                  className={`${store.storeUrlSlug == storeUrlSlug ? "font-bold" : ""}`}
                  variant={"ghost"}
                >
                  {store.storeName}
                </Button>
              </Link>
            </AccordionContent>
          );
        })}
        <AccordionContent>
          <Button variant={"ghost"} onClick={() => storeModal.onOpen()}>
            <PlusIcon className="w-4 h-4 mr-2" />
            Create store
          </Button>
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
}
