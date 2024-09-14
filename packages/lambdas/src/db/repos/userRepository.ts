import {
  DeleteItemCommand,
  GetItemCommand,
  PutItemCommand,
  PutItemInput,
  QueryCommand,
  UpdateItemCommand,
} from "dynamodb-toolbox";
import * as uuid from "uuid";
import UserEntity from "../entities/userEntity";
import InventoryTable from "../tables/inventoryTable";

export interface CreateUserPayload {
  storeId: string;
  email?: string;
  firstName: string;
  lastName: string;
  role: string;
}

export module UserRepository {
  export async function create(data: CreateUserPayload) {
    const id = uuid.v1();

    const item: PutItemInput<typeof UserEntity> = {
      id,
      storeId: data.storeId,
      email: data.email,
      firstName: data.firstName,
      lastName: data.lastName,
      role: data.role,
    };

    await UserEntity.build(PutItemCommand).item(item).send();

    return item;
  }

  export async function get(id: string) {
    return await UserEntity.build(GetItemCommand).key({ id }).send();
  }

  export async function update(id: string, data: Partial<CreateUserPayload>) {
    const updateData = {
      id,
      ...(data.email && { email: data.email }),
      ...(data.firstName && { firstName: data.firstName }),
      ...(data.lastName && { lastName: data.lastName }),
      ...(data.role && { role: data.role }),
    };

    return await UserEntity.build(UpdateItemCommand)
      .item(updateData)
      .options({
        returnValues: "ALL_NEW",
      })
      .send();
  }

  export async function remove(id: string) {
    return await UserEntity.build(DeleteItemCommand).key({ id }).send();
  }

  export async function listByStore(storeId: string) {
    const { Items } = await InventoryTable.build(QueryCommand)
      .query({
        index: "byStoreId",
        partition: storeId,
      })
      .entities(UserEntity)
      .send();

    return Items;
  }
}
