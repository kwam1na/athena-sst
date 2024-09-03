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
import { CreateCategoryPayload } from "../../categories/types/payloads";
import CategoryEntity from "../entities/categoryEntity";
import InventoryTable from "../tables/inventoryTable";

export module CategoryRepository {
  export async function create(data: CreateCategoryPayload) {
    const id = uuid.v1();

    const item: PutItemInput<typeof CategoryEntity> = {
      id,
      storeId: data?.storeId,
      createdByUserId: "1",
      categoryName: data?.name,
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
      ...(data?.name && { categoryName: data.name }),
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

  export async function list(storeId: string) {
    const query: Query<typeof InventoryTable> = {
      index: "byStoreId",
      partition: storeId,
    };

    const { Items } = await InventoryTable.build(QueryCommand)
      .query(query)
      .entities(CategoryEntity)
      .send();

    return Items;
  }
}
