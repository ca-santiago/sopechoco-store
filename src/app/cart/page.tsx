
import CartSection from './cart-section';
import { getProductExtras } from '@/services/product-extra';
import { getProducts } from '@/services/product';
import { getStoreOpenStatus } from '@/actions/store-info';
import ClientStoreProvider from '@/stores/client-provider';

async function CartPage() {
  const extras = await getProductExtras();
  const products = await getProducts();
  const isStoreOpen = await getStoreOpenStatus();

  return (
    <ClientStoreProvider
      store={{
        products,
        extras,
        isStoreOpen,
      }}
    >
      <CartSection />
    </ClientStoreProvider>
  )
}

export default CartPage
