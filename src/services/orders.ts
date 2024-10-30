import { Order, OrderStatus } from "@/types";
import prisma from "../../prisma/client"

import { Order as SysOrder } from '@prisma/client';

const randomChar = (str: string) => str[Math.floor(Math.random() * str.length)];

const generateCode = () => {
  const randomLetter = () => randomChar('ABCDEFGHIJKLMNOPQRSTUVWXYZ');
  const randomNumber = () => randomChar('0123456789');
  return `${randomLetter()}${randomLetter()}${randomLetter()}-${randomNumber()}${randomNumber()}${randomNumber()}`;
};

type OrderArg = Omit<Order, 'id' | 'publicId' | 'status' | 'createdAt' | 'updatedAt'>;

const createOrder = async (order: OrderArg): Promise<SysOrder> => {
  const now = new Date().toISOString();
  return prisma.order.create({
    data: {
      cartDetails: order.cartDetails,
      deliverInfo: "1",
      publicId: generateCode(),
      status: 'PENDING',
      total: order.total,
      createdAt: now,
      updatedAt: now,
    }
  })
  .catch((error) => {
    console.error('Error creating order:', error);
    throw error;
  });
}

const getOrderById = async (id: string) => {
  return prisma.order.findUnique({
    where: {
      id
    }
  })
}

interface GetOrderFilters {
  status?: string;
}

const getOrders = async (filters?: GetOrderFilters): Promise<Order[]> => {
  const found = await prisma.order.findMany({
    where: filters ? {
      status: filters.status,
    } : {},
  });

  return found.map((order) => ({
    id: order.id,
    publicId: order.publicId,
    status: order.status as OrderStatus,
    total: order.total,
    cartDetails: order.cartDetails,
    createdAt: order.createdAt.toISOString(),
    updatedAt: order.updatedAt.toISOString(),
  }));
}

export {
  createOrder,
  getOrderById,
  getOrders,
}
