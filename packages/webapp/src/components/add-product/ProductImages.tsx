import { useProductContext } from "@/contexts/ProductContext";
import ImageUploader from "../ui/image-uploader";
import View from "../View";

export default function ProductImagesView() {
  const { images, updateImages } = useProductContext();

  return (
    <View
      className="h-auto"
      header={<p className="text-sm text-sm text-muted-foreground">Images</p>}
    >
      <ImageUploader images={images} updateImages={updateImages} />
    </View>
  );
}
