import config from "@/config";
import { StoreResponse, StoreType } from "@/lib/schemas/store";

const baseUrl = `${config.apiGateway.URL}/stores`;

export async function getAllStores(
  organizationId: string
): Promise<StoreResponse[]> {
  const response = await fetch(`${baseUrl}?organizationId=${organizationId}`);

  if (!response.ok) {
    throw new Error("Error fetching stores.");
  }

  const data = await response.json();

  return data.stores;
}

export async function getStore(id: string): Promise<StoreResponse> {
  const response = await fetch(`${baseUrl}/${id}`);

  if (!response.ok) {
    throw new Error("Error fetching store.");
  }

  return await response.json();
}

export async function createStore(data: StoreType): Promise<StoreResponse> {
  const response = await fetch(baseUrl, {
    method: "POST",
    body: JSON.stringify(data),
  });

  const res = await response.json();

  if (!response.ok) {
    throw new Error(res.error || "Error creating store.");
  }

  return res;
}

export async function updateStore(
  id: string,
  data: Partial<StoreType>
): Promise<StoreResponse> {
  const response = await fetch(`${baseUrl}/${id}`, {
    method: "PUT",
    body: JSON.stringify(data),
  });

  const res = await response.json();

  if (!response.ok) {
    throw new Error(res.error || "Error updating store.");
  }

  return res;
}

export async function deleteStore(id: string) {
  const response = await fetch(`${baseUrl}/${id}`, {
    method: "DELETE",
  });

  const res = await response.json();

  if (!response.ok) {
    throw new Error(res.error || "Error deleting store.");
  }

  return res;
}