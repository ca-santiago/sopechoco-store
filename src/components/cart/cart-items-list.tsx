import React from "react";
import { setOrder } from "@/actions/order";
import { getProductPriceWithExtras } from "@/helpers/product";
import { useClientStore } from "@/stores/client-provider";
import { CartItem, CartProductMapping, Order, Product, PRODUCT_STATUS } from "@/types";
import { BiSolidLeftArrowCircle } from "react-icons/bi";
import { PiWarningCircleLight } from "react-icons/pi";
import ProductBuilder from "../products/product-builder";
import ProductCartCard from "./cart-item-card";

function validateCartItems(items: CartProductMapping[]) {
  const invalidProducts = items.filter(({ product }) => product.status !== PRODUCT_STATUS.ACTIVE);
  return invalidProducts.length === 0;
}

// interface CartItemListProps {
//   onEditClick?: (cartItemId: string) => void;
// }

const CartItemsList = () => {
  const cartItems = useClientStore(s => s.cartItems);
  const currentOrders = useClientStore(s => s.currentOrders);

  const storeExtras = useClientStore(s => s.extras);
  const storeProducts = useClientStore(s => s.products);
  const isStoreOpen = useClientStore(s => s.isStoreOpen);

  const setCartItems = useClientStore(s => s.setCartItems);
  const setCurrentOrders = useClientStore(s => s.setCurrentOrders);

  const [selectedItem, setSelectedItem] = React.useState<CartProductMapping | null>(null);
  const [creatingOrder, setCreatingOrder] = React.useState(false);

  const cartProducts = React.useMemo(() => {
    return cartItems.reduce((acc, cartItem) => {
      const productFound = storeProducts.find(p => p.id === cartItem.productId);

      if (productFound) {
        acc.push({ product: productFound, cartItem });
      }

      return acc;
    }, [] as CartProductMapping[]);
  }, [storeProducts, cartItems]);

  const handleEdit = React.useCallback((product: Product, cartItem: CartItem) => {
    setSelectedItem({
      cartItem,
      product,
    });
  }, []);

  const handleRemoveFromCart = React.useCallback((cartItem: CartItem) => {
    setCartItems(cartItems.filter(i => i.itemId !== cartItem.itemId));
  }, [setCartItems, cartItems]);

  const handleOrderCreate = React.useCallback((order: Order) => {
    setCartItems([]);
    setCurrentOrders([...currentOrders, { orderId: order.id, ...order }]);
  }, [setCartItems, setCurrentOrders, currentOrders]);

  const handleSetOrder = React.useCallback(() => {
    const isValid = validateCartItems(cartProducts);
    if (!isValid) return false;

    setCreatingOrder(true);
    setOrder(cartItems)
      .then(handleOrderCreate)
      .catch(console.error)
      .finally(() => setCreatingOrder(false));
  }, [cartItems, cartProducts, handleOrderCreate]);

  const cartTotalPrice = React.useMemo(() => {
    return cartProducts.reduce((acc, item) => {
      const { cartItem, product } = item;

      acc += getProductPriceWithExtras(product, cartItem, storeExtras);
      return acc;
    }, 0);
  }, [cartProducts, storeExtras]);

  const allProductsAvailable = cartProducts.every(({ product }) => product.status === PRODUCT_STATUS.ACTIVE);
  const canCheckout = allProductsAvailable;

  if (selectedItem) {
    return (
      <div>
        <button onClick={() => setSelectedItem(null)} className='text-slate-500'>
          <BiSolidLeftArrowCircle size={28} />
        </button>
        <ProductBuilder
          productData={selectedItem.product}
          cartItem={selectedItem.cartItem}
          onSave={() => setSelectedItem(null)}
        />
      </div>
    );
  }

  if (cartProducts.length === 0) return null;

  return (
    <div className="flex flex-col gap-4">
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

      {!canCheckout && isStoreOpen &&
        <p className='text-red-400 text-sm w-full flex justify-end items-center gap-1'>
          <PiWarningCircleLight />
          Platillos no disponibles
        </p>
      }

      <div className='flex justify-end gap-4 items-center'>
        <button
          className='px-2 py-1 rounded-md bg-blue-500 text-white disabled:bg-slate-300'
          disabled={!canCheckout || creatingOrder || !isStoreOpen}
          onClick={handleSetOrder}
        >
          { creatingOrder ?
            'Creando orden...' :
            'Ordenar'
          }
        </button>
        <p className='text-slate-700 font-semibold'>
          {`Total: \$${cartTotalPrice}`}
        </p>
      </div>

      {!isStoreOpen && 
        <p className='text-red-400 text-sm w-full flex justify-end items-center gap-2'>
          <PiWarningCircleLight size={ 22 } />
          Tienda cerrada. Podrás completar tu orden cuando el establecimiento abra nuevamente
        </p>
      }

    </div>
  )
}

export default CartItemsList;
