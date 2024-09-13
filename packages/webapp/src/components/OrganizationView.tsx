import { getAllOrganizations } from "@/api/organization";
import View from "./View";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "@tanstack/react-router";
import NotFound from "./states/not-found/NotFound";
import SingleLineError from "./states/error/SingleLineError";

export default function OrganizationView() {
  const Navigation = () => {
    return (
      <div className="flex gap-2 h-[40px]">
        <div className="flex items-center"></div>
      </div>
    );
  };

  // const navigate = useNavigate();

  const {
    data: organizations,
    isLoading,
    error: fetchOrganizationsError,
  } = useQuery({
    queryKey: ["organizations"],
    queryFn: getAllOrganizations,
  });

  const { orgUrlSlug } = useParams({ strict: false });

  const isValidOrganizationName =
    organizations &&
    organizations.some(
      (organization) => organization.organizationUrlSlug == orgUrlSlug
    );

  // console.log(data);

  // useEffect(() => {
  //   if (data) {
  //     const organization = data[0];

  //     navigate({
  //       to: "/organization/$orgUrlSlug",
  //       params: (prev) => ({ ...prev, orgName: organization.organizationUrl }),
  //     });
  //   }
  // }, [data]);

  return (
    <View className="bg-background" header={<Navigation />}>
      {!isValidOrganizationName &&
        orgUrlSlug &&
        !isLoading &&
        !fetchOrganizationsError && (
          <NotFound entity="organization" entityName={orgUrlSlug} />
        )}
      {fetchOrganizationsError && (
        <SingleLineError message={fetchOrganizationsError.message} />
      )}
    </View>
  );
}
