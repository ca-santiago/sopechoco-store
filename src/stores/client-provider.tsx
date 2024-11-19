'use client'

import { CartItem, ClientStore, ClientStoreState, OrderSummary } from "@/types";
import React, { createContext, PropsWithChildren } from "react";
import { ClientStoreApi, createClientStore } from "./client";
import { useStore } from "zustand";

const context = createContext<ClientStoreApi | undefined>(undefined);

interface Props {
  store: Partial<ClientStoreState>;
}

const ClientStoreProvider = (props: PropsWithChildren<Props>) => {
  const {
    store,
    children
  } = props;

  const storeRef = React.useRef<ClientStoreApi>();

  if (!storeRef.current) {
    storeRef.current = createClientStore({
      cartItems: [],
      currentOrders: [],
      products: store.products || [],
      extras: store.extras || [],
      isStoreOpen: store.isStoreOpen || false,
    });
  }

  React.useEffect(() => {
    const savedOrders = JSON.parse(window.localStorage.getItem('currentOrders') || '[]') as OrderSummary[];
    const savedCartItems = JSON.parse(window.localStorage.getItem('cartItems') || '[]') as CartItem[];

    storeRef.current!.setState(prev => ({
      cartItems: savedCartItems.length ? savedCartItems : prev.cartItems,
      currentOrders: savedOrders.length ? savedOrders : prev.currentOrders,
    }));

    storeRef.current!.subscribe((curr, prev) => {
      if (curr.cartItems !== prev.cartItems) {
        window.localStorage.setItem('cartItems', JSON.stringify(curr.cartItems));
      }

      if (curr.currentOrders !== prev.currentOrders) {
        window.localStorage.setItem('currentOrders', JSON.stringify(curr.currentOrders));
      }
    });
  }, []); // eslint-disable-line

  return (
    <context.Provider value={storeRef.current}>
      {children}
    </context.Provider>
  );
}

const useClientStore = <T,>(
  selector: (store: ClientStore) => T
) => {
  const store = React.useContext(context);
  if (!store) {
    throw new Error('useClientStore must be used within a ClientStoreProvider');
  }

  return useStore(store, selector);
}

export default ClientStoreProvider;
export {
  useClientStore,
}
