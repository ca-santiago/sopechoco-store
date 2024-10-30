import React from 'react';

import { deserializeCart } from '@/helpers/cart';
import { Order } from '@/types';
import { useManagerStore } from '@/stores/manager';
// import QuantitySelector from '../quantity-selector';

interface Props {
  order: Order;
}

function OrderDetailsCard(props: Props) {
  const { order } = props;
  const cartItems = React.useMemo(() => deserializeCart(order.cartDetails), [order.cartDetails]);
  // const deliveryDetails = deserializeDeliveryDetails(order.cartDetails); // TODO

  const products = useManagerStore(s => s.products);
  const extras = useManagerStore(s => s.extras);

  const orderItems = React.useMemo(() => cartItems.map(
    cartItem => {
      const product = products.find(p => p.id === cartItem.productId)!; // TODO: handle this better
      return {
        cartItem,
        product,
      };
    }
  ), [cartItems, products]);

  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    setLoading(true);
    const timeout = setTimeout(() => {
      setLoading(false);
    }, 1000);
    return () => clearTimeout(timeout);
  }, []);

  if (loading) {
    return (
      <div className='h-full w-full animate-pulse bg-gray-100 rounded-md' />
    ) 
  }

  return (
    <div className='text-wrap h-full w-full bg-white border-2 border-slate-200 p-3 rounded-md overflow-hidden flex gap-4 justify-between flex-col'>
      <h3 className='text-wrap text-ellipsis'>{order.publicId}</h3>

      <div className='grid grid-cols-[auto,1fr] auto-rows-auto gap-x-2 gap-y-2'>
        {orderItems.map(({ product, cartItem }) => (
          <div key={cartItem.itemId} className='grid gap-x-2 justify-start items-center grid-cols-subgrid grid-rows-2 row-span-1 col-span-2'>
            <div className='grid grid-cols-subgrid col-span-2'>
              <p className='text-slate-900 col-start-1'>- {product.name}</p>
              <p className='font-semibold text-slate-800 text-sm col-start-2 text-end'>x{ cartItem.quantity }</p>
            </div>
            <div className='ml-4 text-slate-500'>
              { cartItem.addedExtras.map(extId => {
                const [, extraId, quantity] = extId.split(':');
                const extra = extras.find(e => e.id === extraId);

                if (!extra) return null;
                return (
                  <div>
                    <p key={extraId} className='text-xs'>- {extra?.name} x{quantity}</p>
                  </div>
                );
              }).filter(Boolean) }
            </div>
          </div>
        ))}
      </div>

      {/* DEBUG INFO */}
{/*       
      <div className='p-2 rounded-md bg-slate-200'>
        <pre className='text-xs text-slate-600'>{JSON.stringify(cartItems, null, 2)}</pre>
      </div>
      
      <div className='p-2 rounded-md bg-slate-200 mt-4'>
        <pre className='text-xs text-slate-600'>{JSON.stringify(orderItems, null, 2)}</pre>
      </div> */}

      <div className='flex justify-between'>
        <p>${order.total}</p>
        <div className='px-2 py-1 bg-gray-200 text-slate-700 font-semibold text-xs w-fit rounded-full'>
          <p>{order.status}</p>
        </div>
      </div>
    </div>
  );
}

export default OrderDetailsCard;
