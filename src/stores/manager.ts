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
