'use client';

import React from "react";
import { Order } from "@/types";
import { getOrdersByIds } from "@/actions/order";
import Link from "next/link";
import { FaStore } from "react-icons/fa6";
import { useClientStore } from "@/stores/client-provider";
import OrderSummaryByStatusList from "@/components/orders/order-summary-by-status-list";

function ActiveOrdersSection() {
  const activeOrders = useClientStore(s => s.currentOrders);
  const setActiveOrders = useClientStore(s => s.setCurrentOrders);

  const [ordersData, setOrdersData] = React.useState<Order[]>([]);
  const [loading, setLoading] = React.useState(false);

  const loadOrdersData = () => {
    const oIds = activeOrders.map(order => order.orderId);
    getOrdersByIds(oIds)
      .then((results) => {
        const filtered = results.filter(r => r !== null);
        reconciliateOrders(filtered);
      })
      .catch(console.error)
  };

  const reconciliateOrders = (newOrders: Order[]) => {
    setLoading(false);
    setOrdersData(newOrders);

    // Cleanup from local storage activeOrders not found on system
    const onlyExistingOrders = activeOrders.filter(o => !!newOrders.find(n => n.id === o.orderId));
    if (newOrders.length !== onlyExistingOrders.length) setActiveOrders(onlyExistingOrders);
  }

  React.useEffect(() => {
    if (activeOrders.length === ordersData.length) return;

    setLoading(true);
    loadOrdersData();
  }, [activeOrders]); // eslint-disable-line

  return (
    <div className="flex flex-col gap-6 w-full px-4 sm:w-[400px] lg:w-[600px] mx-auto pt-8">
      <div className='flex w-full gap-4 justify-between items-center'>
        <h1 className='text-3xl text-slate-700 text-center font-semibold'>Ordenes activas</h1>
        <div className='text-blue-500 rounded-full p-2 hover:text-blue-600 hover:bg-slate-200'>
          <Link href='/store'>
            <FaStore size={26} />
          </Link>
        </div>
      </div>

      {ordersData.length === 0 && !loading &&
        <div className="border-2 border-slate-200 bg-gray-100 p-4 rounded-md w-full flex flex-col gap-4 items-center">
          <p className="text-slate-700 font-semibold">
            No hay ordenes activas
          </p>
          <Link
            href="/store"
            className="rounded-md bg-blue-500 hover:bg-blue-600 text-white px-2 py-1 flex gap-2 items-center"
          >
            Ordena algo ahora
            <FaStore />
          </Link>
        </div>
      }

      <OrderSummaryByStatusList
        orders={ordersData}
      />
    </div>
  );
}

export default ActiveOrdersSection;