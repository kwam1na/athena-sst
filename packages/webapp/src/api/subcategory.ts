import config from "@/config";
import {
  SubcategoryResponse,
  SubcategoryType,
} from "@/lib/schemas/subcategory";

const baseUrl = `${config.apiGateway.URL}/subcategories`;

export async function getAllSubcategories(): Promise<SubcategoryResponse[]> {
  const response = await fetch(`${baseUrl}?storeId=1`);

  const data = await response.json();

  return data.subcategories;
}

export async function getSubategory(id: string): Promise<SubcategoryResponse> {
  const response = await fetch(`${baseUrl}/${id}`);

  return await response.json();
}

export async function createSubcategory(
  data: SubcategoryType
): Promise<SubcategoryResponse> {
  const response = await fetch(baseUrl, {
    method: "POST",
    body: JSON.stringify(data),
  });

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

  return await response.json();
}
