'use client'

import React from 'react'
import { useStoreCart } from '../../stores/cart';
import { CartItem, CartProductMapping, Product, PRODUCT_STATUS } from '../../types';
import { useLocalStorage } from '@/hooks/useStorage';
import { PiWarningCircleLight } from 'react-icons/pi';
import { __extras, __products } from '@/mocks/store';
import ProductCartCard from '@/components/cart/cart-item-card';
import { getProductPriceWithExtras } from '@/helpers/product';
import ProductBuilder from '../../components/products/product-builder';
import CartContainer from './container';
import { FaStore } from 'react-icons/fa6';
import Link from 'next/link';
import { BiSolidLeftArrowCircle } from 'react-icons/bi';

function CartPage() {
  const [storageItems, setStorage] = useLocalStorage<CartItem[]>('cartItems', []);
  const init = useStoreCart(s => s.init);
  const items = useStoreCart(s => s.items);

  React.useEffect(() => {
    init({
      items: storageItems,
      products: __products,
      extras: __extras,
    });
  }, []); // eslint-disable-line

  React.useEffect(() => {
    setStorage(items);
  }, [items, setStorage]);

  const cartItems = useStoreCart(s => s.items);
  const storeProducts = useStoreCart(s => s.products);
  const storeExtras = useStoreCart(s => s.extras);
  const removeCartItem = useStoreCart(s => s.removeFromCart);

  const [selectedItem, setSelectedItem] = React.useState<CartProductMapping | null>(null);


  const cartProducts = React.useMemo(() => {
    return cartItems.reduce((acc, cartItem) => {
      const productFound = storeProducts.find(p => p.id === cartItem.productId);

      if (productFound) {
        acc.push({ product: productFound, cartItem });
      }

      return acc;
    }, [] as CartProductMapping[]);
  }, [storeProducts, cartItems]);

  const cartTotalPrice = React.useMemo(() => {
    return cartProducts.reduce((acc, item) => {
      const { cartItem, product } = item;

      acc += getProductPriceWithExtras(product, cartItem, storeExtras);

      return acc;
    }, 0);
  }, [cartProducts, storeExtras]);

  const allProductsAvailable = cartProducts.every(({ product }) => product.status === PRODUCT_STATUS.ACTIVE);
  const canCheckout = allProductsAvailable;

  const handleEdit = React.useCallback((product: Product, cartItem: CartItem) => {
    setSelectedItem({
      cartItem,
      product,
    });
  }, []);

  const handleRemoveFromCart = React.useCallback((cartItem: CartItem) => {
    removeCartItem(cartItem.itemId);
  }, [removeCartItem]);

  if (selectedItem) {
    return (
      <CartContainer>
        <button onClick={() => setSelectedItem(null)} className='text-slate-500'>
          <BiSolidLeftArrowCircle size={28} />
        </button>
        <ProductBuilder
          productData={selectedItem.product}
          cartItem={selectedItem.cartItem}
        />
      </CartContainer>
    );
  }

  return (
    <CartContainer>
      <h1 className='text-3xl text-slate-700 text-center font-semibold'>Cart</h1>

      <div className='flex w-full gap-4 justify-end'>
        <div className='text-blue-500 rounded-full p-2 hover:text-blue-600 hover:bg-slate-200'>
          <Link href='/store'>
            <FaStore size={26} />
          </Link>
        </div>
      </div>

      <ul className='flex flex-col gap-2'>
        {cartProducts.map(({ cartItem, product }) => (
          <li key={cartItem.itemId}>
            <ProductCartCard
              cartItem={cartItem}
              product={product}
              onEditClick={() => handleEdit(product, cartItem)}
              onDeleteClick={() => handleRemoveFromCart(cartItem)}
            />
          </li>
        ))}
      </ul>

      {!canCheckout &&
        <p className='text-red-500 text-sm w-full flex justify-end items-center gap-1'>
          <PiWarningCircleLight />
          Platillos no disponibles
        </p>
      }

      <div className='flex justify-end gap-4 items-center'>
        <button
          disabled={!canCheckout}
          className='px-2 py-1 rounded-md bg-blue-500 text-white disabled:bg-slate-300'
        >
          Ordenar
        </button>
        <p className='text-slate-700 font-semibold'>
          {`Total: \$${cartTotalPrice}`}
        </p>
      </div>

      <pre className='text-wrap bg-slate-200 rounded-md p-2 text-slate-600 text-xs'>{JSON.stringify(cartItems, null, 2)}</pre>
    </CartContainer>
  )
}

export default CartPage
