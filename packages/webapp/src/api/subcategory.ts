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

  const res = await response.json();

  if (!response.ok) {
    throw new Error(res.error || "Error loading subcategories.");
  }

  return res.subcategories;
}

export async function getSubategory({
  organizationId,
  storeId,
  subcategoryId,
}: GetParams): Promise<SubcategoryResponse> {
  const response = await fetch(
    `${getBaseUrl(organizationId, storeId)}/${subcategoryId}`
  );

  const res = await response.json();

  if (!response.ok) {
    throw new Error(res.error || "Error loading subcategory.");
  }

  return res;
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

  const res = await response.json();

  if (!response.ok) {
    throw new Error(res.error || "Error creating subcategory.");
  }

  return res;
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

  const res = await response.json();

  if (!response.ok) {
    throw new Error(res.error || "Error updating subcategory.");
  }

  return res;
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

  const res = await response.json();

  if (!response.ok) {
    throw new Error(res.error || "Error deleting subcategory.");
  }

  return res;
}
