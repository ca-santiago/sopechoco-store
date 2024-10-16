import React from "react";
import { useStoreCart } from "../../stores/cart";
import { CartItem, Product, ProductExtra, ProductExtraSelection } from "../../types";
import ProductExtraSelector from "./product-extra-selector";
import QuantitySelector from "../quantity-selector";
import { useImmer } from "use-immer";
import { v4 } from "uuid";

function getExtrasFromCartItem(cartItem: CartItem, extras: ProductExtra[]): ProductExtraSelection {
  return cartItem.addedExtras.reduce((acc, extra) => {
    const [sectionId, extraId] = extra.split(':');
    const foundExtra = extras.find(e => e.id === extraId);

    if (foundExtra) {
      acc[sectionId] = [...acc[sectionId] || [], foundExtra.id];
    }

    return acc;
  }, {} as ProductExtraSelection);
}

interface ProductBuilderProps {
  productData: Product;
  cartItem?: CartItem;
};

function ProductBuilder(props: ProductBuilderProps) {
  const {
    cartItem,
    productData,
  } = props;

  const {
    extras,
    addCartItem,
  } = useStoreCart();

  const [selectedExtras, setSelectedExtras] = useImmer<ProductExtraSelection>(
    cartItem ? getExtrasFromCartItem(cartItem, extras) : {}
  );

  const [productItem, setProductItem] = useImmer<CartItem>(
    cartItem ||
    {
      // local temporal id
      itemId: v4(),
      productId: productData.id,
      addedExtras: [],
      quantity: 1,
    });

  const processedExtras = productData.extras.map(productExtra => {
    return {
      ...productExtra,
      extras: extras.filter(extra => productExtra.extrasId.includes(extra.id)),
    };
  });

  const areAllRequiredExtrasAdded = React.useMemo(() => {
    return processedExtras.every(extra => {
      if (extra.min === 0) return true;

      return productItem.addedExtras.some(addedExtra => {
        const [sectionId,] = addedExtra.split(':');
        return sectionId === extra.id;
      });
    });

  }, [processedExtras, productItem.addedExtras]);

  const decrementQuantity = () => setProductItem(prev => { prev.quantity-- });
  const incrementQuantity = () => setProductItem(prev => { prev.quantity++ });

  const handleExtraSelectionChange = (selection: ProductExtra[], extraOptionId: string) => {
    setSelectedExtras(prev => { prev[extraOptionId] = selection.map(extra => extra.id) });

    setProductItem(prev => {
      const thisExtraOptionExtrasRemoved = prev.addedExtras.filter(e => !e.startsWith(extraOptionId));
      const newExtras = selection.map(extra => `${extraOptionId}:${extra.id}`);
      prev.addedExtras = [...thisExtraOptionExtrasRemoved, ...newExtras];
    });
  }

  const extraPrices: number[] = Object.values(selectedExtras).flat().map(s => {
    const extra = extras.find(e => e.id === s);
    return extra?.price || 0;
  });

  const addDisabled = !areAllRequiredExtrasAdded;
  const totalPrice = productData.price + extraPrices.reduce((acc, price) => acc + price, 0);
  const total = totalPrice * productItem.quantity;

  return (
    <form
      className="flex flex-col gap-4 h-fit"
      onSubmit={(e) => e.preventDefault()}
    >
      <div>
        <h3 className="text-slate-700 font-semibold text-xl">{productData.name}</h3>
        <p className="text-sm text-slate-500">{productData.description}</p>
        <p className="text-sm text-slate-700 font-semibold mt-2">
          <span>$</span>
          {productData.price}
        </p>
      </div>

      <div className="empty:hidden flex flex-col gap-4">
        {processedExtras.map((extraOption) =>
          <ProductExtraSelector
            initialSelection={selectedExtras[extraOption.id] || []}
            // onSelectionChange={handleExtraSelectionChange}
            onSelectionChange={handleExtraSelectionChange}
            key={extraOption.min}
            extraOptionData={extraOption}
            product={productData}
          />
        )}
      </div>

      <div className="flex justify-between">
        <div className="flex gap-3 items-center">
          <QuantitySelector
            quantity={productItem.quantity}
            onDecrement={decrementQuantity}
            onIncrement={incrementQuantity}
          />
          <p className="text-slate-600 font-semibold">${total}</p>
        </div>

        <button
          type="submit"
          disabled={addDisabled}
          onClick={() => addCartItem(productItem)}
          className="p-2 rounded-md bg-blue-400 hover:bg-blue-500 text-white disabled:bg-gray-400"
        >
          {!!cartItem ? 'Update order' : 'Add'}
        </button>
      </div>

      {/* Internal state prev */}
      {/* <div className="mt-4">
        <pre className="text-wrap">{JSON.stringify(productItem, null, 2)}</pre>
      </div> */}
    </form>
  );
}

export default ProductBuilder;