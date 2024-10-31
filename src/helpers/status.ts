import { OrderStatus } from "@/types";

function OrderStatusToNaturalLanguage(status: OrderStatus): string {
  switch (status) {
    case 'PENDING':
      return "Orden pendiente";
    case 'CANCELLED':
      return "Orden cancelada";
    case 'ACCEPTED':
      return "El establecimiento está preparando tu orden";
    case 'COMPLETED':
      return "Tu orden está lista para ser recogida";
    case 'REJECTED':
      return "El establecimiento ha rechazado tu orden";
    default:
      return "Unknown";
  }
}

export {
  OrderStatusToNaturalLanguage
}