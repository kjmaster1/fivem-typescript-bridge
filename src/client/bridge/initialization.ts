import {ClientInventory} from "./inventory/ClientInventory";
import {OxClientInventory} from "./inventory/OxClientInventory";
import {QbClientInventory} from "./inventory/QbClientInventory";
import {QsClientInventory} from "./inventory/QsClientInventory";
import {PsClientInventory} from "./inventory/PsClientInventory";
import {OrigenClientInventory} from "./inventory/OrigenClientInventory";
import {CodemClientInventory} from "./inventory/CodemClientInventory";
import {CoreClientInventory} from "./inventory/CoreClientInventory";
import {ClientFramework} from "./framework/ClientFramework";
import {EsxClientFramework} from "./framework/EsxClientFramework";
import {QbCoreClientFramework} from "./framework/QbCoreClientFramework";
import {OxCoreClientFramework} from "./framework/OxCoreClientFramework";
import {QboxClientFramework} from "./framework/QboxClientFramework";
import {TargetBase} from "./target/TargetBase";
import Config from "../../common/config";
import {OxTarget} from "./target/OxTarget";
import {QbTarget} from "./target/QbTarget";
import {InteractTarget} from "./target/InteractTarget";
import {NotifyBase} from "./notify/NotifyBase";
import {OxLibNotify} from "./notify/OxLibNotify";
import {EsxNotify} from "./notify/EsxNotify";
import {QbNotify} from "./notify/QbNotify";
import {SdNotify} from "./notify/SdNotify";
import {WasabiNotify} from "./notify/WasabiNotify";
import {addCommand} from "@overextended/ox_lib/server";
import {clientFramework} from "../index";

export function initializeClientInventory(): ClientInventory {
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
  console.log("No inventory found, returning undefined...")
  return undefined;
}

export function initializeClientFramework(clientInventory: ClientInventory): ClientFramework {
  if (GetResourceState('es_extended') === 'started') {
    return new EsxClientFramework('esx', clientInventory);
  } else if (GetResourceState('qb-core') === 'started') {
    return  new QbCoreClientFramework('qb', clientInventory);
  } else if (GetResourceState('ox_core') === 'started') {
    return  new OxCoreClientFramework('ox', clientInventory);
  } else if (GetResourceState('qbx_core') === 'started') {
    return  new QboxClientFramework(clientInventory);
  }
  console.error('No framework detected! Things will be very broken!')
  return undefined;
}

export function initializeTarget(): TargetBase {
  if (Config.setup.target === 'ox_target') {
    return new OxTarget('ox_target');
  } else if (Config.setup.target === 'qb-target') {
    return new QbTarget('qb-target');
  } else if (Config.setup.target === 'interact') {
    return new InteractTarget('interact');
  }
  console.log("No valid targeting resource specified in config, returning undefined...")
  return undefined;
}

export function initializeNotify(): NotifyBase {
  if (Config.setup.notify === 'ox_lib') {
    return new OxLibNotify('ox_lib');
  } else if (Config.setup.notify === 'esx') {
    return new EsxNotify('esx');
  } else if (Config.setup.notify === 'qb') {
    return new QbNotify('qb');
  } else if (Config.setup.notify === 'sd-notify') {
    return new SdNotify('sd-notify');
  } else if (Config.setup.notify === 'wasabi-notify') {
    return new WasabiNotify('wasabi-notify');
  }
  console.log("No valid notification resource specified in config, returning undefined...")
}

export function initializeTests(): void {
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
}
