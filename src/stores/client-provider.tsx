'use client'

import { CartItem, ClientStore, ClientStoreState, OrderSummary } from "@/types";
import React, { createContext, PropsWithChildren } from "react";
import { ClientStoreApi, createClientStore } from "./client";
import { useStore } from "zustand";
import { useSafeLocalStorage } from "@/hooks/useStorage";

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
    console.log('Creating store');
    storeRef.current = createClientStore({
      cartItems: [],
      currentOrders: [],
      products: store.products || [],
      extras: store.extras || [],
      isStoreOpen: store.isStoreOpen || false,
    });
  }

  const [lSOrders, setLSOrders] = useSafeLocalStorage<OrderSummary[]>('currentOrders', []);
  const [lsCartItems, setLSCartItems] = useSafeLocalStorage<CartItem[]>('cartItems', []);

  const setStore = useStore(storeRef.current, s => s.init);

  const currentOrders = useStore(storeRef.current, s => s.currentOrders);
  const cartItems = useStore(storeRef.current, s => s.cartItems);
  
  React.useEffect(() => {
    setStore({
      currentOrders: lSOrders,
      cartItems: lsCartItems,
    });
  }, [storeRef.current]); // eslint-disable-line

  React.useEffect(() => {
    console.log('Setting cart items');
    setLSCartItems(cartItems);
  }, [cartItems]); // eslint-disable-line

  React.useEffect(() => {
    console.log('Setting current orders');
    setLSOrders(currentOrders);
  }, [currentOrders]); // eslint-disable-line

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
