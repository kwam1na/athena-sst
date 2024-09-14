import { getAllOrganizations } from "@/api/organization";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "@tanstack/react-router";

export default function useGetActiveOrganization() {
  const {
    data: organizations,
    isLoading: isLoadingOrganizations,
    isFetching,
    error: fetchOrganizationError,
  } = useQuery({
    queryKey: ["organizations"],
    queryFn: () => getAllOrganizations(),
  });

  const { orgUrlSlug } = useParams({ strict: false });

  const activeOrganization = organizations?.find(
    (org) => org.organizationUrlSlug == orgUrlSlug
  );

  return {
    activeOrganization,
    fetchOrganizationError,
    isLoadingOrganizations: isLoadingOrganizations || isFetching,
  };
}
