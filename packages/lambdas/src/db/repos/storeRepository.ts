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
import { Util } from "@athena/core/util";
import { StoreType } from "../../schemas/store";

export module StoreRepository {
  export async function create(data: StoreType) {
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

  export async function get(organizationId: string, id: string) {
    return await StoreEntity.build(GetItemCommand)
      .key({ id, organizationId })
      .send();
  }

  export async function update(
    organizationId: string,
    id: string,
    data: Partial<StoreType>
  ) {
    const updateData = {
      id,
      organizationId,
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

  export async function remove(organizationId: string, id: string) {
    return await StoreEntity.build(DeleteItemCommand)
      .key({ id, organizationId })
      .send();
  }

  export async function list(organizationId: string) {
    const { Items } = await InventoryTable.build(QueryCommand)
      .query({
        partition: organizationId,
      })
      .entities(StoreEntity)
      .send();

    return Items;
  }
}
