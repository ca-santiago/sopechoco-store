
import StoreProvider from '@/stores/store-providers';
import CartSection from './cart-section';
import { getProductExtras } from '@/services/product-extra';
import { getProducts } from '@/services/product';
import { getStoreOpenStatus } from '@/actions/store-info';


async function CartPage() {
  const extras = await getProductExtras();
  const products = await getProducts();
  const isStoreOpen = await getStoreOpenStatus();

  return (
    <StoreProvider
      store={{
        extras,
        products,
        isOpen: isStoreOpen
      }}
    >
      <CartSection />
    </StoreProvider>
  )
}

export default CartPage
