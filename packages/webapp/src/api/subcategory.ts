import config from "@/config";
import {
  SubcategoryResponse,
  SubcategoryType,
} from "@/lib/schemas/subcategory";
import { OrganizationStoreEntityApiParams } from "./types";

type GetParams = OrganizationStoreEntityApiParams & {
  subcategoryId: string;
};

type CreateParams = OrganizationStoreEntityApiParams & {
  data: SubcategoryType;
};

type UpdateParams = GetParams & { data: Partial<SubcategoryType> };

const getBaseUrl = (organizationId: string, storeId: string) =>
  `${config.apiGateway.URL}/organizations/${organizationId}/stores/${storeId}/subcategories`;

export async function getAllSubcategories({
  organizationId,
  storeId,
}: OrganizationStoreEntityApiParams): Promise<SubcategoryResponse[]> {
  const response = await fetch(getBaseUrl(organizationId, storeId));

  if (!response.ok) {
    throw new Error("Error loading subcategories.");
  }

  const data = await response.json();

  return data.subcategories;
}

export async function getSubategory({
  organizationId,
  storeId,
  subcategoryId,
}: GetParams): Promise<SubcategoryResponse> {
  const response = await fetch(
    `${getBaseUrl(organizationId, storeId)}/${subcategoryId}`
  );

  if (!response.ok) {
    throw new Error("Error loading subcategory.");
  }

  return await response.json();
}

export async function createSubcategory({
  data,
  organizationId,
  storeId,
}: CreateParams): Promise<SubcategoryResponse> {
  const response = await fetch(getBaseUrl(organizationId, storeId), {
    method: "POST",
    body: JSON.stringify({
      ...data,
      subcategoryName: data.subcategoryName.trim(),
    }),
  });

  if (!response.ok) {
    throw new Error("Error creating subcategory.");
  }

  return await response.json();
}

export async function updateSubcategory({
  data,
  organizationId,
  storeId,
  subcategoryId,
}: UpdateParams): Promise<SubcategoryResponse> {
  const response = await fetch(
    `${getBaseUrl(organizationId, storeId)}/${subcategoryId}`,
    {
      method: "PUT",
      body: JSON.stringify({
        ...data,
        subcategoryName: data.subcategoryName?.trim(),
      }),
    }
  );

  if (!response.ok) {
    throw new Error("Error updating subcategory.");
  }

  return await response.json();
}

export async function deleteSubategory({
  organizationId,
  storeId,
  subcategoryId,
}: GetParams) {
  const response = await fetch(
    `${getBaseUrl(organizationId, storeId)}/${subcategoryId}`,
    {
      method: "DELETE",
    }
  );

  if (!response.ok) {
    throw new Error("Error deleting subcategory.");
  }

  return await response.json();
}
