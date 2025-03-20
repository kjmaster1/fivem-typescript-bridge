import Config from '@common/config';
import { Greetings } from '@common/index';
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

Greetings();

if (Config.EnableNuiCommand) {
  addCommand('openNui', async (playerId) => {
    if (!playerId) return;

    emitNet(`${cache.resource}:openNui`, playerId);
  });
}

export let serverFramework: ServerFramework
export let serverInventory: ServerInventory

if (GetResourceState('ox_inventory') === 'started') {
  serverInventory = new OxServerInventory('ox_inventory');
} else if (GetResourceState("qb-inventory") === 'started') {
  serverInventory = new QbServerInventory('qb-inventory');
} else if (GetResourceState('qs-inventory') === 'started') {
  serverInventory = new ServerInventory('qs-inventory');
} else if (GetResourceState('ps-inventory') === 'started') {
  serverInventory = new PsServerInventory('qs-inventory');
} else if (GetResourceState('origen_inventory') === 'started') {
  serverInventory = new ServerInventory('origen_inventory');
} else if (GetResourceState('codem-inventory') === 'started') {
  serverInventory = new ServerInventory('codem-inventory');
} else if (GetResourceState('core_inventory') === 'started') {
  serverInventory = new ServerInventory('core_inventory');
}

if (GetResourceState('es_extended') === 'started') {
  serverFramework = new EsxServerFramework(serverInventory);
} else if (GetResourceState('qbx_core') === 'started') {
  serverFramework = new QboxServerFramework(serverInventory);
} else if (GetResourceState('qb-core') === 'started') {
  serverFramework = new QbCoreServerFramework('qb', serverInventory);
} else if (GetResourceState('ox_core') === 'started') {
  serverFramework = new OxCoreServerFramework(serverInventory);
}
