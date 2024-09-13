import config from "@/config";
import {
  ProductResponse,
  ProductResponseBody,
  ProductType,
} from "@/lib/schemas/product";

const baseUrl = `${config.apiGateway.URL}/products`;

export async function getAllProducts(
  storeId: string
): Promise<ProductResponseBody[]> {
  const response = await fetch(`${baseUrl}?storeId=${storeId}`);

  if (!response.ok) {
    throw new Error("Error loading products.");
  }

  const data = await response.json();

  return data.products;
}

export async function getProduct(id: string): Promise<ProductResponseBody> {
  const response = await fetch(`${baseUrl}/${id}`);

  const res = await response.json();

  if (!response.ok) {
    throw new Error(res.error || "Error loading product.");
  }

  return res;
}

export async function createProduct(
  data: ProductType
): Promise<ProductResponseBody> {
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
