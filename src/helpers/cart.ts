import { CartItem } from "@/types";

function serializeCart(cartItems: CartItem[]): string {
  try {
    return JSON.stringify(cartItems);
  } catch (error) {
    console.error(error);
    throw new Error('Error serializing cart');
  }
}

function deserializeCart(cartDetails: string): CartItem[] {
  try {
    return JSON.parse(cartDetails);
  } catch (error) {
    console.error(error);
    throw new Error('Error deserializing cart');
  }
}

export {
  serializeCart,
  deserializeCart,
}
