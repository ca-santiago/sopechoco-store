import { StoreInfo } from "@/types";

export function serializeStoreInfo(storeInfo: StoreInfo) {
  return JSON.stringify(storeInfo);
}

export function deserializeStoreInfo(storeInfo: string): StoreInfo {
  return JSON.parse(storeInfo);
}
