'use client';

import React from "react";
import OrderDetailsCard from "@/components/manager/order-details-card";
import { closeStore, openStore } from "@/actions/store-info";

import cx from 'classnames';
import { GoDotFill } from "react-icons/go";
import { BiStore } from "react-icons/bi";
import { useManagerStore } from "@/stores/manager-provider";

function OrdersSection() {
  const currentOrders = useManagerStore(s => s.orders);
  const isStoreOpen = useManagerStore(s => s.isStoreOpen);

  const setIsOpen = useManagerStore(s => s.setIsOpen);

  const acceptedOrders = currentOrders.filter(order => order.status === 'ACCEPTED');
  const pendingOrders = currentOrders.filter(order => order.status === 'PENDING');
  const rejectOrders = currentOrders.filter(order => order.status === 'REJECTED');

  const handleOpenStore = () => {
    openStore()
      .then(() => setIsOpen(true))
      .catch(console.error);
  }

  const handleCloseStore = () => {
    closeStore()
      .then(() => setIsOpen(false))
      .catch(console.error);
  }

  const isOpenBannerClasses = cx({
    'border-2 p-2 rounded-md flex justify-between items-center': true,
    'text-slate-700': isStoreOpen,
    'text-red-500 bg-red-100 border-red-200': !isStoreOpen,
  });

  return (
    <section className="w-full px-8 pt-8 grid grid-rows-[auto,1fr] grid-cols-[1fr,300px] gap-4 min-h-screen bg-blue-50">

      <div className="row-span-1 row-start-1 col-start-1 col-span-2">
        <div className={isOpenBannerClasses}>
          <div className="flex gap-2 items-center">
            {isStoreOpen && <GoDotFill className="text-xl text-green-500" />}
            <h3 className="text-lg font-semibold text-slate-700">Sopechoco</h3>
          </div>

          {isStoreOpen &&
            <button
              onClick={handleCloseStore}
              className="bg-red-500 text-white rounded-md p-2"
            >
              Close
            </button>
          }
        </div>
      </div>

      <div className="flex flex-col gap-8 row-start-2 col-start-1">
        {acceptedOrders.length === 0 &&
          <p className="text-lg font-semibold text-center text-slate-700">No orders yet</p>
        }

        {acceptedOrders.length > 0 && (
          <div className="flex flex-col gap-4">
            <h3 className="text-slate-600 font-semibold text-left text-lg ml-1">Accepted Orders</h3>
            <div className="grid grid-cols-[repeat(auto-fill,220px)] gap-2">
              {acceptedOrders.map(order =>
                <OrderDetailsCard key={order.id} order={order} />
              )}
            </div>
          </div>
        )}

        {rejectOrders.length > 0 &&
          <div className="flex flex-col gap-4">
            <h3 className="text-slate-600 font-semibold text-left text-lg">Rejected Orders {rejectOrders.length}</h3>
          </div>
        }
      </div>


      <div className="flex flex-col gap-4 row-start-2 col-start-2">
        {isStoreOpen && pendingOrders.length > 0 && (
          <div className="flex flex-col gap-4 w-full">
            <h3 className="text-slate-600 font-semibold text-left text-lg ml-1">Pending Orders</h3>
            <div className="grid grid-cols-1 auto-rows-[content-fit] gap-4 w-full">
              {pendingOrders.map(order =>
                <OrderDetailsCard key={order.id} order={order} />
              )}
            </div>
          </div>
        )}

        {!isStoreOpen &&
          <div className="flex flex-col items-center gap-4 w-full">
            <p className="text-lg font-semibold text-center text-slate-700">The store is currently closed.</p>
            <p className="text-slate-600 text-center">Open the store to start receiving orders.</p>
            <button
              className="px-4 py-2 bg-blue-500 text-white rounded-md flex gap-2"
              onClick={ handleOpenStore}
            >
              <BiStore size={28} className="text-white" />
              Open Store
            </button>
          </div>
        }
      </div>
    </section>
  );
}

export default OrdersSection;