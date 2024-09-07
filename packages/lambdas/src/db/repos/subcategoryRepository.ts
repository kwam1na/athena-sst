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
import { CreateSubategoryPayload } from "../../subcategories/types/payloads";
import InventoryTable from "../tables/inventoryTable";
import SubcategoryEntity from "../entities/subcategoryEntity";

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

  export async function list(storeId: string) {
    const query: Query<typeof InventoryTable> = {
      index: "byStoreId",
      partition: storeId,
    };

    const { Items } = await InventoryTable.build(QueryCommand)
      .query(query)
      .entities(SubcategoryEntity)
      .send();

    return Items;
  }
}
