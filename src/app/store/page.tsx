
import StoreProvider from '@/stores/store-providers';
import { getProductExtras } from '@/services/product-extra';
import { getProducts } from '@/services/product';
import ProductSection from './product-section';

async function Page() {
  const extras = await getProductExtras();
  const products = await getProducts();

  return (
    <StoreProvider store={{ extras: extras, products: products }}>
      <div className='text-slate-800 bg-slate-50 h-screen'>
        <div className='h-12 shadow-md bg-white w-full flex items-center justify-center'>
          <h1 className='text-3xl text-slate-700 text-center font-semibold p-4'>Products</h1>
        </div>

        <div className='w-full md:w-3/4 lg:w-2/4 xl:w-1/4 mx-auto p-4'>
          <ProductSection />
        </div>  
      </div>
    </StoreProvider>
  )
}

export default Page
