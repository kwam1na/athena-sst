import {
  DeleteItemCommand,
  GetItemCommand,
  PutItemCommand,
  PutItemInput,
  Query,
  QueryCommand,
  UpdateItemCommand,
} from "dynamodb-toolbox";
import * as uuid from "uuid";
import SkuCounterEntity from "../entities/skuCounterEntity";
import InventoryTable from "../tables/inventoryTable";

export type CreateSkuPayload = {
  categoryId: string;
  subcategoryId: string;
  storeId: string;
  lastUsed: number;
};

export module SkuCounterRepository {
  export async function create(data: CreateSkuPayload) {
    const id = uuid.v1();

    const item: PutItemInput<typeof SkuCounterEntity> = {
      id,
      storeId: data?.storeId,
      categoryId: data?.categoryId,
      subcategoryId: data.subcategoryId,
      lastUsed: data.lastUsed,
    };

    await SkuCounterEntity.build(PutItemCommand).item(item).send();

    return { ...item, created: "", modified: "" };
  }

  export async function get(
    storeId: string,
    categoryId: string,
    subcategoryId: string
  ) {
    const query: Query<typeof InventoryTable> = {
      index: "byStoreId",
      partition: storeId,
    };

    const { Items } = await InventoryTable.build(QueryCommand)
      .query(query)
      .entities(SkuCounterEntity)
      .options({
        filters: {
          SkuCounter: {
            or: [
              { attr: "categoryId", eq: categoryId },
              { attr: "subcategoryId", eq: subcategoryId },
            ],
          },
        },
      })
      .send();

    return Items?.[0] || null;
  }

  export async function update(id: string, data: Partial<CreateSkuPayload>) {
    const updateData = {
      id,
      ...(data?.lastUsed && { lastUsed: data.lastUsed }),
    };
    return await SkuCounterEntity.build(UpdateItemCommand)
      .item(updateData)
      .options({
        returnValues: "ALL_NEW",
      })
      .send();
  }

  export async function remove(id: string) {
    return await SkuCounterEntity.build(DeleteItemCommand).key({ id }).send();
  }

  export async function list(storeId: string) {
    const query: Query<typeof InventoryTable> = {
      index: "byStoreId",
      partition: storeId,
    };

    const { Items } = await InventoryTable.build(QueryCommand)
      .query(query)
      .entities(SkuCounterEntity)
      .send();

    return Items;
  }
}
