import {Inventory} from "@common/bridge/inventory/Inventory";
import {ServerFramework} from "~/src/server/bridge/framework/ServerFramework";

interface ItemData {
  amount: number;
  count: number;
}

export class ServerInventory extends Inventory {
  getItemCount(source: number, item: string): number {
    const itemData = exports[this.name].GetItemByName(source, item) as ItemData;
    return itemData?.amount || itemData?.count || 0;
  }

  canCarry(source: number, item: string, count: number, framework?: ServerFramework): boolean {
    return exports[this.name].CanCarryItem(source, item, count);
  }

  addItem(source: number, item: string, count: number, metadata?: any): void {
    exports[this.name].AddItem(source, item, count, undefined, metadata);
  }

  removeItem(source: number, item: string, count: number): void {
    exports[this.name].RemoveItem(source, item, count);
  }
}
