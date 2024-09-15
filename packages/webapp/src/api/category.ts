import config from "@/config";
import { CategoryResponse, CategoryType } from "@/lib/schemas/category";
import { OrganizationStoreEntityApiParams } from "./types";

type GetParams = OrganizationStoreEntityApiParams & {
  categoryId: string;
};

type CreateParams = OrganizationStoreEntityApiParams & {
  data: CategoryType;
};

type UpdateParams = GetParams & { data: Partial<CategoryType> };

const getBaseUrl = (organizationId: string, storeId: string) =>
  `${config.apiGateway.URL}/organizations/${organizationId}/stores/${storeId}/categories`;

export async function getAllCategories({
  organizationId,
  storeId,
}: OrganizationStoreEntityApiParams): Promise<CategoryResponse[]> {
  const response = await fetch(getBaseUrl(organizationId, storeId));

  const res = await response.json();

  if (!response.ok) {
    throw new Error(res.error || "Error loading categories.");
  }

  return res.categories;
}

export async function getCategory({
  organizationId,
  storeId,
  categoryId,
}: GetParams): Promise<CategoryResponse> {
  const response = await fetch(
    `${getBaseUrl(organizationId, storeId)}/${categoryId}`
  );

  const res = await response.json();

  if (!response.ok) {
    throw new Error(res.error || "Error loading category.");
  }

  return res;
}

export async function createCategory({
  data,
  organizationId,
  storeId,
}: CreateParams): Promise<CategoryResponse> {
  const response = await fetch(getBaseUrl(organizationId, storeId), {
    method: "POST",
    body: JSON.stringify({ ...data, categoryName: data.categoryName.trim() }),
  });

  const res = await response.json();

  if (!response.ok) {
    throw new Error(res.error || "Error creating category.");
  }

  return res;
}

export async function updateCategory({
  data,
  categoryId,
  organizationId,
  storeId,
}: UpdateParams): Promise<CategoryResponse> {
  const response = await fetch(
    `${getBaseUrl(organizationId, storeId)}/${categoryId}`,
    {
      method: "PUT",
      body: JSON.stringify({
        ...data,
        categoryName: data?.categoryName?.trim(),
      }),
    }
  );

  const res = await response.json();

  if (!response.ok) {
    throw new Error(res.error || "Error updating category.");
  }

  return res;
}

export async function deleteCategory({
  categoryId,
  organizationId,
  storeId,
}: GetParams) {
  const response = await fetch(
    `${getBaseUrl(organizationId, storeId)}/${categoryId}`,
    {
      method: "DELETE",
    }
  );

  const res = await response.json();

  if (!response.ok) {
    throw new Error(res.error || "Error deleting category.");
  }

  return res;
}
