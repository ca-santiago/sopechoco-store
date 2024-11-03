import { StoreInfo } from "@/types";
import redisClient from "../redis";
import { SOPECHOCO_REDIS_ISOPEN_KEY, SOPECHOCO_REDIS_KEY } from "@/consts";
import { deserializeStoreInfo, serializeStoreInfo } from "@/helpers/store-info";

async function getStoreInfo(): Promise<StoreInfo> {
  const res = await redisClient.get(SOPECHOCO_REDIS_KEY);
  if (!res) {
    throw new Error('Store info not found');
  }
  return deserializeStoreInfo(res);
}

async function setStoreInfo(storeInfo: StoreInfo) {
  await redisClient.set(SOPECHOCO_REDIS_KEY, serializeStoreInfo(storeInfo));
}

async function getStoreStatus(): Promise<boolean> {
  const storeInfo = await redisClient.get(SOPECHOCO_REDIS_ISOPEN_KEY);
  return storeInfo === '1' || false;
}

async function setStoreStatus(status: boolean): Promise<boolean> {
  await redisClient.set(SOPECHOCO_REDIS_ISOPEN_KEY, status ? '1' : '0');
  return status; 
}

export {
  getStoreInfo,
  setStoreInfo,
  getStoreStatus,
  setStoreStatus,
};
