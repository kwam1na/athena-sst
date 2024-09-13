import { useQuery } from "@tanstack/react-query";
import Products from "./Products";
import View from "./View";
import { getAllStores } from "@/api/stores";
import { useParams } from "@tanstack/react-router";
import NotFound from "./states/not-found/NotFound";
import useGetActiveOrganization from "@/hooks/useGetActiveOrganization";

export default function ProductsView() {
  const Navigation = () => {
    return (
      <div className="flex gap-2 h-[40px]">
        <div className="flex items-center"></div>
      </div>
    );
  };

  const { storeName, orgName } = useParams({ strict: false });

  const { activeOrganization, isLoadingOrganizations } =
    useGetActiveOrganization();

  const { data: stores, isLoading: isLoadingStores } = useQuery({
    queryKey: ["stores"],
    queryFn: () => getAllStores(activeOrganization!.id),
    enabled: Boolean(activeOrganization),
  });

  const isValidStoreName =
    stores && stores.some((store) => store.storeUrlSlug == storeName);

  const isValidOrgName = activeOrganization?.organizationUrlSlug == orgName;

  const isInvalidStoreName = !isValidStoreName && storeName && !isLoadingStores;

  const isInvalidOrgName =
    !isValidOrgName && orgName && !isLoadingOrganizations;

  const store = stores && stores.find((s) => s.storeUrlSlug == storeName);

  return (
    <View className="bg-background" header={<Navigation />}>
      {isValidStoreName && isValidOrgName && store && (
        <Products store={store} />
      )}
      {isInvalidOrgName ? (
        <NotFound entity="organization" entityName={orgName} />
      ) : (
        isInvalidStoreName && <NotFound entity="store" entityName={storeName} />
      )}
    </View>
  );
}
