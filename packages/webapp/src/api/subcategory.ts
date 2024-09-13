import config from "@/config";
import {
  SubcategoryResponse,
  SubcategoryType,
} from "@/lib/schemas/subcategory";

const baseUrl = `${config.apiGateway.URL}/subcategories`;

export async function getAllSubcategories(
  storeId: string
): Promise<SubcategoryResponse[]> {
  const response = await fetch(`${baseUrl}?storeId=${storeId}`);

  if (!response.ok) {
    throw new Error("Error loading subcategories.");
  }

  const data = await response.json();

  return data.subcategories;
}

export async function getSubategory(id: string): Promise<SubcategoryResponse> {
  const response = await fetch(`${baseUrl}/${id}`);

  if (!response.ok) {
    throw new Error("Error loading subcategory.");
  }

  return await response.json();
}

export async function createSubcategory(
  data: SubcategoryType
): Promise<SubcategoryResponse> {
  const response = await fetch(baseUrl, {
    method: "POST",
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    throw new Error("Error creating subcategory.");
  }

  return await response.json();
}

export async function updateSubcategory(
  id: string,
  data: Partial<SubcategoryType>
): Promise<SubcategoryResponse> {
  const response = await fetch(`${baseUrl}/${id}`, {
    method: "PUT",
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    throw new Error("Error updating subcategory.");
  }

  return await response.json();
}

export async function deleteSubategory(id: string) {
  const response = await fetch(`${baseUrl}/${id}`, {
    method: "DELETE",
  });

  if (!response.ok) {
    throw new Error("Error deleting subcategory.");
  }

  return await response.json();
}
