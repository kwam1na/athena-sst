import {
  DeleteItemCommand,
  GetItemCommand,
  PutItemCommand,
  PutItemInput,
  QueryCommand,
  UpdateItemCommand,
} from "dynamodb-toolbox";
import * as uuid from "uuid";
import InventoryTable from "../tables/inventoryTable";
import OrganizationEntity from "../entities/organizationEntity";
import { Util } from "@athena/core/util";
import { OrganizationType } from "../../schemas/organization";

export module OrganizationRepository {
  export async function create(data: OrganizationType) {
    const id = uuid.v1();

    const item: PutItemInput<typeof OrganizationEntity> = {
      id,
      _et: "Organization",
      organizationName: data.organizationName,
      organizationUrlSlug: Util.getUrlName(data.organizationName),
      createdByUserId: data.createdByUserId,
    };

    await OrganizationEntity.build(PutItemCommand).item(item).send();

    return item;
  }

  export async function get(id: string) {
    return await OrganizationEntity.build(GetItemCommand)
      .key({ id, _et: "Organization" })
      .send();
  }

  export async function update(id: string, data: Partial<OrganizationType>) {
    const updateData = {
      id,
      _et: "Organization",
      ...(data.organizationName && { organizationName: data.organizationName }),
      ...(data.organizationName && {
        organizationUrlSlug: Util.getUrlName(data.organizationName),
      }),
    };

    return await OrganizationEntity.build(UpdateItemCommand)
      .item(updateData)
      .options({
        returnValues: "ALL_NEW",
      })
      .send();
  }

  export async function remove(id: string) {
    return await OrganizationEntity.build(DeleteItemCommand)
      .key({ id, _et: "Organization" })
      .send();
  }

  export async function list() {
    const { Items } = await InventoryTable.build(QueryCommand)
      .query({
        index: "byStoreId",
        partition: "Store",
      })
      .entities(OrganizationEntity)
      .send();

    return Items;
  }

  export async function listByCreator(userId: string) {
    const { Items } = await InventoryTable.build(QueryCommand)
      .query({
        index: "byCreatedByUserId",
        partition: userId,
      })
      .entities(OrganizationEntity)
      .send();

    return Items;
  }
}
