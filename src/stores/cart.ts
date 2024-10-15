import { create } from "zustand";
import { Cart, CartItem, Product } from "../types";
import { v4 } from "uuid";

const useStoreCart = create<Cart>(set => ({
  products: [],
  extras: [],
  items: [],
  addCartItem: (item: CartItem) => {
    set(state => {
      const existingItem = state.items.findIndex(i => i.itemId === item.itemId);

      if (existingItem > -1) {
        console.log('Updating');
        return {
          items: state.items.map(i => {
            if (i.itemId === item.itemId) {
              return item;
            }
            return i;
          }),
        }
      } else {
        console.log('Pusing');
        state.items.push({ ...item });
      }

      return { items: state.items };
    });
  },
  addToCart: (product: Product) => {
    set(state => {
      const productDefinition = state.products.find(p => p.id === product.id);
      if (!productDefinition) return state;

      const item = state.items.find(i => i.productId === product.id);

      // if item already exists in the cart, increment the quantity
      if (item) {
        // if the product has a limit and the quantity is equal or greater than the limit, do nothing
        if (productDefinition.limit && item.quantity >= productDefinition.limit) {
          return state;
        }
        item.quantity += 1;
      } else {
        state.items.push({ itemId: v4(), productId: product.id, quantity: 1, addedExtras: [] });
      }

      return { items: state.items };
    });
  },
  removeFromCart: (id: string) => {
    set(state => {
      const item = state.items.find(i => i.itemId === id);

      if (item) {
        state.items = state.items.filter(i => i.itemId !== id);
      }

      return { items: state.items };
    });
  },
  addExtraToProduct: (product, extra, extOptionId) => {
    set(cart => {
      const item = cart.items.find(i => i.productId === product.id);

      if (!item) {
        return { items: cart.items };
      }
      
      item.addedExtras.push(`${extOptionId}:${extra.id}`);


      return { items: cart.items };
    });
  },
  removeExtraFromProduct: (product, extra, extOptId) => {
    set(cart => {
      const item = cart.items.find(i => i.productId === product.id);

      if (!item) return { items: cart.items };

      item.addedExtras = item.addedExtras.filter(id => {
        const [optionId, extraId] = id.split(':');
        console.log(id, `${optionId}:${extraId}`);
        const isSame = optionId === extOptId && extraId === extra.id;
        console.log({ isSame });
        return !isSame;
      });

      return { items: cart.items };
    });
  },
  setCartItems: (items) => {
    set({ items });
  },
  setProducts: (products) => {
    set({ products });
  },
  setExtras: (extras) => {
    set({ extras });
  },
  init: (cart) => {
    set(cart);
  }
}));

export { useStoreCart };
