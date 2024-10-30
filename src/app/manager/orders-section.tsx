'use client';

import React from "react";
import OrderDetailsCard from "@/components/manager/order-details-card";
import { useManagerStore } from "@/stores/manager";

function OrdersSection() {
  const currentOrders = useManagerStore(s => s.orders);

  const acceptedOrders = currentOrders.filter(order => order.status === 'ACCEPTED');
  const pendingOrders = currentOrders.filter(order => order.status === 'PENDING');
  const rejectOrders = currentOrders.filter(order => order.status === 'REJECTED');

  console.log(currentOrders);

  return (
    <section className="w-full px-8 pt-8 grid grid-cols-[1fr,300px] min-h-screen bg-blue-50">
      <div className="flex flex-col gap-8">
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

        { rejectOrders.length > 0 &&
          <div className="flex flex-col gap-4">
            <h3 className="text-slate-600 font-semibold text-left text-lg">Rejected Orders {rejectOrders.length}</h3>
          </div> 
        }
      </div>

      <div className="flex flex-col gap-8">
        { pendingOrders.length > 0 && (
          <div className="flex flex-col gap-4 mx-4">
            <h3 className="text-slate-600 font-semibold text-left text-lg">Pending Orders</h3>
            <div className="grid grid-cols-1 auto-rows-[content-fit] gap-4 w-full">
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