import { CartItem, ExtraSelectionMap, ExtraSelectionString, Product, ProductExtra } from "@/types";

const getPricesFromExtras = (cartItem: CartItem, extras: ProductExtra[]) => {
  const { addedExtras } = cartItem;

  const extraPrices: number[] = addedExtras.map(addedExtraId => {
    const [, eId, quantity] = addedExtraId.split(':');
    const extra = extras.find(e => e.id === eId);
    return extra ? extra.price * Number(quantity) : 0;
  });

  return extraPrices;
};

const getProductPriceWithExtras = (product: Product, cartItem: CartItem, storeExtras: ProductExtra[]): number => {
  const extraPrices = getPricesFromExtras(cartItem, storeExtras);
  const totalPrice = product.price + extraPrices.reduce((acc, price) => acc + price, 0);
  const total = totalPrice * cartItem.quantity;
  return total;
}

function selectionStringToExtraSelection(str: ExtraSelectionString): ExtraSelectionMap {
  const [,extraId, amount] = str.split(':');
  return {
    extraId,
    amount: parseInt(amount),
  };
}

export {
  getProductPriceWithExtras,
  getPricesFromExtras,
  selectionStringToExtraSelection,
};