import { useProductContext } from "@/contexts/ProductContext";
import ImageUploader from "../ui/image-uploader";
import View from "../View";
import { Skeleton } from "../ui/skeleton";

export default function ProductImagesView() {
  const { images, isLoading, updateImages } = useProductContext();

  return (
    <View
      className="h-auto"
      header={<p className="text-sm text-sm text-muted-foreground">Images</p>}
    >
      {!isLoading && (
        <ImageUploader images={images} updateImages={updateImages} />
      )}
      {isLoading && (
        <div className="flex gap-2 p-4">
          <Skeleton className="w-[50%] h-[280px]" />
          <Skeleton className="w-[50%] h-[280px]" />
        </div>
      )}
    </View>
  );
}
