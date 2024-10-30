import React from "react";
import { Product } from "../../types";
import { BiPlus } from "react-icons/bi";

interface ProductCardProps {
  data: Product;
  onAddToCart: (product: Product) => void;
}

function ProductCard(props: ProductCardProps): React.JSX.Element {
  const {
    data: product,
    onAddToCart,
  } = props;

  const renderPrice = (multiplier: number = 1) => {
    if (product.price === 0) return null;
    return (
      <span className='text-slate-600'>${product.price * multiplier}</span>
    );
  }

  return (
    <div className='p-2 border-2 border-slate-200 rounded-md bg-white flex flex-col gap-3'>
      <div className='flex flex-col gap-1'>
        <h2 className='text-slate-700 font-semibold text-xl'>{product.name}</h2>
        <p className='text-slate-600 text-sm'>{product.description}</p>
      </div>
      <div className='flex w-full flex-row-reverse justify-between items-center'>
        {/* {isOnCart ? renderIncrementDecrement(isOnCart) : renderAddToCartButton()} */}
        <div>
          <button
            onClick={() => onAddToCart(product)}
            className='bg-red-500/80 hover:bg-red-500 text-white p-1 rounded-full'
            >
            <BiPlus />
          </button>
        </div>
        { renderPrice() }
      </div>
    </div>
  );
}

export default ProductCard;
