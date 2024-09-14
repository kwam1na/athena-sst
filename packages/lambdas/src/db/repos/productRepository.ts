import {
  $set,
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
import { CreateProductPayload } from "../../products/types/payloads";
import { SkuCounterRepository } from "./skuCounterRepository";
import { Util } from "@athena/core/util";
import ProductEntity from "../entities/productEntity";
import InventoryTable from "../tables/inventoryTable";
import { execute } from "dynamodb-toolbox/table/actions/batchWrite";

export module ProductRepository {
  export async function create(data: CreateProductPayload) {
    const id = uuid.v1();

    const { sku, storeId, categoryId, subcategoryId } = data;

    let productSKU = sku;

    if (!sku && categoryId && subcategoryId) {
      let skuCounter = await SkuCounterRepository.get(
        storeId,
        categoryId,
        subcategoryId
      );

      if (!skuCounter) {
        skuCounter = await SkuCounterRepository.create({
          categoryId,
          storeId,
          subcategoryId,
          lastUsed: 0,
        });
      }

      productSKU = Util.generateSKU(
        categoryId,
        subcategoryId,
        skuCounter.lastUsed
      );

      await SkuCounterRepository.update(skuCounter.id, {
        lastUsed: skuCounter.lastUsed + 1,
      });
    }

    const item: PutItemInput<typeof ProductEntity> = {
      id,
      availability: data?.availability,
      categoryId: data?.categoryId,
      createdByUserId: "1",
      currency: data?.currency,
      inventoryCount: data?.inventoryCount,
      productName: data?.productName,
      price: data?.price,
      sku: productSKU,
      storeId: data?.storeId,
      subcategoryId: data?.subcategoryId,
      unitCost: data?.unitCost,
      images: data?.images,
    };

    await ProductEntity.build(PutItemCommand).item(item).send();

    return item;
  }

  export async function get(id: string) {
    return await ProductEntity.build(GetItemCommand).key({ id }).send();
  }

  export async function update(
    id: string,
    data: Partial<CreateProductPayload>
  ) {
    const updateData = {
      id,
      ...(data?.availability && { availability: data.availability }),
      ...(data?.categoryId && { categoryId: data.categoryId }),
      ...(data?.inventoryCount !== undefined && {
        inventoryCount: data.inventoryCount,
      }),
      ...(data?.productName && { productName: data.productName }),
      ...(data?.currency && { currency: data.currency }),
      ...(data?.price !== undefined && { price: data.price }),
      ...(data?.sku !== undefined && { sku: data.sku }),
      ...(data?.subcategoryId && { subcategoryId: data.subcategoryId }),
      ...(data?.unitCost !== undefined && { unitCost: data.unitCost }),
      ...(data?.images !== undefined && { images: $set(data.images) }),
    };

    return await ProductEntity.build(UpdateItemCommand)
      .item(updateData)
      .options({
        returnValues: "ALL_NEW",
      })
      .send();
  }

  export async function remove(id: string) {
    return await ProductEntity.build(DeleteItemCommand).key({ id }).send();
  }

  export async function removeAllProductsByStoreId(
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
          ProductEntity.build(BatchDeleteRequest).key({ id: item.id })
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
      .entities(ProductEntity);

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

  export async function find(storeId: string, filters: Record<string, any>) {
    const query: Query<typeof InventoryTable> = {
      index: "byStoreId",
      partition: storeId,
    };

    const { Items } = await InventoryTable.build(QueryCommand)
      .query(query)
      .entities(ProductEntity)
      .options({
        filters: {
          Product: {
            attr: "sku",
            eq: filters?.sku?.toUpperCase(),
          },
        },
      })
      .send();

    return Items?.[0];
  }
}
