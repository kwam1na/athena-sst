import config from "@/config";
import { ProductResponse, ProductType } from "@/lib/schemas/product";

const baseUrl = `${config.apiGateway.URL}/products`;

export async function getAllProducts(): Promise<ProductResponse[]> {
  const response = await fetch(`${baseUrl}?storeId=1`);

  if (!response.ok) {
    throw new Error("Error fetching products.");
  }

  const data = await response.json();

  return data.products;
}

export async function getProduct(id: string): Promise<ProductResponse> {
  const response = await fetch(`${baseUrl}/${id}`);

  if (!response.ok) {
    throw new Error("Error fetching product.");
  }

  return await response.json();
}

export async function createProduct(
  data: ProductType
): Promise<ProductResponse> {
  const response = await fetch(baseUrl, {
    method: "POST",
    body: JSON.stringify(data),
  });

  const res = await response.json();

  if (!response.ok) {
    throw new Error(res.error || "Error creating product.");
  }

  return res;
}

export async function updateProduct(
  id: string,
  data: Partial<ProductType>
): Promise<ProductResponse> {
  const response = await fetch(`${baseUrl}/${id}`, {
    method: "PUT",
    body: JSON.stringify(data),
  });

  const res = await response.json();

  if (!response.ok) {
    throw new Error(res.error || "Error updating product.");
  }

  return res;
}

export async function deleteProduct(id: string) {
  const response = await fetch(`${baseUrl}/${id}`, {
    method: "DELETE",
  });

  const res = await response.json();

  if (!response.ok) {
    throw new Error(res.error || "Error deleting product.");
  }

  return res;
}
