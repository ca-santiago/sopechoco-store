
import CartSection from './cart-section';
import { getProductExtras } from '@/services/product-extra';
import { getProducts } from '@/services/product';
import { getStoreOpenStatus } from '@/actions/store-info';
import ClientStoreProvider from '@/stores/client-provider';
import { unstable_noStore } from 'next/cache';

async function CartPage() {
  unstable_noStore();

  const [
    extras,
    products,
    isStoreOpen,
  ] = await Promise.all([
    getProductExtras(),
    getProducts(),
    getStoreOpenStatus()
  ]);

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
