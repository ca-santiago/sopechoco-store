import React from 'react';

import { deserializeCart } from '@/helpers/cart';
import { Order } from '@/types';
import { useManagerStore } from '@/stores/manager';
import { acceptOrder, rejectOrder, setOrderPending } from '@/actions/order';
import { CgSpinner } from 'react-icons/cg';
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

  const updateOrder = useManagerStore(s => s.updateOrderInfo);

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
  const [processing, setProcessing] = React.useState(false);

  React.useEffect(() => {
    setLoading(true);
    const timeout = setTimeout(() => {
      setLoading(false);
    }, 1000);
    return () => clearTimeout(timeout);
  }, []);

  const handleAcceptOrder = () => {
    setProcessing(true);
    acceptOrder(order.id)
      .then(updateOrder)
      .catch(console.error)
      .finally(() => setProcessing(false));
  }

  const handleRejectOrder = () => {
    setProcessing(true);
    rejectOrder(order.id)
      .then(updateOrder)
      .catch(console.error)
      .finally(() => setProcessing(false));
  }

  const revertToPending = () => {
    setProcessing(true);
    setOrderPending(order.id)
      .then(updateOrder)
      .catch(console.error)
      .finally(() => setProcessing(false));
  }

  const isPending = order.status === 'PENDING';

  if (loading) {
    return (
      <div className='h-full w-full animate-pulse bg-gray-100 rounded-md' />
    )
  }

  return (
    <div className='text-wrap h-full w-full bg-white border-2 border-slate-200 p-3 rounded-md overflow-hidden flex gap-4 justify-between flex-col'>
      <h3 className='text-wrap text-ellipsis'>{order.publicId}</h3>

      <div className='grid grid-cols-[auto,1fr] auto-rows-auto gap-x-2 gap-y-2'>
        {orderItems.map(({ product, cartItem }) => {

          return (
            <div key={cartItem.itemId} className='grid gap-x-2 justify-start items-center grid-cols-subgrid grid-rows-2 row-span-1 col-span-2'>
              <div className='grid grid-cols-subgrid col-span-2'>
                <p className='text-slate-900 col-start-1'>- {product.name}</p>
                <p className='font-semibold text-slate-800 text-sm col-start-2 text-end'>x{cartItem.quantity}</p>
              </div>
              <div className='ml-4 text-slate-500'>
                {/* TODO: Render extraOption title here, need a component to handle this logic out of JSX */}
                {cartItem.addedExtras.map(extId => {
                  const [sectionId, extraId, quantity] = extId.split(':');
                  const extra = extras.find(e => e.id === extraId);
                  const extraOption = product.extras.find(extraSec => extraSec.id === sectionId);
                  if (!extra || !extraOption) return null;

                  const text = `- ${extra.name} ${extraOption.multiSelect ? 'x' + quantity : ''}`;
                  return (
                    <div>
                      <p key={extraId} className='text-xs'>
                        {text}
                      </p>
                    </div>
                  );
                }).filter(Boolean)}
              </div>
            </div>
          )
        })}
      </div>

      {/* DEBUG INFO */}
      {/*       
      <div className='p-2 rounded-md bg-slate-200'>
        <pre className='text-xs text-slate-600'>{JSON.stringify(cartItems, null, 2)}</pre>
      </div>
      
      <div className='p-2 rounded-md bg-slate-200 mt-4'>
        <pre className='text-xs text-slate-600'>{JSON.stringify(orderItems, null, 2)}</pre>
      </div> */}

      <div className='flex justify-between items-center'>
        <p>${order.total}</p>

        {!isPending &&
          <div className='px-2 py-1 bg-gray-200 text-slate-700 font-semibold text-xs w-fit rounded-full'>
            <p>{order.status}</p>
          </div>
        }

        {processing &&
          <CgSpinner size={24} className='animate-spin text-blue-500' />
        }

        {isPending && !processing &&
          <div>
            <button
              onClick={handleAcceptOrder}
              className='text-white rounded-l-full px-2 py-1 bg-blue-500'
            >Accept</button>
            <button
              onClick={handleRejectOrder}
              className='text-white rounded-r-full px-2 py-1 bg-red-500'
            >Reject</button>
          </div>
        }

        {/* DEV ONLY */}
        {order.status === 'ACCEPTED' && !processing &&
          <button
            onClick={revertToPending}
            className='text-white rounded-full px-2 py-1 bg-yellow-500'
          >Revert</button>
        }
      </div>
    </div>
  );
}

export default OrderDetailsCard;
