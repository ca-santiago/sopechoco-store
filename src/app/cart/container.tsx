import { PropsWithChildren } from "react";

function CartContainer(props: PropsWithChildren<{ className?: string }>) {
  return (
    <div className={ props.className } >
      <div className='w-full md:w-3/4 lg:w-2/4 xl:w-1/4 mx-auto bg-white border-2 border-slate-300 rounded-md h-full p-4 gap-4 flex flex-col'>
        {props.children}
      </div>
    </div>
  );
}

export default CartContainer;