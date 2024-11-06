'use client';

import React from "react";
import { Order } from "@/types";
import { getOrdersByIds } from "@/actions/order";
import InlineOrderStatus from "@/components/orders/inline-order-status";
import Link from "next/link";
import { FaStore } from "react-icons/fa6";
import { useClientStore } from "@/stores/client-provider";

function ActiveOrdersSection() {
  const activeOrders = useClientStore(s => s.currentOrders);
  const setActiveOrders = useClientStore(s => s.setCurrentOrders);

  const [loading, setLoading] = React.useState(true);
  const [ordersData, setOrdersData] = React.useState<Order[]>([]);

  const loadOrdersData = () => {
    const oIds = activeOrders.map(order => order.orderId);
    getOrdersByIds(oIds)
      .then((results) => {
        const filtered = results.filter(r => r !== null);
        reconciliateOrders(filtered);
      })
      .catch(console.error)
      .finally(() => {
        setLoading(false);
      });
  };

  const reconciliateOrders = (newOrders: Order[]) => {
    setOrdersData(newOrders);

    const onlyExistingOrders = activeOrders.filter(o => !!newOrders.find(n => n.id === o.orderId));

    // Cleanup from local storage activeOrders not found on system
    setActiveOrders(onlyExistingOrders);
  }

  React.useEffect(() => {
    if (!activeOrders.length) return;
    loadOrdersData();

    // Looking for changes on len becase of the way we inject the store
    // It is created with [] by default (cart.ts L11) on first load, then on StoreProvider L40 init function is called on effect (after first render)
    // Causing a first render with no data followed by a second render with data
    // FIX: Use React context to initialize the store with the correct store data on first render
  }, [activeOrders.length]); // eslint-disable-line

  if (loading) {
    return null;

    // System loads fast, we do not need loading components
    return (
      <div className="flex flex-col gap-6 w-1/2 mx-auto mt-8">
        {activeOrders.map((_, index) => (
          <div key={index} className="bg-slate-300 animate-pulse rounded-md h-7 w-full" />
        ))}
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-6 w-1/2 mx-auto pt-8">
      
      <div className='flex w-full gap-4 justify-between items-center'>
        <h1 className='text-3xl text-slate-700 text-center font-semibold'>Ordenes activas</h1>
        <div className='text-blue-500 rounded-full p-2 hover:text-blue-600 hover:bg-slate-200'>
          <Link href='/store'>
            <FaStore size={26} />
          </Link>
        </div>
      </div>

      {!ordersData.length &&
        <div className="flex flex-col gap-6">
          <div className="bg-slate-200 p-4 rounded-md w-full">
            <p className="text-slate-700 font-semibold">
              No hay ordenes activas
            </p>
          </div>
        </div>
      }

      <div className="flex flex-col gap-4 w-full">
        { ordersData.map(order =>
          <InlineOrderStatus key={order.id} order={order} />
        ) }
      </div>
    </div>
  );
}

export default ActiveOrdersSection;