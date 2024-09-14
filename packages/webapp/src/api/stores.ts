import config from "@/config";
import { StoreResponse, StoreType } from "@/lib/schemas/store";
import { deleteAllProducts } from "./product";
import { deleteDirectoryInS3 } from "@/lib/aws";
import { OrganizationStoreEntityApiParams } from "./types";

type UpdateParams = OrganizationStoreEntityApiParams & {
  data: Partial<StoreType>;
};

const getBaseUrl = (organizationId: string) =>
  `${config.apiGateway.URL}/organizations/${organizationId}/stores`;

export async function getAllStores(
  organizationId: string
): Promise<StoreResponse[]> {
  const response = await fetch(getBaseUrl(organizationId));

  if (!response.ok) {
    throw new Error("Error loading stores.");
  }

  const data = await response.json();

  return data.stores;
}

export async function getStore({
  organizationId,
  storeId,
}: OrganizationStoreEntityApiParams): Promise<StoreResponse> {
  const response = await fetch(`${getBaseUrl(organizationId)}/${storeId}`);

  if (!response.ok) {
    throw new Error("Error loading store.");
  }

  return await response.json();
}

export async function createStore(
  organizationId: string,
  data: StoreType
): Promise<StoreResponse> {
  const response = await fetch(getBaseUrl(organizationId), {
    method: "POST",
    body: JSON.stringify({ ...data, storeName: data.storeName.trim() }),
  });

  const res = await response.json();

  if (!response.ok) {
    throw new Error(res.error || "Error creating store.");
  }

  return res;
}

export async function updateStore({
  data,
  organizationId,
  storeId,
}: UpdateParams): Promise<StoreResponse> {
  const response = await fetch(`${getBaseUrl(organizationId)}/${storeId}`, {
    method: "PUT",
    body: JSON.stringify({ ...data, storeName: data.storeName?.trim() }),
  });

  const res = await response.json();

  if (!response.ok) {
    throw new Error(res.error || "Error updating store.");
  }

  return res;
}

export async function deleteStore({
  organizationId,
  storeId,
}: OrganizationStoreEntityApiParams) {
  // delete products for the store
  await deleteAllProducts({ organizationId, storeId });

  // delete images in s3
  const deleteImagesResponse = await deleteDirectoryInS3(storeId);

  if (deleteImagesResponse.error) {
    throw new Error(
      (deleteImagesResponse.error as Error).message ||
        "Error deleting images for store."
    );
  }

  const response = await fetch(`${getBaseUrl(organizationId)}/${storeId}`, {
    method: "DELETE",
  });

  const res = await response.json();

  if (!response.ok) {
    throw new Error(res.error || "Error deleting store.");
  }

  return res;
}
