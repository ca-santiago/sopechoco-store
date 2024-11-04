import { getProducts } from "@/services/product"
import { getProductExtras } from "@/services/product-extra";
import StoreProvider from "@/stores/store-providers"
import ActiveOrdersSection from "./active-orders";
import { getStoreStatus } from "@/services/store-info";

async function OrdersPage() {
  const products = await getProducts();
  const extras = await getProductExtras();
  const isStoreOpen = await getStoreStatus();

  return (
    <StoreProvider
      store={{
        products,
        extras,
        isOpen: isStoreOpen,
      }} 
    >
      <div className="w-full min-h-screen bg-blue-50">
        <ActiveOrdersSection />
      </div>
    </StoreProvider>
  )
}

export default OrdersPage