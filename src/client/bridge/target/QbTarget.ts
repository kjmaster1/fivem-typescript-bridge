import {TargetBase} from "./TargetBase";
import {Vector3} from "@nativewrappers/fivem";

export class QbTarget extends TargetBase {

  addTargetEntity(entity: number, data: any, distance?: number, offset?: Vector3) {
    exports['qb-target'].AddTargetEntity(entity, { options: data, distance: distance });
  }

  removeTargetEntity(entity: number, data: any) {
    exports['qb-target'].RemoveTargetEntity(entity, data);
  }
}
