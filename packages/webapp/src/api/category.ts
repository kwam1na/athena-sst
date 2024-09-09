import config from "@/config";
import { CategoryResponse, CategoryType } from "@/lib/schemas/category";

const baseUrl = `${config.apiGateway.URL}/categories`;

export async function getAllCategories(): Promise<CategoryResponse[]> {
  const response = await fetch(`${baseUrl}?storeId=1`);

  if (!response.ok) {
    throw new Error("Error fetching categories.");
  }

  const data = await response.json();

  return data.categories;
}

export async function getCategory(id: string): Promise<CategoryResponse> {
  const response = await fetch(`${baseUrl}/${id}`);

  if (!response.ok) {
    throw new Error("Error fetching category.");
  }

  return await response.json();
}

export async function createCategory(
  data: CategoryType
): Promise<CategoryResponse> {
  const response = await fetch(baseUrl, {
    method: "POST",
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    throw new Error("Error creating category.");
  }

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

  if (!response.ok) {
    throw new Error("Error updating category.");
  }

  return await response.json();
}

export async function deleteCategory(id: string) {
  const response = await fetch(`${baseUrl}/${id}`, {
    method: "DELETE",
  });

  if (!response.ok) {
    throw new Error("Error deleting category.");
  }

  return await response.json();
}
