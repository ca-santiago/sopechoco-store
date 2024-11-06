import { getProducts } from "@/services/product"
import { getProductExtras } from "@/services/product-extra";
import ActiveOrdersSection from "./active-orders";
import { getStoreStatus } from "@/services/store-info";
import ClientStoreProvider from "@/stores/client-provider";

async function OrdersPage() {
  const products = await getProducts();
  const extras = await getProductExtras();
  const isStoreOpen = await getStoreStatus();

  return (
    <ClientStoreProvider
      store={{
        products,
        extras,
        isStoreOpen,
      }} 
    >
      <div className="w-full min-h-screen bg-blue-50">
        <ActiveOrdersSection />
      </div>
    </ClientStoreProvider>
  )
}

export default OrdersPage