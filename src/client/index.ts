import Config from '@common/config';
import { Greetings } from '../common';
import { cache } from '@overextended/ox_lib/client';
import {ClientInventory} from "./bridge/inventory/ClientInventory";
import {ClientFramework} from "./bridge/framework/ClientFramework";
import {TargetBase} from "./bridge/target/TargetBase";
import {NotifyBase} from "./bridge/notify/NotifyBase";
import {
  initializeClientFramework,
  initializeClientInventory,
  initializeNotify,
  initializeTarget, initializeTests
} from "./bridge/initialization";

Greetings();

if (Config.EnableNuiCommand) {
  onNet(`${cache.resource}:openNui`, () => {
    SetNuiFocus(true, true);

    SendNUIMessage({
      action: 'setVisible',
      data: {
        visible: true,
      },
    });
  });

  RegisterNuiCallback('exit', (data: null, cb: (data: unknown) => void) => {
    SetNuiFocus(false, false);
    cb({});
  });
}

const clientInventory: ClientInventory = initializeClientInventory();
export const clientFramework: ClientFramework = initializeClientFramework(clientInventory).initializeEvents();
export const target: TargetBase = initializeTarget();
export const notify: NotifyBase = initializeNotify();
initializeTests();
