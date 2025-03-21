import Config from '@common/config';
import { Greetings } from '../common';
import { cache } from '@overextended/ox_lib/client';
import {ClientInventory} from "./bridge/inventory/ClientInventory";
import {ClientFramework} from "./bridge/framework/ClientFramework";
import {OxClientInventory} from "./bridge/inventory/OxClientInventory";
import {QbClientInventory} from "./bridge/inventory/QbClientInventory";
import {QsClientInventory} from "./bridge/inventory/QsClientInventory";
import {PsClientInventory} from "./bridge/inventory/PsClientInventory";
import {OrigenClientInventory} from "./bridge/inventory/OrigenClientInventory";
import {CodemClientInventory} from "./bridge/inventory/CodemClientInventory";
import {CoreClientInventory} from "./bridge/inventory/CoreClientInventory";
import {EsxClientFramework} from "./bridge/framework/EsxClientFramework";
import {QbCoreClientFramework} from "./bridge/framework/QbCoreClientFramework";
import {QboxClientFramework} from "./bridge/framework/QboxClientFramework";
import {OxCoreClientFramework} from "./bridge/framework/OxCoreClientFramework";
import {addCommand} from "@overextended/ox_lib/server";

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

function initializeClientInventory(): ClientInventory {
  if (GetResourceState('ox_inventory') === 'started') {
    return new OxClientInventory('ox_inventory');
  } else if (GetResourceState("qb-inventory") === 'started') {
    return new QbClientInventory('qb-inventory');
  } else if (GetResourceState('qs-inventory') === 'started') {
    return new QsClientInventory('qs-inventory');
  } else if (GetResourceState('ps-inventory') === 'started') {
    return new PsClientInventory('qs-inventory');
  } else if (GetResourceState('origen_inventory') === 'started') {
    return new OrigenClientInventory('origen_inventory');
  } else if (GetResourceState('codem-inventory') === 'started') {
    return new CodemClientInventory('codem-inventory');
  } else if (GetResourceState('core_inventory') === 'started') {
    return new CoreClientInventory('core_inventory');
  }
  return undefined;
}

function initializeClientFramework(): ClientFramework {
  if (GetResourceState('es_extended') === 'started') {
    return new EsxClientFramework('esx', clientInventory);
  } else if (GetResourceState('qb-core') === 'started') {
    return  new QbCoreClientFramework('qb', clientInventory);
  } else if (GetResourceState('ox_core') === 'started') {
    return  new OxCoreClientFramework('ox', clientInventory);
  } else if (GetResourceState('qbx_core') === 'started') {
    return  new QboxClientFramework(clientInventory);
  }
}

const clientInventory: ClientInventory = initializeClientInventory();
export const clientFramework: ClientFramework = initializeClientFramework().initializeEvents();

if (Config.EnableClientTests) {
  addCommand('getPlayerData', async () => {
    console.log(clientFramework.getPlayerData());
  })
  addCommand('getPlayerInventory', async () => {
    console.log(clientFramework.getPlayerInventory());
  })
  addCommand('getItemData', async (playerId, args) => {
    if (args[0] !== undefined && typeof args[0] === 'string') {
      console.log(clientFramework.getItemData(args[0]));
    }
  })
  addCommand('hasItem', async (playerId, args) => {
    if (args[0] !== undefined && typeof args[0] === 'string') {
      if (args[1] !== undefined && typeof Number(args[1]) === 'number') {
        console.log(clientFramework.hasItem(args[0], Number(args[1])));
      }
    }
  })
}
