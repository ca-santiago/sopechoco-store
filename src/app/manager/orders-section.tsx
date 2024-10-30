'use client';

import OrderDetailsCard from "@/components/manager/order-details-card";
import { useManagerStore } from "@/stores/manager";
import { Order } from "@/types";
import React from "react";

function OrdersSection() {
  const currentOrders = useManagerStore(s => s.orders);

  const acceptedOrders = currentOrders.filter(order => order.status === 'ACCEPTED');
  const pendingOrders = currentOrders.filter(order => order.status === 'PENDING');

  return (
    <section className="w-full px-8">
      <div className="flex flex-col gap-8 mt-8">
        {acceptedOrders.length === 0 &&
          <p className="text-lg font-semibold text-center text-slate-700">No orders yet</p>
        }

        {acceptedOrders.length > 0 && (
          <div className="flex flex-col gap-4">
            <h3 className="text-slate-600 font-semibold text-left text-lg">Accepted Orders</h3>
            <div className="grid grid-cols-[repeat(auto-fill,220px)] gap-x-2">
              { acceptedOrders.map(order =>
                <OrderDetailsCard key={order.id} order={order} />
              )}
            </div>
          </div>
        )}

        { pendingOrders.length > 0 && (
          <div className="flex flex-col gap-4">
            <h3 className="text-slate-600 font-semibold text-left text-lg">Pending Orders</h3>
            <div className="grid grid-cols-[repeat(4,1fr)] auto-rows-[content-fit] gap-4 w-full">
              { pendingOrders.map(order =>
                <OrderDetailsCard key={order.id} order={order} />
              )}
            </div>
          </div>
        )}
      </div>
    </section>
  );
}

export default OrdersSection;