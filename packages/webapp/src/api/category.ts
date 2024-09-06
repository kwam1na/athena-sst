import config from "@/config";
import { CategoryResponse, CategoryType } from "@/lib/schemas/category";

const baseUrl = `${config.apiGateway.URL}/categories`;

export async function getAllCategories(): Promise<CategoryResponse[]> {
  const response = await fetch(`${baseUrl}?storeId=1`);

  const data = await response.json();

  return data.categories;
}

export async function getCategory(id: string): Promise<CategoryResponse> {
  const response = await fetch(`${baseUrl}/${id}`);

  return await response.json();
}

export async function createCategory(
  data: CategoryType
): Promise<CategoryResponse> {
  const response = await fetch(baseUrl, {
    method: "POST",
    body: JSON.stringify(data),
  });

  return await response.json();
}

export async function updateCategory(
  id: string,
  data: Partial<CategoryType>
): Promise<CategoryResponse> {
  const response = await fetch(`${baseUrl}/${id}`, {
    method: "PUT",
    body: JSON.stringify(data),
  });

  return await response.json();
}
