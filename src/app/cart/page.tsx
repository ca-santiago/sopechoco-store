
import StoreProvider from '@/stores/store-providers';
import CartSection from './cart-section';
import { getProductExtras } from '@/services/product-extra';
import { getProducts } from '@/services/product';


async function CartPage() {
  const extras = await getProductExtras();
  const products = await getProducts();

  return (
    <StoreProvider store={{ extras, products }}>
      <CartSection />
    </StoreProvider>
  )
}

export default CartPage
