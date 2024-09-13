import { useQuery } from "@tanstack/react-query";
import View from "./View";
import { getAllOrganizations } from "@/api/organization";
import { useNavigate, useParams } from "@tanstack/react-router";
import { getAllStores } from "@/api/stores";
import { EmptyState } from "./states/empty/empty-state";
import { StoreIcon } from "lucide-react";
import { Button } from "./ui/button";
import { PlusIcon } from "@radix-ui/react-icons";
import { useStoreModal } from "@/hooks/use-store-modal";
import useGetActiveOrganization from "@/hooks/useGetActiveOrganization";
import { useEffect } from "react";

export default function StoreView() {
  const Navigation = () => {
    return (
      <div className="flex gap-2 h-[40px]">
        <div className="flex items-center"></div>
      </div>
    );
  };

  const storeModal = useStoreModal();

  const navigate = useNavigate();

  const { activeOrganization } = useGetActiveOrganization();

  const { data: stores } = useQuery({
    queryKey: ["stores", activeOrganization?.id],
    queryFn: () => getAllStores(activeOrganization!.id),
    enabled: Boolean(activeOrganization),
  });

  useEffect(() => {
    if (stores && stores.length > 0) {
      const store = stores[0];

      navigate({
        to: "/organization/$orgUrlSlug/store/$storeUrlSlug/products",
        params: (prev) => ({
          ...prev,
          orgUrlSlug: prev.orgUrlSlug!,
          storeUrlSlug: store.storeUrlSlug,
        }),
      });
    }
  }, [stores]);

  return (
    <View className="bg-background" header={<Navigation />}>
      {stores && stores.length == 0 && (
        <EmptyState
          icon={<StoreIcon className="w-16 h-16 text-muted-foreground" />}
          text={`No stores for ${activeOrganization?.organizationName}`}
          cta={
            <Button variant={"outline"} onClick={() => storeModal.onOpen()}>
              <PlusIcon className="w-4 h-4 mr-2" />
              Create store
            </Button>
          }
        />
      )}
    </View>
  );
}
