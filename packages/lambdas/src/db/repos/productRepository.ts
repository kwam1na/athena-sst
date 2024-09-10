import {
  $set,
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

  export async function list(storeId: string) {
    const query: Query<typeof InventoryTable> = {
      index: "byStoreId",
      partition: storeId,
    };

    const { Items } = await InventoryTable.build(QueryCommand)
      .query(query)
      .entities(ProductEntity)
      .send();

    return Items;
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
