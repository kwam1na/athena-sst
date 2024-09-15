import config from "@/config";
import {
  OrganizationResponse,
  OrganizationType,
} from "@/lib/schemas/organization";

const baseUrl = `${config.apiGateway.URL}/organizations`;

export async function getAllOrganizations(): Promise<OrganizationResponse[]> {
  const response = await fetch(
    `${config.apiGateway.URL}/users/me/organizations?userId=1`
  );

  const res = await response.json();

  if (!response.ok) {
    throw new Error(res.error || "Error loading organizations.");
  }

  return res.organizations;
}

export async function getOrganization(
  id: string
): Promise<OrganizationResponse> {
  const response = await fetch(`${baseUrl}/${id}`);

  const res = await response.json();

  if (!response.ok) {
    throw new Error(res.error || "Error loading organization.");
  }

  return res;
}

export async function createOrganization(
  data: OrganizationType
): Promise<OrganizationResponse> {
  const response = await fetch(baseUrl, {
    method: "POST",
    body: JSON.stringify({
      ...data,
      organizationName: data.organizationName.trim(),
    }),
  });

  const res = await response.json();

  if (!response.ok) {
    throw new Error(res.error || "Error creating organization.");
  }

  return res;
}

export async function updateOrganization(
  id: string,
  data: Partial<OrganizationType>
): Promise<OrganizationResponse> {
  const response = await fetch(`${baseUrl}/${id}`, {
    method: "PUT",
    body: JSON.stringify({
      ...data,
      organizationName: data?.organizationName?.trim(),
    }),
  });

  const res = await response.json();

  if (!response.ok) {
    throw new Error(res.error || "Error updating organization.");
  }

  return res;
}

export async function deleteOrganization(id: string) {
  const response = await fetch(`${baseUrl}/${id}`, {
    method: "DELETE",
  });

  const res = await response.json();

  if (!response.ok) {
    throw new Error(res.error || "Error deleting organization.");
  }

  return res;
}
