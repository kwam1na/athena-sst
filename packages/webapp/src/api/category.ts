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

  if (!response.ok) {
    throw new Error("Error loading categories.");
  }

  const data = await response.json();

  return data.categories;
}

export async function getCategory({
  organizationId,
  storeId,
  categoryId,
}: GetParams): Promise<CategoryResponse> {
  const response = await fetch(
    `${getBaseUrl(organizationId, storeId)}/${categoryId}`
  );

  if (!response.ok) {
    throw new Error("Error loading category.");
  }

  return await response.json();
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

  if (!response.ok) {
    throw new Error("Error creating category.");
  }

  return await response.json();
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

  if (!response.ok) {
    throw new Error("Error updating category.");
  }

  return await response.json();
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

  if (!response.ok) {
    throw new Error("Error deleting category.");
  }

  return await response.json();
}
