import Config from '@common/config';
import { Greetings } from '../common';
import { addCommand, cache } from '@overextended/ox_lib/server';
import {ServerFramework} from "./bridge/framework/ServerFramework";
import {ServerInventory} from "./bridge/inventory/ServerInventory";
import {OxServerInventory} from "./bridge/inventory/OxServerInventory";
import {QbServerInventory} from "./bridge/inventory/QbServerInventory";
import {PsServerInventory} from "./bridge/inventory/PsServerInventory";
import {EsxServerFramework} from "./bridge/framework/EsxServerFramework";
import {QboxServerFramework} from "./bridge/framework/QboxServerFramework";
import {QbCoreServerFramework} from "./bridge/framework/QbCoreServerFramework";
import {OxCoreServerFramework} from "./bridge/framework/OxCoreServerFramework";
import {CoreServerInventory} from "./bridge/inventory/CoreServerInventory";

Greetings();

if (Config.EnableNuiCommand) {
  addCommand('openNui', async (playerId) => {
    if (!playerId) return;

    emitNet(`${cache.resource}:openNui`, playerId);
  });
}

const serverInventory: ServerInventory = initializeServerInventory();
export const serverFramework: ServerFramework = initializeServerFramework();

function initializeServerInventory(): ServerInventory {
  if (GetResourceState('ox_inventory') === 'started') {
    return new OxServerInventory('ox_inventory');
  } else if (GetResourceState("qb-inventory") === 'started') {
    return new QbServerInventory('qb-inventory');
  } else if (GetResourceState('qs-inventory') === 'started') {
    return new ServerInventory('qs-inventory');
  } else if (GetResourceState('ps-inventory') === 'started') {
    return new PsServerInventory('qs-inventory');
  } else if (GetResourceState('origen_inventory') === 'started') {
    return new ServerInventory('origen_inventory');
  } else if (GetResourceState('codem-inventory') === 'started') {
    return new ServerInventory('codem-inventory');
  } else if (GetResourceState('core_inventory') === 'started') {
    return new CoreServerInventory('core_inventory');
  }
  return undefined;
}

function initializeServerFramework(): ServerFramework {
  if (GetResourceState('es_extended') === 'started') {
    return new EsxServerFramework(serverInventory);
  } else if (GetResourceState('qbx_core') === 'started') {
    return  new QboxServerFramework(serverInventory);
  } else if (GetResourceState('qb-core') === 'started') {
    return  new QbCoreServerFramework('qb', serverInventory);
  } else if (GetResourceState('ox_core') === 'started') {
    return  new OxCoreServerFramework(serverInventory);
  }
}

if (Config.EnableServerTests) {
  addCommand('getPlayer', async (playerId) => {
    if (!playerId) return;
    console.log(serverFramework.getPlayer(playerId));
  })
  addCommand('getIdentifier', async (playerId) => {
    if (!playerId) return;
    console.log(serverFramework.getIdentifier(playerId));
  })
  addCommand('getName', async (playerId) => {
    if (!playerId) return;
    console.log(serverFramework.getName(playerId));
  })
  addCommand('getItemCount', async (playerId, args) => {
    if (!args.length) return;
    if (!playerId) return;
    if (args[0] !== undefined && typeof args[0] === 'string') {
      console.log(serverFramework.getItemCount(playerId, args[0]))
    }
  })
  addCommand('convertMoneyType', async (playerId, args) => {
    if (!playerId) return;
    if (args[0] !== undefined && typeof args[0] === 'string') {
      if (args[0] === 'bank' || args[0] == 'cash' || args[0] === 'money') {
        console.log(serverFramework.convertMoneyType(args[0]));
      }
    }
  })
  addCommand('checkPlayerBalance', async (playerId, args) => {
    if (!playerId) return;
    if (args[0] !== undefined && typeof args[0] === 'string') {
      if (args[0] === 'bank' || args[0] == 'cash' || args[0] === 'money') {
        console.log(serverFramework.getName(playerId), serverFramework.getPlayerBalance(playerId, args[0]));
      }
    }
  })
  addCommand('addMoney', async (playerId, args) => {
    if (!playerId) return;
    if (args[0] !== undefined && typeof args[0] === 'string') {
      if (args[0] === 'bank' || args[0] == 'cash' || args[0] === 'money') {
        if (args[1] !== undefined && typeof Number(args[1]) === 'number') {
          serverFramework.addMoney(playerId, args[0], Number(args[1]))
        }
      }
    }
  })
  addCommand('removeMoney', async (playerId, args) => {
    if (!playerId) return;
    if (args[0] !== undefined && typeof args[0] === 'string') {
      if (args[0] === 'bank' || args[0] == 'cash' || args[0] === 'money') {
        if (args[1] !== undefined && typeof Number(args[1]) === 'number') {
          serverFramework.removeMoney(playerId, args[0], Number(args[1]))
        }
      }
    }
  })
  addCommand('canCarry', async (playerId, args) => {
    if (!playerId) return;
    if (args[0] !== undefined && typeof args[0] === 'string') {
      if (args[1] !== undefined && typeof Number(args[1]) === 'number') {
        console.log(serverFramework.canCarry(playerId, args[0], Number(args[1])))
      }
    }
  })
  addCommand('bridgeAddItem', async (playerId, args) => {
    if (!playerId) return;
    if (args[0] !== undefined && typeof args[0] === 'string') {
      if (args[1] !== undefined && typeof Number(args[1]) === 'number') {
        serverFramework.addItem(playerId, args[0], Number(args[1]), {});
      }
    }
  })
  addCommand('bridgeRemoveItem', async (playerId, args) => {
    if (!playerId) return;
    if (args[0] !== undefined && typeof args[0] === 'string') {
      if (args[1] !== undefined && typeof Number(args[1]) === 'number') {
        serverFramework.removeItem(playerId, args[0], Number(args[1]))
      }
    }
  })
}
