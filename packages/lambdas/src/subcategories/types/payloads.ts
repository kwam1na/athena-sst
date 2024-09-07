export type CreateSubategoryPayload = {
  subcategoryName: string;
  categoryId: string;
  storeId: string;
};

export type UpdateSubategoryPayload = Partial<CreateSubategoryPayload>;
