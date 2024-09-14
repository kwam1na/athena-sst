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
import { CreateCategoryPayload } from "../../categories/types/payloads";
import CategoryEntity from "../entities/categoryEntity";
import InventoryTable from "../tables/inventoryTable";
import { execute } from "dynamodb-toolbox/table/actions/batchWrite";

export module CategoryRepository {
  export async function create(data: CreateCategoryPayload) {
    const id = uuid.v1();

    const item: PutItemInput<typeof CategoryEntity> = {
      id,
      storeId: data?.storeId,
      createdByUserId: "1",
      categoryName: data?.categoryName,
    };

    await CategoryEntity.build(PutItemCommand).item(item).send();

    return item;
  }

  export async function get(id: string) {
    return await CategoryEntity.build(GetItemCommand).key({ id }).send();
  }

  export async function update(
    id: string,
    data: Partial<CreateCategoryPayload>
  ) {
    const updateData = {
      id,
      ...(data?.categoryName && { categoryName: data.categoryName }),
      ...(data?.storeId && { storeId: data.storeId }),
    };
    return await CategoryEntity.build(UpdateItemCommand)
      .item(updateData)
      .options({
        returnValues: "ALL_NEW",
      })
      .send();
  }

  export async function remove(id: string) {
    return await CategoryEntity.build(DeleteItemCommand).key({ id }).send();
  }

  export async function removeAllCategoriesByStoreId(
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
          CategoryEntity.build(BatchDeleteRequest).key({ id: item.id })
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
      .entities(CategoryEntity);

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
