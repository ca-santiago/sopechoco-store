import { ManagerStore } from "@/types";
import { create } from "zustand";

const useManagerStore = create<ManagerStore>(set => ({
  orders: [],
  extras: [],
  products: [],
  isStoreOpen: false,
  init: (store) => {
    set(store);
  },
  setOrders: (orders) => {
    set({ orders });
  },
  setIsOpen: (isOpen) => {
    set({ isStoreOpen: isOpen });
  },
  updateOrderInfo: (order) => {
    set(state => {
      const orders = state.orders.map(o => {
        if (o.id === order.id) {
          return order;
        }

        return o;
      });

      return { orders };
    });
  }
}));

export {
  useManagerStore,
};
