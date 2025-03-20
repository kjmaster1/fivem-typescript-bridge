import {ServerInventory} from "./ServerInventory";
import {ServerFramework} from "../framework/ServerFramework";
export class CoreServerInventory extends ServerInventory {


  getItemCount(source: number, item: string): number {
    return exports[this.name].getItemCount(source, item) as number || 0
  }

  canCarry(source: number, item: string, count: number, framework?: ServerFramework): boolean {
    return true
  }

  addItem(source: number, item: string, count: number, metadata: Record<string, unknown>) {
    exports[this.name].addItem(source, item, count, metadata)
  }

  removeItem(source: number, item: string, count: number) {
    exports[this.name].removeItem(source, item, count)
  }
}
