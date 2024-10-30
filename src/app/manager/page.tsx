import OrdersSection from "./orders-section";
import { getProductExtras } from "@/services/product-extra";
import { getProducts } from "@/services/product";
import { getOrders } from "@/services/orders";
import ManagerProvider from "@/stores/manager-provider";

const ManagerPage = async () => {
  const orders = await getOrders();
  const extras = await getProductExtras();
  const products = await getProducts();

  return (
    <ManagerProvider value={{ extras, products, orders }} >
      <h1>Manager Page</h1>
      <OrdersSection />
    </ManagerProvider>
  );
}

export default ManagerPage;
