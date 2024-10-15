import React from "react";

import { CartItem, Product, PRODUCT_STATUS, ProductExtra } from "@/types";
import { useStoreCart } from "@/stores/cart";

import { FaPen, FaTrash } from "react-icons/fa6";
import { getProductPriceWithExtras } from "@/helpers/product";

interface ProductCartCardProps {
  product: Product;
  cartItem: CartItem;
  onEditClick: () => void;
  onDeleteClick: () => void;
}

function ProductCartCard(props: ProductCartCardProps) {
  const {
    product,
    cartItem,
    onEditClick,
    onDeleteClick,
  } = props;
  
  const storeExtras = useStoreCart(s => s.extras);

  const foundExtras = React.useMemo<ProductExtra[]>(() => {
    return cartItem.addedExtras.reduce((acc, extra) => {
      const foundExtraDef = storeExtras.find(e => {
        const extraId = extra.split(':')[1];
        return e.id === extraId;
      });

      if (foundExtraDef) acc.push(foundExtraDef);

      return acc;
    }, [] as ProductExtra[]);
  }, [cartItem.addedExtras, storeExtras]);

  const productNotAvailable = product.status !== PRODUCT_STATUS.ACTIVE;

  const totalPrice = getProductPriceWithExtras(product, cartItem, storeExtras);

  return (
    <div className='p-2 border-2 border-slate-200 rounded-md bg-white flex gap-2'>
      <div className='w-14 h-auto bg-slate-200 rounded'/>

      <div className='flex flex-col gap-1 w-full ml-1'>
        <div className='flex flex-col'>
          <div className='flex justify-between items-center gap-2'>
            <h2 className='text-slate-800 font-semibold text-xl'>{product.name}</h2>
            <p className="text-slate-700 font-semibold text-sm">${product.price}</p>
          </div>
          { productNotAvailable &&
            <p className='text-red-400 text-xs'>
              Este producto no está disponible
            </p>
          }
        </div>

        <div className='flex flex-col'>
          {foundExtras.map(extra => (
            <div key={extra.id} className='flex justify-between'>
              <span className='text-slate-500 text-sm'>{extra.name}</span>
              <span className='text-slate-500 text-sm'>${extra.price}</span>
            </div>
          ))}
        </div>

        <div className='flex w-full justify-end items-center mt-3 gap-4'>
          <div className="flex gap-2 text-slate-500">
            <button onClick={ onEditClick }>
              <FaPen className="text-slate-600" />
            </button>
            <button onClick={ onDeleteClick }>
              <FaTrash className="text-red-400" />
            </button>
          </div>
          <span className='text-slate-800 font-semibold'>${ totalPrice }</span>
        </div>
      </div>
    </div>
  );
}

export default ProductCartCard;
