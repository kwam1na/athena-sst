import { useQuery } from "@tanstack/react-query";
import View from "./View";
import { useNavigate, useParams } from "@tanstack/react-router";
import { getAllStores } from "@/api/stores";
import { EmptyState } from "./states/empty/empty-state";
import { StoreIcon } from "lucide-react";
import { Button } from "./ui/button";
import { PlusIcon } from "@radix-ui/react-icons";
import { useStoreModal } from "@/hooks/use-store-modal";
import useGetActiveOrganization from "@/hooks/useGetActiveOrganization";
import { useEffect } from "react";
import SingleLineError from "./states/error/SingleLineError";
import NotFound from "./states/not-found/NotFound";
import Spinner from "./ui/spinner";

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

  const { orgUrlSlug } = useParams({ strict: false });

  const { activeOrganization, fetchOrganizationError, isLoadingOrganizations } =
    useGetActiveOrganization();

  const {
    data: stores,
    error: fetchStoresError,
    isLoading: isLoadingStores,
  } = useQuery({
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

  const error = fetchStoresError || fetchOrganizationError;

  const isInvalidOrgName = !isLoadingOrganizations && !activeOrganization;

  const isLoading = isLoadingOrganizations || isLoadingStores;

  return (
    <View className="bg-background" header={<Navigation />}>
      {stores && stores.length == 0 && !error && (
        <EmptyState
          icon={<StoreIcon className="w-16 h-16 text-muted-foreground" />}
          text={
            <div className="flex gap-1 text-sm">
              <p className="text-muted-foreground">No stores for</p>
              <p className="font-medium">
                {activeOrganization?.organizationName}
              </p>
            </div>
          }
          cta={
            <Button variant={"outline"} onClick={() => storeModal.onOpen()}>
              <PlusIcon className="w-4 h-4 mr-2" />
              Create store
            </Button>
          }
        />
      )}
      {error && <SingleLineError message={error.message} />}
      {isInvalidOrgName && orgUrlSlug && (
        <NotFound entity="organization" entityName={orgUrlSlug} />
      )}
      {isLoading && <Spinner />}
    </View>
  );
}
