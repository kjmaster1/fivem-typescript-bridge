import {ServerInventory} from "./inventory/ServerInventory";
import {OxServerInventory} from "./inventory/OxServerInventory";
import {QbServerInventory} from "./inventory/QbServerInventory";
import {PsServerInventory} from "./inventory/PsServerInventory";
import {CoreServerInventory} from "./inventory/CoreServerInventory";
import {ServerFramework} from "./framework/ServerFramework";
import {EsxServerFramework} from "./framework/EsxServerFramework";
import {QboxServerFramework} from "./framework/QboxServerFramework";
import {QbCoreServerFramework} from "./framework/QbCoreServerFramework";
import {OxCoreServerFramework} from "./framework/OxCoreServerFramework";
import Config from "../../common/config";
import {addCommand} from "@overextended/ox_lib/server";
import {serverFramework} from "../index";

export function initializeServerInventory(): ServerInventory {
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

export function initializeServerFramework(serverInventory: ServerInventory): ServerFramework {
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

export function initializeTests(): void {
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
}
