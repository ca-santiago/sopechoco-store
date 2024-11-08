import React from 'react';

import { deserializeCart } from '@/helpers/cart';
import { CartItem, Order, Product, ProductExtra } from '@/types';
import { useManagerStore } from '@/stores/manager-provider';
import { acceptOrder, rejectOrder, setOrderPending } from '@/actions/order';
import { CgSpinner } from 'react-icons/cg';
import { BiUser } from 'react-icons/bi';

interface Props {
  order: Order;
}

function OrderCartItemDetails(props: { cartItem: CartItem, product: Product, extras: ProductExtra[] }) {
  const {
    cartItem,
    product,
    extras,
  } = props;

  return (
    <div
      key={cartItem.itemId}
      className='grid gap-y-1 justify-start items-center grid-cols-subgrid grid-rows-[auto,auto] row-span-1 col-span-2 px-2 py-1 rounded-md bg-[rgb(231,232,235)]'
    >
      <div className='grid grid-cols-subgrid col-span-2'>
        <p className='text-slate-700 col-start-1'>• {product.name}</p>
        { cartItem.quantity > 1 && <p className='font-semibold text-slate-800 text-sm col-start-2 text-end'>x{cartItem.quantity}</p> }
      </div>

      <div className='ml-2 text-slate-500 grid col-span-2'>
        {/* TODO: Render extraOption title here, need a component to handle this logic out of JSX */}
        {cartItem.addedExtras.map(extId => {
          const [sectionId, extraId, quantity] = extId.split(':');
          const extra = extras.find(e => e.id === extraId);
          const extraOption = product.extras.find(extraSec => extraSec.id === sectionId);
          if (!extra || !extraOption) return null;

          return (
            <div key={extraId} className='grid grid-cols-[1fr,auto] col-span-2'>
              <p className='text-xs col-start-1'>
                { extra.name }
              </p>
              { Number(quantity) > 1 &&
                <p className='text-xs text-slate-600 col-start-2'>
                  { 'x' + quantity }
                </p>
              }
            </div>
          );
        }).filter(Boolean)}
      </div>

      { cartItem.additionalInstructions &&
        <div className='col-span-2 mt-1'>
          <p className='text-slate-500 text-sm flex gap-1 items-center select-none cursor-pointer'>
            <span>
              <BiUser />
            </span>
            {cartItem.additionalInstructions?.substring(0, 50)}...
          </p>
        </div>
      }

    </div>
  );
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

  const [processing, setProcessing] = React.useState(false);

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

  return (
    <div className='text-wrap h-full w-full bg-white border-2 border-slate-200 p-3 pt-2 rounded-md overflow-hidden flex gap-4 justify-between flex-col'>
      <div className=''>
        <h3 className='text-wrap text-ellipsis text-slate-700 font-semibold text-lg'>{order.publicId}</h3>
        <div className='grid grid-cols-[auto,1fr] auto-rows-auto gap-x-2 gap-y-2 mt-2'>
          <p className='text-slate-700 font-semibold text-sm'>Products</p>
          {orderItems.map(({ product, cartItem }) => 
            <OrderCartItemDetails
              key={cartItem.itemId}
              cartItem={cartItem}
              product={product}
              extras={extras}
            /> 
          )}
        </div>

        {/* Delivery details section */}

      </div>

      <div className='flex justify-between items-center'>
        <p>${order.total}</p>

        {processing &&
          <CgSpinner size={24} className='animate-spin text-blue-500' />
        }
      </div>

      {/* DEV ONLY */}
      {order.status === 'ACCEPTED' && !processing &&
        <button
          onClick={revertToPending}
          className='text-white rounded-full py-1 bg-yellow-500'
        >
          Revert
        </button>
      }

      {isPending && !processing &&
        <div className='grid grid-cols-2 rounded-md overflow-hidden'>
          <button
            onClick={handleAcceptOrder}
            className='text-white px-2 py-1 bg-blue-500 hover:bg-blue-600 col-span-1 col-start-1'
          >
            Accept
          </button>
          <button
            onClick={handleRejectOrder}
            className='text-white px-2 py-1 bg-red-500 hover:bg-red-600 col-span-1 col-start-2'
          >
            Reject
          </button>
        </div>
      }
    </div>
  );
}

export default OrderDetailsCard;
