import React from "react";
import { Product, ProductExtra, ProductExtraOption } from "../../types";

import cx from "classnames";

interface ProductExtraSelectorProps {
  initialSelection: string[];
  extraOptionData: ProductExtraOption & { extras: ProductExtra[] };
  product: Product;
  onSelectionChange: (selected: ProductExtra[], extraOptionId: string) => void;
}

function ProductExtraSelector(props: ProductExtraSelectorProps): React.JSX.Element {
  const {
    extraOptionData,
    initialSelection,
    onSelectionChange,
  } = props;

  const [checked, setChecked] = React.useState<ProductExtra[]>(
    extraOptionData.extras.filter(extra => initialSelection.includes(extra.id))
  );

  const handleCheckExtra = (extra: ProductExtra) => {
    return (e: React.ChangeEvent<HTMLInputElement>) => {
      const newChecked = e.target.checked ? [...checked, extra] : checked.filter(e => e.id !== extra.id);
      setChecked(newChecked);
      onSelectionChange(newChecked, extraOptionData.id);
    }
  }

  const handleRadioChange = (extra: ProductExtra) => {
    return () => {
      onSelectionChange([extra], extraOptionData.id);
    }
  }

  return (
    <div>
      <div className="flex flex-col">
        <div>
          <h4 className='text-slate-700 font-semibold'>{extraOptionData.title}</h4>
          <p className='text-slate-600 text-sm'>{extraOptionData.description}</p>
        </div>
        <div className="flex justify-between items-center">
          {extraOptionData.max === 1 && <p className='text-slate-600 text-xs'>Select one extra</p>}
          
          {extraOptionData.max > 1 && <p className='text-slate-600 text-xs'>Select up to {extraOptionData.max} extras</p>}
          
          {/* Required indicator */}
          {extraOptionData.min === 1 && <p className="text-xs px-2 py-1 rounded-full bg-slate-400 text-white">Required</p>}
        </div>
      </div>
    
      <fieldset className='flex flex-col gap-1 mt-2'>
        {extraOptionData.extras.map((extra) => {

          if (extraOptionData.max === 1) {
            return (
              <div key={extra.id} className='flex justify-between'>
                <div className='flex gap-2 items-center'>
                  <input
                    type='radio'
                    value={extra.id}
                    checked={ initialSelection.includes(extra.id) }
                    name={ extraOptionData.id }
                    id={extra.id}
                    onChange={ handleRadioChange(extra) }
                  />
                  <label htmlFor={extra.id}>{extra.name}</label>
                </div>
                <span className='text-slate-600'>${extra.price}</span>
              </div>
            );
          }

          if (extraOptionData.max > 1) {
            const isChecked = checked.some(e => e.id === extra.id);
            const isDisabled = checked.length >= extraOptionData.max && !isChecked;

            const labelClasses = cx({
              'text-slate-400': isDisabled,
              'text-slate-700': !isDisabled
            });

            return (
              <div key={extra.id} className='flex justify-between'>
                <div className='flex gap-2 items-center'>
                  <input
                    type='checkbox'
                    id={extra.id}
                    checked={ isChecked }
                    onChange={ handleCheckExtra(extra) }
                    disabled={ isDisabled }
                  />
                  <span className={labelClasses} aria-disabled={isDisabled}>{extra.name}</span>
                </div>
                <p className='text-slate-600'>
                  <span>$</span>{extra.price}
                </p>
              </div>
            );
          }

        })}
      </fieldset>
    </div>
  );
}

export default ProductExtraSelector;
