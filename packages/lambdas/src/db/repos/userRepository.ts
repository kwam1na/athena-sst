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
import { UserType } from "../../schemas/user";

export module UserRepository {
  export async function create(data: UserType) {
    const id = uuid.v1();

    const item: PutItemInput<typeof UserEntity> = {
      id,
      organizationId: data.organizationId,
      activeStoreId: data.activeStoreId,
      email: data.email,
      firstName: data.firstName,
      lastName: data.lastName,
      role: data.role,
    };

    await UserEntity.build(PutItemCommand).item(item).send();

    return item;
  }

  export async function get(organizationId: string, id: string) {
    return await UserEntity.build(GetItemCommand)
      .key({ id, organizationId })
      .send();
  }

  export async function update(
    organizationId: string,
    id: string,
    data: Partial<UserType>
  ) {
    const updateData = {
      id,
      organizationId,
      ...(data.activeStoreId && { activeStoreId: data.activeStoreId }),
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

  export async function remove(organizationId: string, id: string) {
    return await UserEntity.build(DeleteItemCommand)
      .key({ id, organizationId })
      .send();
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
