import { setOrder } from "@/actions/order";
import { getProductPriceWithExtras } from "@/helpers/product";
import { useStoreCart } from "@/stores/cart";
import { CartItem, CartProductMapping, PRODUCT_STATUS } from "@/types";
import { Order, Product } from "@/types";
import React from "react";
import { PiWarningCircleLight } from "react-icons/pi";
import ProductCartCard from "./cart-item-card";
import { BiSolidLeftArrowCircle } from "react-icons/bi";
import ProductBuilder from "../products/product-builder";


function validateCartItems(items: CartProductMapping[]) {
  const invalidProducts = items.filter(({ product }) => product.status !== PRODUCT_STATUS.ACTIVE);
  return invalidProducts.length === 0;
}

interface CartItemListProps {
  onEditClick?: (cartItemId: string) => void;
}

const CartItemsList = (props: CartItemListProps) => {
  const cartItems = useStoreCart(s => s.items);
  const currentOrders = useStoreCart(s => s.currentOrders);

  const storeExtras = useStoreCart(s => s.extras);
  const storeProducts = useStoreCart(s => s.products);

  const setCartItems = useStoreCart(s => s.setCartItems);
  const setCurrentOrders = useStoreCart(s => s.setCurrentOrders);
  const removeCartItem = useStoreCart(s => s.removeFromCart);

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
    removeCartItem(cartItem.itemId);
  }, [removeCartItem]);


  const handleOrderCreate = React.useCallback((order: Order) => {
    setCartItems([]);
    setCurrentOrders([...currentOrders, { orderId: order.id, ...order }]);
  }, [setCartItems, setCurrentOrders]);


  const handleSetOrder = React.useCallback(async () => {
    const isValid = validateCartItems(cartProducts);
    if (!isValid) return false;

    setCreatingOrder(true);
    await setOrder(cartItems)
      .then(handleOrderCreate)
      .catch(error => console.log('Error', error))
      .finally(() => setCreatingOrder(false));
  }, [cartItems]);

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

  if (cartProducts.length === 0) {
    return null;
  }

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

      {!canCheckout &&
        <p className='text-red-500 text-sm w-full flex justify-end items-center gap-1'>
          <PiWarningCircleLight />
          Platillos no disponibles
        </p>
      }

      <div className='flex justify-end gap-4 items-center'>
        <button
          className='px-2 py-1 rounded-md bg-blue-500 text-white disabled:bg-slate-300'
          disabled={!canCheckout || creatingOrder}
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
    </div>
  )
}

export default CartItemsList;