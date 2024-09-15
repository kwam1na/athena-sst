import config from "@/config";
import { deleteDirectoryInS3 } from "@/lib/aws";
import {
  ProductResponse,
  ProductResponseBody,
  ProductType,
} from "@/lib/schemas/product";
import { OrganizationStoreEntityApiParams } from "./types";

type GetParams = OrganizationStoreEntityApiParams & {
  productId: string;
};

type CreateParams = OrganizationStoreEntityApiParams & {
  data: ProductType;
};

type UpdateParams = GetParams & { data: Partial<ProductType> };

const getBaseUrl = (organizationId: string, storeId: string) =>
  `${config.apiGateway.URL}/organizations/${organizationId}/stores/${storeId}/products`;

export async function getAllProducts({
  organizationId,
  storeId,
}: OrganizationStoreEntityApiParams): Promise<ProductResponseBody[]> {
  const response = await fetch(getBaseUrl(organizationId, storeId));

  const res = await response.json();

  if (!response.ok) {
    throw new Error(res.error || "Error loading products.");
  }

  return res.products;
}

export async function getProduct({
  organizationId,
  storeId,
  productId,
}: GetParams): Promise<ProductResponseBody> {
  const response = await fetch(
    `${getBaseUrl(organizationId, storeId)}/${productId}`
  );

  const res = await response.json();

  if (!response.ok) {
    throw new Error(res.error || "Error loading product.");
  }

  return res;
}

export async function createProduct({
  data,
  organizationId,
  storeId,
}: CreateParams): Promise<ProductResponseBody> {
  const response = await fetch(getBaseUrl(organizationId, storeId), {
    method: "POST",
    body: JSON.stringify({ ...data, productName: data.productName.trim() }),
  });

  const res = await response.json();

  if (!response.ok) {
    throw new Error(res.error || "Error creating product.");
  }

  return res;
}

export async function updateProduct({
  data,
  organizationId,
  storeId,
  productId,
}: UpdateParams): Promise<ProductResponse> {
  const response = await fetch(
    `${getBaseUrl(organizationId, storeId)}/${productId}`,
    {
      method: "PUT",
      body: JSON.stringify({ ...data, productName: data.productName?.trim() }),
    }
  );

  const res = await response.json();

  if (!response.ok) {
    throw new Error(res.error || "Error updating product.");
  }

  return res;
}

export async function deleteProduct({
  organizationId,
  storeId,
  productId,
}: GetParams) {
  const response = await fetch(
    `${getBaseUrl(organizationId, storeId)}/${productId}`,
    {
      method: "DELETE",
    }
  );

  // delete images in s3
  const deleteImagesResponse = await deleteDirectoryInS3(
    `${storeId}/${productId}`
  );

  if (deleteImagesResponse.error) {
    throw new Error(
      (deleteImagesResponse.error as Error).message ||
        "Error deleting images for product."
    );
  }

  const res = await response.json();

  if (!response.ok) {
    throw new Error(res.error || "Error deleting product.");
  }

  return res;
}

export async function deleteAllProducts({
  organizationId,
  storeId,
}: OrganizationStoreEntityApiParams) {
  const response = await fetch(getBaseUrl(organizationId, storeId), {
    method: "DELETE",
  });

  const res = await response.json();

  if (!response.ok) {
    throw new Error(res.error || "Error deleting products.");
  }

  return res;
}
