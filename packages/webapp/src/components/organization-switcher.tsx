import {
  Building,
  Check,
  ChevronsUpDown,
  PlusCircle,
  Store,
} from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Icons } from "./ui/icons";
import { useStoreModal } from "@/hooks/use-store-modal";
import { OverlayModal } from "./ui/modals/overlay-modal";
import { useStoreCurrency } from "./providers/currency-provider";
import { StoreResponse } from "@/lib/schemas/store";
import { useUserContext } from "@/contexts/UserContext";
import { OrganizationResponse } from "@/lib/schemas/organization";
import { Link, useNavigate, useParams } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { getAllStores } from "@/api/stores";
import { useEffect, useState } from "react";

type PopoverTriggerProps = React.ComponentPropsWithoutRef<
  typeof PopoverTrigger
>;

interface OrganizationSwitcherProps extends PopoverTriggerProps {
  items: OrganizationResponse[];
}

type OrganizationSelectItem = {
  value: string;
  label: string;
  url: string;
};

export default function OrganizationSwitcher({
  className,
  items = [],
}: OrganizationSwitcherProps) {
  const storeModal = useStoreModal();
  const { setStoreCurrency } = useStoreCurrency();

  const [isSwitching, setIsSwitching] = useState(false);
  const [selectedOrganization, setSelectedOrganization] =
    useState<OrganizationSelectItem | null>(null);
  const [open, setOpen] = useState(false);

  const { orgName } = useParams({ strict: false });

  const { data: stores } = useQuery({
    queryKey: ["stores"],
    queryFn: () => getAllStores(selectedOrganization!.value),
    enabled: Boolean(selectedOrganization),
  });

  const formattedItems = items.map((item) => ({
    label: item.organizationName,
    value: item.id,
    url: item.organizationUrlSlug,
  }));

  const orgMatchedFromParams = items.find(
    (org) => org.organizationUrlSlug == orgName
  );

  const currentOrganization = formattedItems.find(
    (item) => item.value === orgMatchedFromParams?.id
  );

  const navigate = useNavigate();

  useEffect(() => {
    if (selectedOrganization && stores) {
      const store = stores[0];

      if (store) {
        navigate({
          to: "/organization/$orgName/store/$storeName",
          params: (prev) => ({
            ...prev,
            orgName: selectedOrganization.url,
            storeName: store.storeUrlSlug,
          }),
        });

        setStoreCurrency(store.currency);
      } else {
        navigate({
          to: "/organization/$orgName/store",
          params: (prev) => ({
            ...prev,
            orgName: selectedOrganization.url,
          }),
        });
      }
    }
  }, [selectedOrganization, stores]);

  const onOrganizationSelect = async (organization: OrganizationSelectItem) => {
    setSelectedOrganization(organization);
    setOpen(false);
  };

  return (
    <>
      <OverlayModal
        isOpen={isSwitching}
        title={""}
        description={""}
        onClose={() => console.log("nay")}
        withoutHeader={true}
      >
        <div className="flex justify-center items-center">
          <Icons.spinner className="mr-2 h-4 w-4 text-muted-foreground animate-spin" />
          <p className="text-sm text-center text-muted-foreground">
            Switching organizations..
          </p>
        </div>
      </OverlayModal>
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            size="sm"
            role="combobox"
            aria-expanded={open}
            aria-label="Select an organization"
            className={cn("justify-between", className)}
          >
            <Building className="mr-2 h-4 w-4" />
            {currentOrganization?.label}
            <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-[250px] p-0">
          <Command>
            <CommandList>
              <CommandInput placeholder="Search organization..." />
              <CommandEmpty>No organization found.</CommandEmpty>
              <CommandGroup heading="Organizations">
                {formattedItems.map((organization) => (
                  <CommandItem
                    key={organization.value}
                    onSelect={() => onOrganizationSelect(organization)}
                    className="text-sm"
                  >
                    <Building className="mr-2 h-4 w-4" />
                    {organization.label}
                    <Check
                      className={cn(
                        "ml-auto h-4 w-4",
                        currentOrganization?.value === organization.value
                          ? "opacity-100"
                          : "opacity-0"
                      )}
                    />
                  </CommandItem>
                ))}
              </CommandGroup>
            </CommandList>
            <CommandSeparator />
            <CommandList>
              <CommandGroup>
                <CommandItem
                  onSelect={() => {
                    setOpen(false);
                    storeModal.onOpen();
                  }}
                >
                  <PlusCircle className="mr-2 h-4 w-4" />
                  Create organization
                </CommandItem>
              </CommandGroup>
            </CommandList>
          </Command>
        </PopoverContent>
      </Popover>
    </>
  );
}
