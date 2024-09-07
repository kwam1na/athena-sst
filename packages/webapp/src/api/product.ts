import config from "@/config";
import { ProductResponse, ProductType } from "@/lib/schemas/product";

const baseUrl = `${config.apiGateway.URL}/products`;

export async function getAllProducts(): Promise<ProductResponse[]> {
  const response = await fetch(`${baseUrl}?storeId=1`);

  const data = await response.json();

  return data.products;
}

export async function getProduct(id: string): Promise<ProductResponse> {
  const response = await fetch(`${baseUrl}/${id}`);

  return await response.json();
}

export async function createProduct(
  data: ProductType
): Promise<ProductResponse> {
  const response = await fetch(baseUrl, {
    method: "POST",
    body: JSON.stringify(data),
  });

  return await response.json();
}

export async function updateProduct(
  id: string,
  data: Partial<ProductType>
): Promise<ProductResponse> {
  const response = await fetch(`${baseUrl}/${id}`, {
    method: "PUT",
    body: JSON.stringify(data),
  });

  return await response.json();
}

export async function deleteProduct(id: string) {
  const response = await fetch(`${baseUrl}/${id}`, {
    method: "DELETE",
  });

  return await response.json();
}
