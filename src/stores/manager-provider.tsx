'use client';

import { Order, Product, ProductExtra } from "@/types";
import React, { PropsWithChildren } from "react";
import { useManagerStore } from "./manager";

interface Props {
  value: {
    extras: ProductExtra[];
    orders: Order[];
    products: Product[];
  };
}

function ManagerProvider(props: PropsWithChildren<Props>) {
  const {
    children,
    value: {
      extras,
      orders,
      products
    },
  } = props;

  const initStore = useManagerStore(s => s.init);

  React.useEffect(() => {
    initStore({
      orders,
      extras,
      products,
    });
  }, []);

  return (
    <>
      { children }
    </>
  );
}

export default ManagerProvider;