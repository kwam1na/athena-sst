import {
  Link,
  useNavigate,
  useParams,
  useRouterState,
} from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { StoresAccordion } from "./StoresAccordion";
import { getAllOrganizations } from "@/api/organization";
import OrganizationSwitcher from "./organization-switcher";
import { StoreAccordion } from "./StoreAccordion";
import { Button } from "./ui/button";
import { ChevronLeftIcon } from "@radix-ui/react-icons";
import { StoresSettingsAccordion } from "./StoresSettingsAccordion";

function SettingsHeader() {
  const navigate = useNavigate();
  const { storeUrlSlug } = useParams({ strict: false });

  const handleGoBack = () => {
    if (storeUrlSlug) {
      navigate({
        to: "/organization/$orgUrlSlug/store/$storeUrlSlug",
        params: (prev) => ({
          ...prev,
          orgUrlSlug: prev.orgUrlSlug!,
          storeUrlSlug,
        }),
      });
    } else {
      navigate({
        to: "/organization/$orgUrlSlug/store",
        params: (prev) => ({
          ...prev,
          orgUrlSlug: prev.orgUrlSlug!,
        }),
      });
    }
  };

  return (
    <div className="flex items-center gap-1 h-[56px] px-2">
      <Button
        variant="ghost"
        className="h-8 px-2 lg:px-3"
        onClick={handleGoBack}
      >
        <ChevronLeftIcon className="h-4 w-4" />
      </Button>
      <p className="text-sm">Settings</p>
    </div>
  );
}

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
  const router = useRouterState();

  const currentPath = router.location.pathname;

  const isOnSettings = currentPath.includes("settings");

  return (
    <section className="bg-background min-w-[300px] flex-none space-y-4 h-full border border-1 rounded-md">
      {!isOnSettings && <Header />}
      {isOnSettings && <SettingsHeader />}

      {!isOnSettings && (
        <div className="flex flex-col space-y-4 px-4">
          <StoresAccordion />
          <StoreAccordion />
        </div>
      )}

      {isOnSettings && (
        <div className="flex flex-col space-y-4 px-4">
          <StoresSettingsAccordion />
        </div>
      )}
    </section>
  );
};

export default Sidebar;
