import {ServerInventory} from "./ServerInventory";

export class OxServerInventory extends ServerInventory {

  getItemCount(source: number, item: string): number {
    return exports[this.name].Search(source, 'count', item) as number || 0
  }

  addItem(source: number, item: string, count: number, metadata: Record<string, unknown>) {
    exports[this.name].AddItem(source, item, count, metadata)
  }

}
