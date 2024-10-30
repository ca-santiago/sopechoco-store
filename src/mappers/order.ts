import { Order as DBOrder } from "@prisma/client";
import { Order, OrderStatus } from "@/types";

const dbToDomain = (order: DBOrder): Order => {
  return {
    id: order.id,
    publicId: order.publicId,
    status: order.status as OrderStatus,
    total: order.total,
    cartDetails: order.cartDetails,
    createdAt: order.createdAt.toISOString(),
    updatedAt: order.updatedAt.toISOString(),
  };
}

const OrderMapper = {
  dbToDomain,
}

export default OrderMapper;
