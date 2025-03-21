import {Vector3} from "@nativewrappers/fivem";

export class TargetBase {

  constructor(readonly name: string) {}

  addTargetEntity(entity: number, data: any, distance?: number, offset?: Vector3) {
    console.error('^1[ERROR]: No interaction system was detected - please visit the config in static folder!^0');
  }

  removeTargetEntity(entity: number, data: any) {
    console.error('^1[ERROR]: No interaction system was detected - please visit the config in static folder!^0');
  }
}
