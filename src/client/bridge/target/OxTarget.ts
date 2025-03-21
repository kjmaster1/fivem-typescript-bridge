import {TargetBase} from "./TargetBase";
import {Vector3} from "@nativewrappers/fivem";

export class OxTarget extends TargetBase {


  addTargetEntity(entity: number, data: any, distance?: number, offset?: Vector3) {
    exports.ox_target.addLocalEntity(entity, data);
  }

  removeTargetEntity(entity: number, data: any) {
    exports.ox_target.removeLocalEntity(entity, data);
  }
}
