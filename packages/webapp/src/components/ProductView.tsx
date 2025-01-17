import { Link, useNavigate, useParams } from "@tanstack/react-router";
import Product from "./Product";
import View from "./View";
import { Button } from "./ui/button";
import {
  ArrowLeftIcon,
  CheckCircledIcon,
  TrashIcon,
} from "@radix-ui/react-icons";
import { productSchema } from "@/lib/schemas/product";
import { ProductProvider, useProductContext } from "../contexts/ProductContext";
import { ZodError } from "zod";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { Ban } from "lucide-react";
import {
  createProduct,
  deleteProduct,
  getProduct,
  updateProduct,
} from "@/api/product";
import { LoadingButton } from "./ui/loading-button";
import { useState } from "react";
import { deleteFiles, uploadProductImages } from "@/lib/imageUtils";
import { ErrorPage } from "./states/error";
import { AlertModal } from "./ui/modals/alert-modal";
import { ActionModal } from "./ui/modals/action-modal";
import useGetActiveStore from "@/hooks/useGetActiveStore";

function ProductViewContent() {
  const { didProvideRequiredData, images, productData, updateError } =
    useProductContext();

  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isActionModalOpen, setIsActionModalOpen] = useState(false);
  const [failedToUploadUrls, setFailedToUploadUrls] = useState<string[]>([]);
  const [isDeletingImages, setIsDeletingImages] = useState(false);

  const { productId } = useParams({ strict: false });

  const queryClient = useQueryClient();

  const navigate = useNavigate();

  const { activeStore } = useGetActiveStore();

  const { error, isLoading } = useQuery({
    queryKey: ["product", productId],
    queryFn: () =>
      getProduct({
        organizationId: activeStore!.organizationId,
        storeId: activeStore!.id,
        productId: productId!,
      }),
    enabled: Boolean(productId && activeStore),
  });

  const createMutation = useMutation({
    mutationFn: () => saveProduct(),
    onSuccess: () => {
      toast(`Product '${productData.productName}' created`, {
        icon: <CheckCircledIcon className="w-4 h-4" />,
      });
      queryClient.invalidateQueries({
        queryKey: ["products", activeStore?.id],
      });
      navigate({
        to: "/organization/$orgUrlSlug/store/$storeUrlSlug/products",
        params: (prev) => ({
          ...prev,
          storeUrlSlug: prev.storeUrlSlug!,
          orgUrlSlug: prev.orgUrlSlug!,
        }),
      });
    },
    onError: (e) => {
      if (e instanceof ZodError) return;
      toast("Something went wrong", {
        description: e.message,
        icon: <Ban className="w-4 h-4" />,
      });
    },
  });

  const updateMutation = useMutation({
    mutationFn: () => modifyProduct(),
    onSuccess: (data) => {
      toast(`Product '${productData.productName}' updated`, {
        description: <p className="text-destructive">{data?.warning}</p>,
        icon: <CheckCircledIcon className="w-4 h-4" />,
      });
      queryClient.invalidateQueries({
        queryKey: ["products", activeStore?.id],
      });
      queryClient.invalidateQueries({ queryKey: ["product", productId] });

      if (!data?.warning)
        navigate({
          to: "/organization/$orgUrlSlug/store/$storeUrlSlug/products",
          params: (prev) => ({
            ...prev,
            storeUrlSlug: prev.storeUrlSlug!,
            orgUrlSlug: prev.orgUrlSlug!,
          }),
        });
    },
    onError: (e) => {
      if (e instanceof ZodError) return;
      toast("Something went wrong", {
        description: e.message,
        icon: <Ban className="w-4 h-4" />,
      });
    },
  });

  const deleteItem = async () => {
    if (!productId || !activeStore) return;
    await deleteProduct({
      organizationId: activeStore.organizationId,
      storeId: activeStore.id,
      productId,
    });
  };

  const deleteMutation = useMutation({
    mutationFn: deleteItem,
    onSuccess: () => {
      toast(`Product '${productData.productName}' deleted`, {
        icon: <CheckCircledIcon className="w-4 h-4" />,
      });

      queryClient.invalidateQueries({
        queryKey: ["products", activeStore?.id],
      });
      navigate({
        to: "/organization/$orgUrlSlug/store/$storeUrlSlug/products",
        params: (prev) => ({
          ...prev,
          storeUrlSlug: prev.storeUrlSlug!,
          orgUrlSlug: prev.orgUrlSlug!,
        }),
      });
    },
    onError: (e) => {
      toast("Something went wrong", {
        description: e.message,
        icon: <Ban className="w-4 h-4" />,
      });
    },
  });

  const saveProduct = async () => {
    updateError(null);

    if (!activeStore) return;

    try {
      const data = productSchema.parse({
        ...productData,
        currency: activeStore.currency,
        storeId: activeStore.id,
        organizationId: activeStore.organizationId,
        images: [],
      });

      const product = await createProduct({
        data,
        organizationId: activeStore.organizationId,
        storeId: activeStore.id,
      });

      // TODO: handle case where initial creation succeeds but upload step fails

      const { imageUrls } = await uploadProductImages(
        images,
        activeStore!.id,
        product.id
      );

      return await updateProduct({
        data: { images: imageUrls },
        organizationId: activeStore.organizationId,
        storeId: activeStore.id,
        productId: product.id,
      });
    } catch (error) {
      // TODO: problematic
      updateError(error as ZodError);
      throw error;
    }
  };

  const modifyProduct = async () => {
    if (!productId || !activeStore) return;

    updateError(null);

    const { imageUrls, failedDeleteUrls } = await uploadProductImages(
      images,
      activeStore!.id,
      productId
    );

    if (failedDeleteUrls.length > 0) {
      setFailedToUploadUrls(failedDeleteUrls);
      setIsActionModalOpen(true);
      throw new Error("ahhhh");
    }

    try {
      const data = productSchema.parse({
        ...productData,
        currency: activeStore.currency,
        storeId: activeStore.id,
        images: imageUrls,
      });

      return await updateProduct({
        data,
        organizationId: activeStore.organizationId,
        storeId: activeStore.id,
        productId,
      });
    } catch (error) {
      updateError(error as ZodError);
      throw error;
    }
  };

  const onSubmit = () => {
    if (productId) updateMutation.mutate();
    else createMutation.mutate();
  };

  const retryDeletingImages = async () => {
    setIsDeletingImages(true);
    const res = await deleteFiles(failedToUploadUrls);
    setIsDeletingImages(false);

    if (res.failedDeleteKeys.length > 0) {
      setFailedToUploadUrls(res.failedDeleteUrls);
      setIsActionModalOpen(true);
      return;
    }
  };

  const isValid = didProvideRequiredData();

  const Navigation = () => {
    const header = productId ? "Edit Product" : "Add Product";

    return (
      <div className="flex gap-2 h-[40px] justify-between">
        <Link
          to="/organization/$orgUrlSlug/store/$storeUrlSlug/products"
          params={(prev) => ({
            ...prev,
            storeUrlSlug: prev.storeUrlSlug!,
            orgUrlSlug: prev.orgUrlSlug!,
          })}
          className="flex items-center gap-2"
        >
          <Button variant="ghost" className="h-8 px-2 lg:px-3 ">
            <ArrowLeftIcon className="h-4 w-4" />
          </Button>
          <p className="text-sm">{header}</p>
        </Link>

        <div className="flex space-x-2">
          {productId && !error && !isLoading && (
            <LoadingButton
              isLoading={deleteMutation.isPending}
              variant={"outline"}
              className="text-destructive"
              onClick={() => setIsDeleteModalOpen(true)}
            >
              <TrashIcon className="w-4 h-4" />
            </LoadingButton>
          )}
          <LoadingButton
            disabled={!isValid}
            isLoading={createMutation.isPending || updateMutation.isPending}
            onClick={onSubmit}
          >
            Save
          </LoadingButton>
        </div>
      </div>
    );
  };

  return (
    <View className="bg-background" header={<Navigation />}>
      <AlertModal
        title="Delete product?"
        isOpen={isDeleteModalOpen}
        loading={deleteMutation.isPending}
        onClose={() => {
          setIsDeleteModalOpen(false);
        }}
        onConfirm={() => {
          deleteMutation.mutate();
        }}
      />
      <ActionModal
        isOpen={isActionModalOpen}
        loading={isDeletingImages}
        title="Error deleting product images"
        description=""
        declineText="Cancel"
        confirmText="Try again"
        onConfirm={retryDeletingImages}
        onClose={() => setIsActionModalOpen(false)}
      >
        <div className="grid grid-cols-4 space-y-2">
          {failedToUploadUrls.map((key, index) => (
            <img
              key={index}
              alt="Uploaded image"
              className={`aspect-square w-full w-[64px] h-[64px] rounded-md object-cover`}
              src={key}
            />
          ))}
        </div>
      </ActionModal>
      {!error && <Product />}
      {error && <ErrorPage title={error.message} />}
    </View>
  );
}

export default function ProductView() {
  return (
    <ProductProvider>
      <ProductViewContent />
    </ProductProvider>
  );
}
