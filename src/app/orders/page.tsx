import { getProducts } from "@/services/product"
import { getProductExtras } from "@/services/product-extra";
import StoreProvider from "@/stores/store-providers"
import ActiveOrdersSection from "./active-orders";

async function OrdersPage() {
  const products = await getProducts();
  const extras = await getProductExtras();

  return (
    <StoreProvider
      store={{
        products,
        extras,
      }} 
    >
      <div className="w-full min-h-screen bg-blue-50">
        <ActiveOrdersSection />
      </div>
    </StoreProvider>
  )
}

export default OrdersPage