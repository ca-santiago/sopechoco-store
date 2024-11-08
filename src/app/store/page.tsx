
import { getProductExtras } from '@/services/product-extra';
import { getProducts } from '@/services/product';
import ProductSection from './product-section';
import { getStoreOpenStatus } from '@/actions/store-info';
import ClientStoreProvider from '@/stores/client-provider';
import { unstable_noStore } from 'next/cache';

async function Page() {
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
      <div className='text-slate-800 bg-slate-50 h-screen'>
        <div className='h-12 shadow-md bg-white w-full flex items-center justify-center'>
          <h1 className='text-3xl text-slate-700 text-center font-semibold p-4'>Products</h1>
        </div>

        <div className='w-full md:w-3/4 lg:w-2/4 xl:w-1/4 mx-auto p-4'>
          <ProductSection />
        </div>
      </div>
    </ClientStoreProvider>
  )
}

export default Page
