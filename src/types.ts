'use client';


export type ProductStatus = 'ACTIVE' | 'INACTIVE' | 'DELETED';

export const PRODUCT_STATUS: { [key in ProductStatus]: key } = {
  ACTIVE: 'ACTIVE',
  INACTIVE: 'INACTIVE',
  DELETED: 'DELETED',
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
  status: ProductStatus;
  inventoryQuantity?: number;

  extras: ProductExtraOption[];
}

// Product builder types

export type ExtraSelectionString = string; // extraOptionId:extraId:amount

export interface ExtraSelectionMap {
  amount: number;
  extraId: string;
};


// Cart types

export type CartProductMapping = {
  product: Product;
  cartItem: CartItem;
};

export interface CartItem {
  itemId: string;
  additionalInstructions?: string;
  productId: string;
  addedExtras: string[];
  quantity: number;
}

export interface StoreCart extends Cart {
  products: Product[];
  extras: ProductExtra[];
  currentOrders: OrderSummary[];

  isStoreOpen: boolean;

  addCartItem: (item: CartItem) => void;

  // Initializers
  setCartItems: (items: CartItem[]) => void;
  setProducts: (products: Product[]) => void;
  setExtras: (extras: ProductExtra[]) => void;
  setCurrentOrders: (orders: OrderSummary[]) => void;
  cleanCurrentOrders: () => void;
  init: (cart: Partial<StoreCart>) => void;

  // @deprecated
  addToCart: (product: Product) => void;
  removeFromCart: (itemId: string) => void;
  addExtraToProduct: (product: Product, extra: ProductExtra, extraOptionId: string) => void;
  removeExtraFromProduct: (product: Product, extra: ProductExtra, extraOptionId: string) => void;
}

export interface Cart {
  items: CartItem[];
}


// Order types

export interface Order {
  id: string;
  publicId: string;
  status: OrderStatus;
  cartDetails: string;
  total: number;
  createdAt: string;
  updatedAt: string;
}

export type OrderStatus = 'PENDING' | 'ACCEPTED' | 'COMPLETED' | 'CANCELLED' | 'REJECTED' | 'REFUNDED';

export interface OrderItem {
  id: string;
  total: number;
  productDetail: ProductOrderDetail;
  extraDetails: ExtraDetail[];
}

export interface ProductOrderDetail {
  title: string;
  price: number;
  quantity: number;
  userInstructions?: string;
}

export interface ExtraDetail {
  title: string;
  price: number;
}

// Local storage types

export interface OrderSummary {
  orderId: string;
  publicId: string;
  status: string;
  total: number;
  createdAt: string;
}

export interface ManagerStore extends ManagerStoreActions, ManagerStoreState { }

export interface ManagerStoreState {
  orders: Order[];
  products: Product[];
  extras: ProductExtra[];
  isStoreOpen: boolean;
  // storeInformation: 
}

export interface ManagerStoreActions {
  setOrders: (orders: Order[]) => void;
  setIsOpen: (isOpen: boolean) => void;
  updateOrderInfo: (order: Order) => void;
  init: (store: Partial<ManagerStore>) => void;
}

export interface StoreInfo {
  name: string;
  description: string;
  address: string;
  phone: string;
  email: string;
  logo: string;
}