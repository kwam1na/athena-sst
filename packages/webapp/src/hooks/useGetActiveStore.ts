import { getAllStores } from "@/api/stores";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "@tanstack/react-router";
import useGetActiveOrganization from "./useGetActiveOrganization";

export default function useGetActiveStore() {
  const { activeOrganization } = useGetActiveOrganization();

  const { data: stores, isLoading: isLoadingStores } = useQuery({
    queryKey: ["stores"],
    queryFn: () => getAllStores(activeOrganization!.id),
    enabled: Boolean(activeOrganization),
  });

  const { storeName } = useParams({ strict: false });

  const activeStore = stores?.find((store) => store.storeUrlSlug == storeName);

  return {
    activeStore,
    isLoadingStores,
  };
}