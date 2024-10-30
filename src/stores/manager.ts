import { ManagerStore } from "@/types";
import { create } from "zustand";

const useManagerStore = create<ManagerStore>(set => ({
  orders: [],
  extras: [],
  products: [],
  init: (store) => {
    set(store);
  },
  setOrders: (orders) => {
    set({ orders });
  }
}));

export {
  useManagerStore,
};
