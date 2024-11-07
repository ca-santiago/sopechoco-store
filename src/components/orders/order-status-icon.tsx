
import { OrderStatus } from "@/types";
import { CgSpinner } from "react-icons/cg";
import { GiCancel } from "react-icons/gi";
import { MdDone } from "react-icons/md";
import { PiCookingPot } from "react-icons/pi";


function OrderStatusIcon({ status }: { status: OrderStatus }) {
  switch (status) {
    case "PENDING":
      return (
        <span className="text-slate-500">
          <CgSpinner />
        </span>
      );
    case "ACCEPTED":
      return (
        <span className="text-green-500">
          <PiCookingPot />
        </span>
      );
    case "REJECTED":
      return (
        <span className="text-red-500">
          <GiCancel />
        </span>
      );
    case "COMPLETED":
      return (
        <span className="text-green-500">
          <MdDone />
        </span>
      );
    case "CANCELLED":
      return (
        <span className="text-red-500">
          <GiCancel />
        </span>
      );
    default:
      return <span className="text-slate-500">•</span>;
  }
};

export default OrderStatusIcon;
