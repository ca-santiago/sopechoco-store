import { OrderStatus } from "@/types";

function OrderStatusToNaturalLanguage(status: OrderStatus, short?: boolean): string {
  switch (status) {
    case 'PENDING':
      return "Orden pendiente";
    case 'CANCELLED':
      return "Orden cancelada";
    case 'ACCEPTED':
      return short ? "Orden aceptada" : "El establecimiento está preparando tu orden";
    case 'COMPLETED':
      return short ? "Completada" : "Tu orden está lista para ser recogida";
    case 'REJECTED':
      return short ? "Rechazada" : "El establecimiento ha rechazado tu orden";
    default:
      return "Unknown";
  }
}

export {
  OrderStatusToNaturalLanguage
}