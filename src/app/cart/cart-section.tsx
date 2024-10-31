'use client';

import InlineCurrentOrders from "@/components/orders/inline-orders";
import CartContainer from "./container";
import { FaStore } from "react-icons/fa6";
import Link from "next/link";
import CartItemsList from "@/components/cart/cart-items-list";
import { useStoreCart } from "@/stores/cart";

function CartSection() {
  const cartItems = useStoreCart(s => s.items);
  const currentOrders = useStoreCart(s => s.currentOrders);

  return (
    <section className="flex flex-col gap-6 py-8 bg-slate-50 min-h-screen">
      <div className='w-full md:w-3/4 lg:w-2/4 xl:w-1/4 mx-auto'>
        <InlineCurrentOrders />
      </div>
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

        <pre className='text-wrap bg-slate-200 rounded-md p-2 text-slate-600 text-xs'>{JSON.stringify(cartItems, null, 2)}</pre>
        <pre className='text-wrap bg-slate-200 rounded-md p-2 text-slate-600 text-xs'>{JSON.stringify(currentOrders, null, 2)}</pre>
      </CartContainer>
    </section>
  )
}

export default CartSection;