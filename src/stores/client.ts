import { ClientStore, ClientStoreState } from "@/types";
import { create } from "zustand";

const createClientStore = (initialState: Partial<ClientStoreState>) => {
  return create<ClientStore>(set => ({
    cartItems: [],
    products: [],
    extras: [],
    currentOrders: [],
    isStoreOpen: false,
    ...initialState,

    init: (store) => {
      set(store);
    },
    setCartItems: (cartItems) => {
      window.localStorage.setItem('cartItems', JSON.stringify(cartItems));
      set({ cartItems });
    },
    setProducts: (products) => {
      set({ products });
    },
    setExtras: (extras) => {
      set({ extras });
    },
    setCurrentOrders: (orders) => {
      window.localStorage.setItem('currentOrders', JSON.stringify(orders));
      set({ currentOrders: orders });
    },
    cleanCurrentOrders: () => {
      set({ currentOrders: [] });
    },

    // Cart actions
    addToCart: (product) => {
      set(state => {
        const existingItem = state.cartItems.findIndex(i => i.itemId === product.itemId);

        if (existingItem > -1) {
          console.log('Updating');
          return {
            cartItems: state.cartItems.map(i => {
              if (i.itemId === product.itemId) {
                return product;
              }
              return i;
            }),
          }
        } else {
          console.log('Adding');
          return {
            cartItems: [...state.cartItems, product],
          };
        }

      });
    },
  }));
}

export type ClientStoreApi = ReturnType<typeof createClientStore>;

export {
  createClientStore,
}