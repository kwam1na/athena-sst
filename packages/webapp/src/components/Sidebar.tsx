import { Link } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { StoressAccordion } from "./StoresAccordion";
import { getAllOrganizations } from "@/api/organization";
import OrganizationSwitcher from "./organization-switcher";
import { StoreAccordion } from "./StoreAccordion";

const Header = () => {
  const { data, isLoading, isFetching, error } = useQuery({
    queryKey: ["organizations"],
    queryFn: getAllOrganizations,
  });

  return (
    <div className="flex items-center gap-4 border-b h-[56px] px-8">
      <Link href={"/"} className="flex items-center">
        <p className="font-medium">athena</p>
      </Link>
      <p className="text-muted-foreground">/</p>
      <OrganizationSwitcher items={data || []} />
    </div>
  );
};

const Sidebar = () => {
  return (
    <section className="bg-background min-w-[300px] flex-none space-y-4 h-full border border-1 rounded-md">
      <Header />

      <div className="flex flex-col space-y-4 px-4">
        {/* <Link
          to="/"
          activeProps={{
            className: "font-bold",
          }}
          activeOptions={{ exact: true }}
        >
          Products
        </Link> */}
        {/* <Link
          to={"/products"}
          activeProps={{
            className: "font-bold",
          }}
        >
          Products
        </Link> */}
        {/* <Link
          to={"/organization"}
          activeProps={{
            className: "font-bold",
          }}
        >
          Organizations
        </Link> */}
        <StoressAccordion />
        <StoreAccordion />
      </div>
    </section>
  );
};

export default Sidebar;
