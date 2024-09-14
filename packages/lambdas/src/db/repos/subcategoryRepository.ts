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
import { CreateSubategoryPayload } from "../../subcategories/types/payloads";
import InventoryTable from "../tables/inventoryTable";
import SubcategoryEntity from "../entities/subcategoryEntity";
import { execute } from "dynamodb-toolbox/table/actions/batchWrite";

export module SubcategoryRepository {
  export async function create(data: CreateSubategoryPayload) {
    const id = uuid.v1();

    const item: PutItemInput<typeof SubcategoryEntity> = {
      id,
      storeId: data?.storeId,
      createdByUserId: "1",
      subcategoryName: data?.subcategoryName,
      categoryId: data.categoryId,
    };

    await SubcategoryEntity.build(PutItemCommand).item(item).send();

    return item;
  }

  export async function get(id: string) {
    return await SubcategoryEntity.build(GetItemCommand).key({ id }).send();
  }

  export async function update(
    id: string,
    data: Partial<CreateSubategoryPayload>
  ) {
    const updateData = {
      id,
      ...(data?.subcategoryName && { subcategoryName: data.subcategoryName }),
      ...(data?.categoryId && { categoryId: data.categoryId }),
      ...(data?.storeId && { storeId: data.storeId }),
    };
    return await SubcategoryEntity.build(UpdateItemCommand)
      .item(updateData)
      .options({
        returnValues: "ALL_NEW",
      })
      .send();
  }

  export async function remove(id: string) {
    return await SubcategoryEntity.build(DeleteItemCommand).key({ id }).send();
  }

  export async function removeAllSubcategoriesByStoreId(
    storeId: string,
    filters?: Record<string, any>
  ): Promise<void> {
    const batchSize = 25; // DynamoDB allows up to 25 items per batch write operation
    let lastEvaluatedKey: any = undefined;

    do {
      const result = await list(storeId, 1000, lastEvaluatedKey, filters);
      const items = result.Items;
      lastEvaluatedKey = result.LastEvaluatedKey;

      if (!items) return;

      // Process items in batches
      for (let i = 0; i < items.length; i += batchSize) {
        const batch = items.slice(i, i + batchSize);
        const deleteRequests = batch.map((item) =>
          SubcategoryEntity.build(BatchDeleteRequest).key({ id: item.id })
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
    exclusiveStartKey?: any,
    filters?: Record<string, any>
  ) {
    const query: Query<typeof InventoryTable> = {
      index: "byStoreId",
      partition: storeId,
    };

    let options = {};

    if (filters?.categoryId) {
      options = {
        filters: {
          Subcategory: {
            attr: "categoryId",
            eq: filters?.categoryId,
          },
        },
      };
    }

    if (limit) {
      options = { ...options, limit };
    }

    if (exclusiveStartKey) {
      options = { ...options, exclusiveStartKey };
    }

    const result = await InventoryTable.build(QueryCommand)
      .query(query)
      .entities(SubcategoryEntity)
      .options(options)
      .send();

    return {
      Items: result.Items,
      LastEvaluatedKey: result.LastEvaluatedKey,
    };
  }
}
