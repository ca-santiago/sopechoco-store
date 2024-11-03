import Link from 'next/link';
import React from 'react'
import { useStoreCart } from '@/stores/cart';
import { FaCartShopping } from 'react-icons/fa6';
import { HiOutlineChevronRight } from 'react-icons/hi';

function CartInlineSummary() {
  const {
    items,
  } = useStoreCart();

  return (
    <div className='flex gap-3 justify-between'>
      <div className='flex items-center justify-center gap-2'>
        <div className='h-5 w-5 animate-bounce-once' key={items.length} >
          <FaCartShopping className='h-full w-full' />
        </div>
        <p className='text-slate-600 font-semibold'>{items.length}</p>
      </div>
      <div>
        <Link href='/cart' className='text-nowrap flex items-center gap-1 text-blue-500 hover:underline'>
          <p className='text-nowrap'>Ver carrito</p>
          <HiOutlineChevronRight size={22} className='mt-0.5 hover:underline' />
        </Link>
      </div>
    </div>
  );
}

export default CartInlineSummary