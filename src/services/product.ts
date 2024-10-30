import { __products } from "@/mocks/store";
import { Product } from "@/types";


function getProducts(): Promise<Product[]> {
  return Promise.resolve(__products);
}

function getProductById(id: string): Promise<Product | undefined> {
  return Promise.resolve(__products.find(p => p.id === id));
}

function getProductsById(...ids: string[]): Promise<Product[]> {
  return Promise.resolve(__products.filter(p => ids.includes(p.id)));
}

export {
  getProducts,
  getProductById,
  getProductsById
}