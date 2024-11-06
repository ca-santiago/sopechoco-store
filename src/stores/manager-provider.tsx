'use client';

import { ManagerStore, Order, Product, ProductExtra } from "@/types";
import React, { PropsWithChildren } from "react";
import { ManagerStoreApi, createManagerStore } from "./manager";
import { useStore } from "zustand";

const managerContext = React.createContext<ManagerStoreApi | undefined>(undefined);

interface Props {
  value: {
    extras: ProductExtra[];
    orders: Order[];
    products: Product[];
    isStoreOpen: boolean;
  };
}

function ManagerProvider(props: PropsWithChildren<Props>) {
  const {
    children,
    value: {
      extras,
      orders,
      products,
      isStoreOpen,
    },
  } = props;

  // const initStore = useManagerStore(s => s.init);
  
  // React.useEffect(() => {
  //   initStore({
  //     orders,
  //     extras,
  //     products,
  //     isStoreOpen,
  //   });
  // }, []);

  const storeRef = React.useRef<ManagerStoreApi>();

  if (!storeRef.current) {
    storeRef.current = createManagerStore({
      orders,
      extras,
      products,
      isStoreOpen,
    });
  }

  return (
    <managerContext.Provider
      value={storeRef.current}
    >
      { children }
    </managerContext.Provider>
  );
}

const useManagerStore = <T,>(
  selector: (store: ManagerStore) => T,
) => {
  const store = React.useContext(managerContext);

  if (!store) {
    throw new Error('useManagerStore must be used within a ManagerProvider');
  }

  return useStore(store, selector);
}

export default ManagerProvider;
export { useManagerStore };
