import { CartItem, Product, ProductExtra } from "@/types";

const getPricesFromExtras = (cartItem: CartItem, extras: ProductExtra[]) => {
  const { addedExtras } = cartItem;

  const extraPrices: number[] = addedExtras.map(addedExtraId => {
    const [, eId] = addedExtraId.split(':');
    const extra = extras.find(e => e.id === eId);
    return extra?.price || 0;
  });

  return extraPrices;
};

const getProductPriceWithExtras = (product: Product, cartItem: CartItem, storeExtras: ProductExtra[]) => {
  const extraPrices = getPricesFromExtras(cartItem, storeExtras);
  const totalPrice = product.price + extraPrices.reduce((acc, price) => acc + price, 0);
  const total = totalPrice * cartItem.quantity;
  return total;
}

export {
  getProductPriceWithExtras,
  getPricesFromExtras
};