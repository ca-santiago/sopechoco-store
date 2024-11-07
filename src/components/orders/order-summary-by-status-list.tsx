import { OrderStatusToNaturalLanguage } from "@/helpers/status";
import { Order } from "@/types";
import { BsClockFill } from "react-icons/bs";

import cx from 'classnames';
import moment from "moment";
import OrderStatusIcon from "./order-status-icon";

interface Props {
  orders: Order[];
  onOrderClick?: (order: Order) => void;
}

function OrderSummaryByStatusList(props: Props) {
  const {
    orders,
    onOrderClick,
  } = props;

  const orderCardClasses = cx({
    'grid grid-rows-[auto,auto] grid-cols-[auto,auto] lg:grid-rows-1 lg:grid-cols-subgrid col-span-4': true,
    'gap-1 lg:gap-2 px-3 py-2 lg:p-3 bg-white border-2 border-slate-300 rounded-md justify-between items-center': true,
  });

  if (orders.length === 0) {
    return (
      <div className="flex flex-col gap-6">
        <div className="bg-slate-200 p-4 rounded-md w-full">
          <p className="text-slate-700 font-semibold">
            No hay ordenes activas
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-[auto,auto,auto,auto] gap-y-4 w-full">
      {orders.map(order =>
        <div
          key={order.id}
          className={orderCardClasses}
          onClick={() => onOrderClick?.(order)}
        >
          <h3 className="text-lg text-slate-800 font-semibold text-nowrap row-start-1 col-span-1">
            {order.publicId}
          </h3>

          <div className="flex gap-2 items-center row-start-2 lg:row-start-1 col-span-1">
            <OrderStatusIcon status={order.status} />
            <span className="text-slate-500">{OrderStatusToNaturalLanguage(order.status, true)}</span>
          </div>

          <div className="flex justify-between row-start-2 lg:row-start-1">
            <div className="text-slate-500 flex gap-2 items-center justify-center col-span-1">
              <span>
                <BsClockFill size={15} />
              </span>
              {moment(order.createdAt).fromNow()}
            </div>
          </div>

          <div className="font-semibold text-slate-700 row-start-1 sm:row-start-1 justify-self-end col-span-1">
            ${order.total}
          </div>

        </div>
      )}
    </div>
  );
}

export default OrderSummaryByStatusList;
