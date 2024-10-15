'use client';

import React from 'react'
import { CartItem, Product, PRODUCT_STATUS } from '../../types';
import { useStoreCart } from '../../stores/cart';
import ProductCard from '../../components/products/product-cart';
import ProductBuilder from '../../components/products/product-builder';
import { useLocalStorage } from '@/hooks/useStorage';
import { BiSolidLeftArrowCircle } from 'react-icons/bi';
import CartInlineSummary from '@/components/cart/cart-inline-summary';

import { __extras, __products } from '@/mocks/store';

function Page() {
  const { items, products } = useStoreCart();
  const initCart = useStoreCart(s => s.init);

  const [cartItems, setStorage] = useLocalStorage<CartItem[]>('cartItems', []);
  const [selectedProduct, setSelectedProduct] = React.useState<Product | null>(null);

  React.useEffect(() => {
    initCart({
      items: cartItems,
      extras: __extras,
      products: __products,
    });
  }, []); // eslint-disable-line

  React.useEffect(() => {
    console.log('Setting storage');
    setStorage(items);
  }, [items.length, setStorage]);

  React.useEffect(() => {
    setSelectedProduct(null);
  }, [items.length]);

  return (
    <div className='text-slate-800 bg-slate-50 h-screen'>
      <div className='h-12 shadow-md bg-white w-full flex items-center justify-center'>
        <h1 className='text-3xl text-slate-700 text-center font-semibold p-4'>Products</h1>
      </div>

      <section className='w-full md:w-2/4 lg:w-2/5 xl:w-1/4 mx-auto gap-x-4 grid grid-cols-1 px-5 mt-10 gap-y-4'>

        {items.length > 0 &&
          <div className=' bg-blue-50 w-full border-2 border-slate-200 text-slate-600 p-2 rounded-md'>
            <CartInlineSummary />
          </div>
        }

        {!selectedProduct &&
          <div className='grid col-start-1 col-span-1'>
            <div className='flex flex-col gap-4'>
              {products.filter(p => p.status === PRODUCT_STATUS.ACTIVE).map((product) => (
                <ProductCard
                  key={product.id}
                  data={product}
                  onAddToCart={() => setSelectedProduct(product)}
                />
              ))}
            </div>

            {/* <pre className='text-wrap mt-4'>{JSON.stringify(items, null, 2)}</pre> */}
          </div>
        }

        {selectedProduct &&
          <div>
            <button onClick={() => setSelectedProduct(null)} className='text-slate-500'>
              <BiSolidLeftArrowCircle size={28} />
            </button>
            <div className='grid col-start-1 col-span-1 bg-white border-2 border-slate-200 rounded-md px-3 py-2'>
              <ProductBuilder key={selectedProduct.id} productData={selectedProduct} />
            </div>
          </div>
        }
      </section>
    </div>
  )
}

export default Page
