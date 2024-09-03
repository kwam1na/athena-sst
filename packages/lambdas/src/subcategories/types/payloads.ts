export type CreateSubategoryPayload = {
  name: string;
  categoryId: string;
  storeId: string;
};

export type UpdateSubategoryPayload = Partial<CreateSubategoryPayload>;
