'use client';

export const PRODUCT_STATUS = {
  DRAFT: 'draft',
  ACTIVE: 'active',
  INACTIVE: 'inactive',
  DELETED: 'deleted',
};

export interface ProductExtra {
  id: string;
  name: string;
  price: number;
  description: string;
}

export interface ProductExtraOption {
  id: string;
  title: string;
  description?: string;
  extrasId: string[];
  min: number;
  max: number;
  multiSelect: boolean;
  countLimit: number;
}

export interface Product {
  id: string;
  name: string;
  price: number;
  description: string;

  images: string[];

  limit?: number;
  status: (typeof PRODUCT_STATUS)[keyof typeof PRODUCT_STATUS];
  inventoryQuantity?: number;

  extras: ProductExtraOption[];
}

// Product builder types

export interface ProductExtraSelection {
  // [key: string]: ProductExtra[];
  [key: string]: string[];
}


// Cart types

export type CartProductMapping = {
  product: Product;
  cartItem: CartItem;
};

export interface CartItem {
  itemId: string;
  productId: string;
  addedExtras: string[];
  quantity: number;
}

export interface Cart {
  products: Product[];
  extras: ProductExtra[];
  items: CartItem[];
  addCartItem: (item: CartItem) => void;
  // @deprecated
  addToCart: (product: Product) => void;
  removeFromCart: (itemId: string) => void;
  addExtraToProduct: (product: Product, extra: ProductExtra, extraOptionId: string) => void;
  removeExtraFromProduct: (product: Product, extra: ProductExtra, extraOptionId: string) => void;

  // Initializers
  setCartItems: (items: CartItem[]) => void;
  setProducts: (products: Product[]) => void;
  setExtras: (extras: ProductExtra[]) => void;
  init: (cart: Partial<Cart>) => void;
}
