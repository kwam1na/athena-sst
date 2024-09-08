import ImageUploader from "../ui/image-uploader";
import View from "../View";

export default function ProductImagesView() {
  return (
    <View
      className="h-auto"
      header={<p className="text-sm text-sm text-muted-foreground">Images</p>}
    >
      <ImageUploader />
    </View>
  );
}
