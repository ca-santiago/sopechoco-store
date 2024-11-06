import React from "react";
import { CartItem, Product } from "../../types";
import ProductExtraSelector from "./product-extra-selector";
import QuantitySelector from "../quantity-selector";
import { useImmer } from "use-immer";
import { v4 } from "uuid";
import { useClientStore } from "@/stores/client-provider";

interface ProductBuilderProps {
  productData: Product;
  cartItem?: CartItem;
  onSave?: () => void;
};

function ProductBuilder(props: ProductBuilderProps) {
  const {
    cartItem,
    productData,
    onSave,
  } = props;

  const extras = useClientStore(s => s.extras);

  const addCartItem = useClientStore(s => s.addToCart);

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

  const areAllRequiredExtrasAdded = productData.extras.every(extOpt => {
    if (extOpt.min === 0) return true;
    const addedExtraFound = productItem.addedExtras.find(ext => ext.startsWith(extOpt.id));
    return !!addedExtraFound;
  });

  const decrementQuantity = () => setProductItem(prev => { prev.quantity-- });
  const incrementQuantity = () => setProductItem(prev => { prev.quantity++ });

  const handleExtraSelectionChange = (extraOptionId: string) => (newSelections: string[]) => {
    setProductItem(prev => {
      const filteredExtras = prev.addedExtras.filter(ext => ext.split(':')[0] !== extraOptionId);
      prev.addedExtras = [...filteredExtras, ...newSelections];
    });
  }

  const handleSubmitForm = React.useCallback(() => {
    addCartItem(productItem);
    if (onSave) onSave();
  }, [onSave, addCartItem, productItem]);

  const extraPrices: number[] = productItem.addedExtras.map(extra => {
    const [, extraId, qty] = extra.split(':');
    const foundExtra = extras.find(e => e.id === extraId);
    return foundExtra ? foundExtra.price * parseInt(qty) : 0;
  }, []);

  const addDisabled = !areAllRequiredExtrasAdded;
  const totalPrice = productData.price + extraPrices.reduce((acc, price) => acc + price, 0);
  const total = totalPrice * productItem.quantity;

  const handleAdditionalInstructionsChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => 
    setProductItem(prev => { prev.additionalInstructions = e.target.value || undefined; });

  return (
    <form
      className="flex flex-col gap-4 h-fit"
      onSubmit={ e => e.preventDefault() }
    >
      <div>
        <h3 className="text-slate-700 font-semibold text-xl">{productData.name}</h3>
        <p className="text-sm text-slate-500">{productData.description}</p>
        { productData.price > 0 && 
          <p className="text-sm text-slate-700 font-semibold mt-2">
            <span>$</span>
            {productData.price}
          </p>
        }
      </div>

      <div className="empty:hidden flex flex-col gap-4">
        {processedExtras.map((extraOption) =>
          <ProductExtraSelector
            initialSelection={ productItem.addedExtras.filter(e => e.startsWith(extraOption.id)) }
            onSelectionChange={handleExtraSelectionChange(extraOption.id)}
            key={extraOption.min}
            extraOptionData={extraOption}
            product={productData}
          />
        )}
      </div>

      <div>
        <textarea 
          placeholder="Additional instructions"
          value={productItem.additionalInstructions}
          onChange={handleAdditionalInstructionsChange}
          className="p-2 rounded-md border-2 border-slate-200 w-full h-24" 
        />
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
          onClick={handleSubmitForm}
          disabled={ addDisabled }
          className="p-2 px-4 rounded-md bg-blue-400 hover:bg-blue-500 text-white disabled:bg-gray-400"
        >
          {!!cartItem ? 'Update order' : 'Agregar'}
        </button>
      </div>

      {/* Internal state prev */}
      <div className="rounded-md bg-slate-200 p-2">
        <pre className="text-wrap text-xs text-slate-700">{JSON.stringify(productItem, null, 2)}</pre>
      </div>
    </form>
  );
}

export default ProductBuilder;