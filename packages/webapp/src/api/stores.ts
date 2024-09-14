import config from "@/config";
import { StoreResponse, StoreType } from "@/lib/schemas/store";
import { deleteAllProducts } from "./product";
import { deleteDirectoryInS3 } from "@/lib/aws";

const baseUrl = `${config.apiGateway.URL}/stores`;

export async function getAllStores(
  organizationId: string
): Promise<StoreResponse[]> {
  const response = await fetch(`${baseUrl}?organizationId=${organizationId}`);

  if (!response.ok) {
    throw new Error("Error loading stores.");
  }

  const data = await response.json();

  return data.stores;
}

export async function getStore(id: string): Promise<StoreResponse> {
  const response = await fetch(`${baseUrl}/${id}`);

  if (!response.ok) {
    throw new Error("Error loading store.");
  }

  return await response.json();
}

export async function createStore(data: StoreType): Promise<StoreResponse> {
  const response = await fetch(baseUrl, {
    method: "POST",
    body: JSON.stringify(data),
  });

  const res = await response.json();

  if (!response.ok) {
    throw new Error(res.error || "Error creating store.");
  }

  return res;
}

export async function updateStore(
  id: string,
  data: Partial<StoreType>
): Promise<StoreResponse> {
  const response = await fetch(`${baseUrl}/${id}`, {
    method: "PUT",
    body: JSON.stringify(data),
  });

  const res = await response.json();

  if (!response.ok) {
    throw new Error(res.error || "Error updating store.");
  }

  return res;
}

export async function deleteStore(id: string) {
  // delete products for the store
  await deleteAllProducts(id);

  // delete images in s3
  const deleteImagesResponse = await deleteDirectoryInS3(config.s3.BUCKET, id);

  if (deleteImagesResponse.error) {
    throw new Error(
      (deleteImagesResponse.error as Error).message ||
        "Error deleting images for store."
    );
  }

  const response = await fetch(`${baseUrl}/${id}`, {
    method: "DELETE",
  });

  const res = await response.json();

  if (!response.ok) {
    throw new Error(res.error || "Error deleting store.");
  }

  return res;
}
