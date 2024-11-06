import { deserializeCart } from "@/helpers/cart";
import { OrderStatusToNaturalLanguage } from "@/helpers/status";
import { CartItem, Order, Product } from "@/types";
import { BsClockFill } from "react-icons/bs";
import { PiUserList } from "react-icons/pi";

import moment from "moment";
import { useClientStore } from "@/stores/client-provider";

interface Props {
  order: Order;
}

function InlineOrderStatus(props: Props) {
  const { order } = props;
  const products = useClientStore(s => s.products);

  const cartDetails = deserializeCart(order.cartDetails);

  const renderProductInfo = (p: Product, cartItem: CartItem) => {
    return (
      <li key={cartItem.itemId} className="flex flex-col gap-1 justify-between">
        <span className="text-slate-800">• { p.name }</span>

        { cartItem.additionalInstructions &&
          <div className="flex items-center gap-2 ml-2">
            <PiUserList  className="text-slate-600" />
            <span className="text-slate-500 text-sm">{ cartItem.additionalInstructions }</span>
          </div>
        }
      </li>
    );
  }

  return (
    <div className="p-4 bg-white border-2 border-slate-300 rounded-md">
      <div className="mb-4">
        <h3 className="text-lg text-slate-800 font-semibold">
          { order.publicId}
        </h3>

        <ul className="list-disc list-inside mt-2">
          {cartDetails.map(cartItem => {
            const product = products.find(p => p.id === cartItem.productId);
            return product ? renderProductInfo(product, cartItem) : null;
          })}
        </ul>
      </div>

      <div className="mb-4">
        { OrderStatusToNaturalLanguage(order.status) }
      </div>

      <div className="flex justify-between mt-4">
        <div className="text-slate-500 flex gap-2 items-center justify-center">
          <span>
            <BsClockFill size={15} />
          </span>
          {moment(order.createdAt).fromNow()}
        </div>

        <div className="font-semibold text-slate-700">
          ${order.total}
        </div>
      </div>

      {/* <div className="mt-4">
        <pre className="bg-gray-100 text-slate-600 p-2 rounded text-wrap">{JSON.stringify({ order, cartDetails}, null, 2)}</pre>
      </div> */}
    </div>
  );
}

export default InlineOrderStatus;
