import OrdersSection from "./orders-section";
import { getProductExtras } from "@/services/product-extra";
import { getProducts } from "@/services/product";
import { getOrders } from "@/services/orders";
import ManagerProvider from "@/stores/manager-provider";
import { getStoreOpenStatus } from "@/actions/store-info";
import { unstable_noStore } from "next/cache";

const ManagerPage = async () => {
  unstable_noStore();

  const [
    orders,
    extras,
    products,
    isStoreOpen,
  ] = await Promise.all([
    getOrders(),
    getProductExtras(),
    getProducts(),
    getStoreOpenStatus(),
  ]);

  return (
    <ManagerProvider
      value={{
        extras,
        products,
        orders,
        isStoreOpen,
      }}
    >
      <OrdersSection />
    </ManagerProvider>
  );
}

export default ManagerPage;
