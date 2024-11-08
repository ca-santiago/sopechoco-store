import { getProducts } from "@/services/product"
import { getProductExtras } from "@/services/product-extra";
import ActiveOrdersSection from "./active-orders";
import { getStoreStatus } from "@/services/store-info";
import ClientStoreProvider from "@/stores/client-provider";
import { unstable_noStore } from "next/cache";

async function OrdersPage() {
  unstable_noStore();

  const [
    products,
    extras,
    isStoreOpen,
  ] = await Promise.all([
    getProducts(),
    getProductExtras(),
    getStoreStatus(),
  ]);

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