import { useStoreCart } from "@/stores/cart";
import Link from "next/link";

const InlineCurrentOrders = () => {
  const currentOrders = useStoreCart(s => s.currentOrders);

  if (!currentOrders.length) return null;

  if (currentOrders.length === 1) {
    return (
      <div className='px-2 py-1 bg-slate-200 rounded-md w-full'>
        <div className='flex gap-2 items-center'>
          <p className='text-slate-700 font-semibold'>
            1 orden en progreso:
          </p>
          <Link href='/orders'>
            <span className='text-blue-500 underline'>{currentOrders[0].publicId}</span>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className='px-3 py-2 bg-slate-200 rounded-md w-full'>
      <div className='flex gap-2 items-center justify-between h-full'>
        <p className='text-slate-700 font-semibold'>
          {currentOrders.length} ordenes en progreso:
        </p>
        <div className="flex gap-1 items-center h-full">
          <p className="text-slate-500 text-sm font-semibold">
            { currentOrders.reduce((acc, next) => `${acc} ${next.publicId}`, '') }
          </p>
        </div>
        <Link href='/orders'>
          <span className='text-blue-500 underline'>Ver</span>
        </Link>
      </div>
    </div>
  );
}

export default InlineCurrentOrders;