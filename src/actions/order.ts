'use server'

import { serializeCart } from "@/helpers/cart";
import { getProductPriceWithExtras } from "@/helpers/product";
import { createOrder } from "@/services/orders";
import { getProductsById } from "@/services/product";
import { getProductExtrasById } from "@/services/product-extra";
import { CartItem, Order } from "@/types";

async function setOrder(cartItems: CartItem[]): Promise<Order> {
  const cartDetails = serializeCart(cartItems);

  const producIds = cartItems.map(item => item.productId);
  const extrasIds = new Set(
    cartItems.map(item => item.addedExtras).flat()
  );

  const products = await getProductsById(...producIds);
  const extras = await getProductExtrasById(Array.from(extrasIds));

  const itemPrices = cartItems.map(item => {
    const product = products.find(p => p.id === item.productId);
    if (!product) {
      throw new Error(`Product with id ${item.productId} not found`);
    };

    return getProductPriceWithExtras(product, item, extras);
  });

  const cartPrice = itemPrices.reduce((acc, price) => acc + price, 0);

  const order = await createOrder({
    cartDetails,
    total: cartPrice,
  });

  return {
    ...order,
    createdAt: order.createdAt.toISOString(),
    updatedAt: order.createdAt.toISOString(),
  };
}

export {
  setOrder
}

