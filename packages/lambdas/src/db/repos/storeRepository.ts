import {
  DeleteItemCommand,
  GetItemCommand,
  PutItemCommand,
  PutItemInput,
  QueryCommand,
  UpdateItemCommand,
} from "dynamodb-toolbox";
import * as uuid from "uuid";
import StoreEntity from "../entities/storeEntity";
import InventoryTable from "../tables/inventoryTable";
import { CreateStorePayload } from "../../stores/types/payloads";
import { Util } from "@athena/core/util";

export module StoreRepository {
  export async function create(data: CreateStorePayload) {
    const id = uuid.v1();

    const item: PutItemInput<typeof StoreEntity> = {
      id,
      currency: data.currency,
      organizationId: data.organizationId,
      storeName: data.storeName,
      storeUrlSlug: Util.getUrlName(data.storeName),
      address: data.address,
      phoneNumber: data.phoneNumber,
      createdByUserId: data.createdByUserId,
    };

    await StoreEntity.build(PutItemCommand).item(item).send();

    return item;
  }

  export async function get(id: string) {
    return await StoreEntity.build(GetItemCommand).key({ id }).send();
  }

  export async function update(id: string, data: Partial<CreateStorePayload>) {
    const updateData = {
      id,
      ...(data.currency && { currency: data.currency }),
      ...(data.organizationId && { organizationId: data.organizationId }),
      ...(data.storeName && { storeName: data.storeName }),
      ...(data.storeName && { storeUrlSlug: Util.getUrlName(data.storeName) }),
      ...(data.address && { address: data.address }),
      ...(data.phoneNumber && { phoneNumber: data.phoneNumber }),
    };

    return await StoreEntity.build(UpdateItemCommand)
      .item(updateData)
      .options({
        returnValues: "ALL_NEW",
      })
      .send();
  }

  export async function remove(id: string) {
    return await StoreEntity.build(DeleteItemCommand).key({ id }).send();
  }

  export async function list(organizationId: string) {
    const { Items } = await InventoryTable.build(QueryCommand)
      .query({
        index: "byOrganizationId",
        partition: organizationId,
      })
      .entities(StoreEntity)
      .send();

    return Items;
  }
}
