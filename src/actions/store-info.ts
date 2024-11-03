'use server';

import { getStoreStatus, setStoreStatus } from "@/services/store-info";

async function getStoreOpenStatus() {
  return await getStoreStatus();
}

async function openStore() {
  return await setStoreStatus(true);
}

async function closeStore() {
  return await setStoreStatus(false);
}

export {
  getStoreOpenStatus,
  openStore,
  closeStore,
}