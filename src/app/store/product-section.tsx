'use client';

import CartInlineSummary from "@/components/cart/cart-inline-summary";
import InlineCurrentOrders from "@/components/orders/inline-orders";
import ProductBuilder from "@/components/products/product-builder";
import ProductCard from "@/components/products/product-cart";
import { useStoreCart } from "@/stores/cart";
import { Product, PRODUCT_STATUS } from "@/types";
import React from "react";
import { BiSolidLeftArrowCircle } from "react-icons/bi";

function ProductSection() {
  const cartItems = useStoreCart(s => s.items);
  const products = useStoreCart(s => s.products);
  const isStoreOpen = useStoreCart(s => s.isStoreOpen);

  const [selectedProduct, setSelectedProduct] = React.useState<Product | null>(null);

  React.useEffect(() => {
    setSelectedProduct(null);
    console.log('Cart items len changed')
  }, [cartItems.length]);

  return (
    <section className='w-full  gap-x-4 grid grid-cols-1 gap-y-4'>
      <InlineCurrentOrders />

      { !isStoreOpen &&
        <div className='bg-red-50 w-full border-2 border-red-200 text-red-600 p-2 rounded-md'>
          <h3 className='text-red-800'>Store is closed</h3>
        </div>
      }

      { cartItems.length > 0 &&
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

      <pre className='text-wrap bg-slate-200 rounded-md p-2 text-slate-600 text-xs'>{JSON.stringify(cartItems, null, 2)}</pre>
    </section>
  )
}

export default ProductSection;