import { z } from "zod";
import useGetActiveStore from "@/hooks/useGetActiveStore";
import { Separator } from "./ui/separator";
import View from "./View";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { Ban, CheckCircle2 } from "lucide-react";
import { deleteStore, getAllStores, updateStore } from "@/api/stores";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "./ui/form";
import { Input } from "./ui/input";
import { LoadingButton } from "./ui/loading-button";
import { StoreResponse } from "@/lib/schemas/store";
import { useEffect } from "react";
import { useNavigate } from "@tanstack/react-router";

const StoreSettings = () => {
  const { activeStore } = useGetActiveStore();

  if (!activeStore) return null;

  return (
    <main className="flex justify-center">
      <div className="flex flex-col w-[50%] gap-8">
        <div className="space-y-4">
          <div>
            <p className="text-xl font-medium">{activeStore.storeName}</p>
            <p className="text-muted-foreground">Manage your store settings</p>
          </div>
          <Separator />
        </div>

        <div className="space-y-8">
          <GeneralSettings store={activeStore} />
          <Separator />
        </div>

        <DeleteStore store={activeStore} />
      </div>
    </main>
  );
};

const GeneralSettings = ({ store }: { store: StoreResponse }) => {
  const queryClient = useQueryClient();

  const navigate = useNavigate();

  const FormSchema = z.object({
    storeName: z.string().min(1, {
      message: "Please provide a valid name.",
    }),
  });

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      storeName: store.storeName,
    },
  });

  useEffect(() => {
    form.reset({ storeName: store.storeName });
  }, [form, store]);

  const saveStoreChanges = async () => {
    const data = {
      storeName: form.getValues().storeName,
    };
    return await updateStore(store.id, data);
  };

  const mutation = useMutation({
    mutationFn: saveStoreChanges,
    onSuccess: (newStore) => {
      toast("Settings updated", {
        icon: <CheckCircle2 className="h-4 w-4" />,
        description: `Store name has been updated`,
      });
      queryClient.invalidateQueries({
        queryKey: ["stores", store.organizationId],
      });

      navigate({
        to: "/organization/$orgUrlSlug/settings/$storeUrlSlug",
        params: (prev) => ({
          ...prev,
          orgUrlSlug: prev.orgUrlSlug!,
          storeUrlSlug: newStore.storeUrlSlug,
        }),
      });
    },
    onError: () => {
      toast("Something went wrong", {
        icon: <Ban className="h-4 w-4" />,
      });
    },
  });

  function onSubmit() {
    mutation.mutate();
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="w-full space-y-4">
        <p className="font-medium">General</p>
        <div className="flex flex-col w-full">
          <div className="flex gap-4">
            <div className="min-w-[300px] ">
              <FormField
                control={form.control}
                name="storeName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-muted-foreground">
                      Store name
                    </FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div
              className={`h-full flex self-end transition-opacity duration-300 ${form.formState.isDirty ? "opacity-100" : "opacity-0 pointer-events-none"}`}
            >
              <LoadingButton isLoading={mutation.isPending} type="submit">
                Save
              </LoadingButton>
            </div>
          </div>
        </div>
      </form>
    </Form>
  );
};

const DeleteStore = ({ store }: { store: StoreResponse }) => {
  const queryClient = useQueryClient();

  const navigate = useNavigate();

  const { data: stores } = useQuery({
    queryKey: ["stores", store.organizationId],
    queryFn: () => getAllStores(store.organizationId),
  });

  const handleDeleteStore = async () => {
    return await deleteStore(store.id);
  };

  const deleteMutation = useMutation({
    mutationFn: handleDeleteStore,
    onSuccess: () => {
      toast("Store deleted", {
        icon: <CheckCircle2 className="h-4 w-4" />,
      });
      queryClient.invalidateQueries({
        queryKey: ["stores", store.organizationId],
      });

      navigate({
        to: "/organization/$orgUrlSlug/settings",
        params: (prev) => ({
          ...prev,
          orgUrlSlug: prev.orgUrlSlug!,
        }),
      });
    },
    onError: () => {
      toast("Something went wrong", {
        icon: <Ban className="h-4 w-4" />,
      });
    },
  });

  return (
    <div className="space-y-4">
      <div className="space-y-4">
        <p className="font-medium">Delete store</p>
        {stores && stores.length > 1 && (
          <p className="text-muted-foreground">This action cannot be undone.</p>
        )}
        {stores && stores.length == 1 && (
          <p className="text-muted-foreground">
            This is your organization's only store. It cannot be deleted.
          </p>
        )}
      </div>

      <LoadingButton
        variant={"destructive"}
        disabled={stores && stores.length == 1}
        isLoading={deleteMutation.isPending}
        onClick={() => deleteMutation.mutate()}
      >
        Delete store
      </LoadingButton>
    </div>
  );
};

export default function StoreSettingsView() {
  const Navigation = () => {
    return (
      <div className="flex gap-2 h-[40px]">
        <div className="flex items-center"></div>
      </div>
    );
  };

  return (
    <View
      hideHeaderBottomBorder
      className="bg-background"
      header={<Navigation />}
    >
      <StoreSettings />
    </View>
  );
}
