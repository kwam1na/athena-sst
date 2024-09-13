import { getAllOrganizations } from "@/api/organization";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "@tanstack/react-router";

export default function useGetActiveOrganization() {
  const { data: organizations, isLoading: isLoadingOrganizations } = useQuery({
    queryKey: ["organizations"],
    queryFn: () => getAllOrganizations(),
  });

  const { orgName } = useParams({ strict: false });

  const activeOrganization = organizations?.find(
    (org) => org.organizationUrlSlug == orgName
  );

  return {
    activeOrganization,
    isLoadingOrganizations,
  };
}
