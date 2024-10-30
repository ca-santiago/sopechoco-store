import { __extras } from "@/mocks/store";
import { ProductExtra } from "@/types";

function getProductExtras(): Promise<ProductExtra[]> {
  return Promise.resolve(__extras);
}

function getProductExtrasById(ids: string[]): Promise<ProductExtra[]> {
  return Promise.resolve(__extras.filter(e => ids.includes(e.id)));
}

export {
  getProductExtras,
  getProductExtrasById,
}