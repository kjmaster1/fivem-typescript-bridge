import {Inventory} from "@common/bridge/inventory/Inventory";

export class Framework {
  name: string;
  inventory: Inventory;

  constructor(name: string, inventory: Inventory) {
    this.name = name;
    this.inventory = inventory;
  }
}
