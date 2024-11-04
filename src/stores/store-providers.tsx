'use client';

import React, { PropsWithChildren } from "react";
import { useStoreCart } from "./cart";
import { CartItem, OrderSummary, ProductExtra, Product } from "@/types";
import { useSafeLocalStorage } from "@/hooks/useStorage";

interface Props {
  store: {
    extras: ProductExtra[];
    products: Product[];
    isOpen: boolean;
  },
}

function StoreProvider(props: PropsWithChildren<Props>) {
  const {
    children,
    store: {
      extras,
      products,
      isOpen,
    },
  } = props;

  const cartItems = useStoreCart(s => s.items);
  const currentOrders = useStoreCart(s => s.currentOrders);

  const initCart = useStoreCart(s => s.init);

  const [currOrdersStorage, setStorageCurrentOrders] = useSafeLocalStorage<OrderSummary[]>('current-orders', []);
  const [cartItemsStorage, setCartItemsStorage] = useSafeLocalStorage<CartItem[]>('cartItems', []);

  React.useEffect(() => {
    setCartItemsStorage(cartItems);
  }, [cartItems, setCartItemsStorage]);

  React.useEffect(() => {
    setStorageCurrentOrders(currentOrders);
  }, [currentOrders, setStorageCurrentOrders]);

  React.useEffect(() => {
    initCart({
      items: cartItemsStorage,
      extras,
      products,
      currentOrders: currOrdersStorage,
      isStoreOpen: isOpen,
    });
  }, []); // eslint-disable-line

  return (
    <>
      {children}
    </>
  );
}

export default StoreProvider;
