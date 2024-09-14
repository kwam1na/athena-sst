import {
  BatchDeleteRequest,
  BatchWriteCommand,
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
import { execute } from "dynamodb-toolbox/table/actions/batchWrite";

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

  export async function removeAllSkuCountersByStoreId(
    storeId: string
  ): Promise<void> {
    const batchSize = 25; // DynamoDB allows up to 25 items per batch write operation
    let lastEvaluatedKey: any = undefined;

    do {
      const result = await list(storeId, 1000, lastEvaluatedKey);
      const items = result.Items;
      lastEvaluatedKey = result.LastEvaluatedKey;

      if (!items) return;

      // Process items in batches
      for (let i = 0; i < items.length; i += batchSize) {
        const batch = items.slice(i, i + batchSize);
        const deleteRequests = batch.map((item) =>
          SkuCounterEntity.build(BatchDeleteRequest).key({ id: item.id })
        );

        const batchDeleteCmd = InventoryTable.build(BatchWriteCommand).requests(
          ...deleteRequests
        );

        await execute(batchDeleteCmd);
      }
    } while (lastEvaluatedKey);
  }

  export async function list(
    storeId: string,
    limit?: number,
    exclusiveStartKey?: any
  ) {
    const query: Query<typeof InventoryTable> = {
      index: "byStoreId",
      partition: storeId,
    };

    const queryBuilder = InventoryTable.build(QueryCommand)
      .query(query)
      .entities(SkuCounterEntity);

    if (limit) {
      queryBuilder.options({ limit });
    }

    if (exclusiveStartKey) {
      queryBuilder.options({ exclusiveStartKey });
    }

    const result = await queryBuilder.send();

    return {
      Items: result.Items,
      LastEvaluatedKey: result.LastEvaluatedKey,
    };
  }
}
