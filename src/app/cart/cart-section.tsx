'use client';

import InlineCurrentOrders from "@/components/orders/inline-orders";
import CartContainer from "./container";
import { FaStore } from "react-icons/fa6";
import Link from "next/link";
import CartItemsList from "@/components/cart/cart-items-list";
import { useClientStore } from "@/stores/client-provider";
import { IoWarning } from "react-icons/io5";
// import { useClientStore } from "@/stores/client-provider";

function CartSection() {
  // const cartItems = useClientStore(s => s.cartItems);
  // const currentOrders = useClientStore(s => s.currentOrders);
  const isStoreOpen = useClientStore(s => s.isStoreOpen);

  return (
    <section className="flex flex-col gap-6 py-8 bg-slate-50 min-h-screen">
      <div className='w-full md:w-3/4 lg:w-2/4 xl:w-1/4 mx-auto'>
        <InlineCurrentOrders />
      </div>

      {!isStoreOpen &&
        <div className='w-full md:w-3/4 lg:w-2/4 xl:w-1/4 mx-auto'>
          <div className='bg-red-100 border-red-200 border-2 p-2 rounded-md text-center flex gap-2'>
            <IoWarning size={24} className='text-red-500' />
            <div>
              <p className="text-slate-600 text-lg font-semibold text-left">
                { 'El establecimiento está cerrado' }
              </p>
              <p className="text-slate-600 text-left">{ 'Podrás completar tu orden cuando el establecimiento vuelva a abrir' }</p>
            </div>
          </div>
        </div>
      }

      <CartContainer>
        <h1 className='text-3xl text-slate-700 text-center font-semibold'>Cart</h1>
        <div className='flex w-full gap-4 justify-end items-center'>
          <div className='text-blue-500 rounded-full p-2 hover:text-blue-600 hover:bg-slate-200'>
            <Link href='/store'>
              <FaStore size={26} />
            </Link>
          </div>
        </div>

        <CartItemsList />

        {/* <pre className='text-wrap bg-slate-200 rounded-md p-2 text-slate-600 text-xs'>{JSON.stringify(cartItems, null, 2)}</pre>
        <pre className='text-wrap bg-slate-200 rounded-md p-2 text-slate-600 text-xs'>{JSON.stringify(currentOrders, null, 2)}</pre> */}
      </CartContainer>
    </section>
  )
}

export default CartSection;