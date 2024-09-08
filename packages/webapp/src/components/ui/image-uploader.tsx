import { Upload } from "lucide-react";
import { FileWithPath, useDropzone } from "react-dropzone";

import { AppContextMenu } from "./app-context-menu";
import { useProductContext } from "@/contexts/ProductContext";
import { TrashIcon } from "@radix-ui/react-icons";

export type ImageFile = {
  preview: string;
  file?: FileWithPath;
};

export default function ImageUploader() {
  const { images, updateImages } = useProductContext();

  const onDrop = (acceptedFiles: FileWithPath[]) => {
    const newImages: ImageFile[] = acceptedFiles.map((file) => ({
      preview: URL.createObjectURL(file),
      file: file,
    }));

    updateImages((prevImages) => [...prevImages, ...newImages]);
  };

  const { getRootProps, getInputProps } = useDropzone({ onDrop });

  const removeImage = (index: number) => {
    updateImages((prevImages) => prevImages.filter((_, i) => i !== index));
  };

  return (
    <div className="grid gap-2 p-4">
      <div className="grid grid-cols-2 gap-2">
        {images.map((image, index) => (
          <div key={index}>
            <AppContextMenu
              menuItems={[
                {
                  title: "Delete",
                  icon: <TrashIcon className="w-4 h-4" />,
                  action: () => removeImage(index),
                },
              ]}
            >
              <img
                alt="Uploaded image"
                className="aspect-square w-full rounded-md object-cover"
                height="200"
                src={image.preview}
                width="200"
              />
            </AppContextMenu>
          </div>
        ))}
        <div
          {...getRootProps()}
          className="flex aspect-square w-full items-center justify-center rounded-md border border-dashed"
        >
          <input {...getInputProps()} />
          <Upload className="h-4 w-4 text-muted-foreground" />
          <span className="sr-only">Upload</span>
        </div>
      </div>
    </div>
  );
}
