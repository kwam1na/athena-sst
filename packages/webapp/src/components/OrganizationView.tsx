import { getAllOrganizations } from "@/api/organization";
import View from "./View";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "@tanstack/react-router";
import NotFound from "./states/not-found/NotFound";

export default function OrganizationView() {
  const Navigation = () => {
    return (
      <div className="flex gap-2 h-[40px]">
        <div className="flex items-center"></div>
      </div>
    );
  };

  // const navigate = useNavigate();

  const { data: organizations, isLoading } = useQuery({
    queryKey: ["organizations"],
    queryFn: getAllOrganizations,
  });

  const { orgName } = useParams({ strict: false });

  const isValidOrganizationName =
    organizations &&
    organizations.some(
      (organization) => organization.organizationUrl == orgName
    );

  // console.log(data);

  // useEffect(() => {
  //   if (data) {
  //     const organization = data[0];

  //     navigate({
  //       to: "/organization/$orgName",
  //       params: (prev) => ({ ...prev, orgName: organization.organizationUrl }),
  //     });
  //   }
  // }, [data]);

  return (
    <View className="bg-background" header={<Navigation />}>
      {!isValidOrganizationName && orgName && !isLoading && (
        <NotFound entity="organization" entityName={orgName} />
      )}
    </View>
  );
}
