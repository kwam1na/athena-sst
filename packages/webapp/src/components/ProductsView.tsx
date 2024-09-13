import { useQuery } from "@tanstack/react-query";
import Products from "./Products";
import View from "./View";
import { getAllStores } from "@/api/stores";
import { useParams } from "@tanstack/react-router";
import NotFound from "./states/not-found/NotFound";
import useGetActiveOrganization from "@/hooks/useGetActiveOrganization";
import SingleLineError from "./states/error/SingleLineError";

export default function ProductsView() {
  const Navigation = () => {
    return (
      <div className="flex gap-2 h-[40px]">
        <div className="flex items-center"></div>
      </div>
    );
  };

  const { storeUrlSlug, orgUrlSlug } = useParams({ strict: false });

  const { activeOrganization, fetchOrganizationError, isLoadingOrganizations } =
    useGetActiveOrganization();

  const {
    data: stores,
    isLoading: isLoadingStores,
    error: fetchStoreError,
  } = useQuery({
    queryKey: ["stores", activeOrganization?.id],
    queryFn: () => getAllStores(activeOrganization!.id),
    enabled: Boolean(activeOrganization),
  });

  const isValidStoreName =
    stores && stores.some((store) => store.storeUrlSlug == storeUrlSlug);

  const isValidOrgName = activeOrganization?.organizationUrlSlug == orgUrlSlug;

  const isLoading = isLoadingOrganizations || isLoadingStores;

  const error = fetchOrganizationError || fetchStoreError;

  const isInvalidStoreName =
    !isValidStoreName && storeUrlSlug && !isLoading && !error;

  const isInvalidOrgName =
    !isValidOrgName && orgUrlSlug && !isLoading && !error;

  const store = stores && stores.find((s) => s.storeUrlSlug == storeUrlSlug);

  return (
    <View className="bg-background" header={<Navigation />}>
      {isValidStoreName && isValidOrgName && store && (
        <Products store={store} />
      )}
      {error && <SingleLineError message={error.message} />}
      {isInvalidOrgName ? (
        <NotFound entity="organization" entityName={orgUrlSlug} />
      ) : (
        isInvalidStoreName && (
          <NotFound entity="store" entityName={storeUrlSlug} />
        )
      )}
    </View>
  );
}
