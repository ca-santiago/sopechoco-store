import React from "react";
import { ExtraSelectionMap, ExtraSelectionString, Product, ProductExtra, ProductExtraOption } from "../../types";

import QuantitySelector from "../quantity-selector";
import { selectionStringToExtraSelection } from "@/helpers/product";

interface ProductExtraSelectorProps {
  initialSelection: ExtraSelectionString[];
  extraOptionData: ProductExtraOption & { extras: ProductExtra[] };
  product: Product;
  onSelectionChange: (selections: ExtraSelectionString[]) => void;
}

function ProductExtraSelector(props: ProductExtraSelectorProps): React.JSX.Element {
  const {
    extraOptionData,
    initialSelection,
    onSelectionChange,
  } = props;

  const [checked2, setChecked2] = React.useState<ExtraSelectionMap[]>(
    initialSelection.map(selectionStringToExtraSelection)
  );

  const setSelections = (selections: ExtraSelectionMap[]) => {
    setChecked2(selections);
    onSelectionChange(selections.map((selection) => `${extraOptionData.id}:${selection.extraId}:${selection.amount}`));
  }

  const handleCheckExtra = (extra: ProductExtra) => {
    return (e: React.ChangeEvent<HTMLInputElement>) => {

      const newChecked: ExtraSelectionMap[] = e.target.checked
        ? [...checked2, { extraId: extra.id, amount: 1 }]
        : checked2.filter(e => e.extraId !== extra.id);

      setSelections(newChecked);
    }
  }

  const handleRadioChange = (extra: ProductExtra, prevState: boolean) => {
    return () => {
      prevState ? onSelectionChange([`${extraOptionData.id}:${extra.id}:${1}`]) : onSelectionChange([]);
    }
  }

  const handleSelectionIncrement = (selection: ExtraSelectionMap) => {
    return () => {
      const newSelections = checked2.map(e => {
        if (e.extraId === selection.extraId) e.amount++;
        return e;
      });
      setSelections(newSelections);
    }
  }

  const handleSelectionDecrement = (selection: ExtraSelectionMap) => {
    return () => {
      const newSelections = checked2.map(e => {
        if (e.extraId === selection.extraId) e.amount--;
        return e;
      });
      setSelections(newSelections);
    }
  }

  const allSelectionsCount = checked2.reduce((acc, e) => acc + e.amount, 0);
  const countLimitReached = extraOptionData.max === -1 ? false : allSelectionsCount >= extraOptionData.max;

  return (
    <div>
      <div className="flex flex-col">
        <div className="flex justify-between">
          <h4 className='text-slate-700 font-semibold'>{extraOptionData.title}</h4>

          { extraOptionData.min === 1 &&
            <p className="text-xs px-2 py-1 rounded-full bg-slate-400 text-white">Required</p>
          }
        </div>

        <p className='text-slate-600 text-sm'>{extraOptionData.description}</p>

        <div className="flex justify-between flex-row-reverse items-center">
          {extraOptionData.max === 1 &&
            <p className='text-slate-600 text-xs'>Select one extra</p>
          }

          {extraOptionData.min > 0 && extraOptionData.max === -1 &&
            <p className='text-slate-600 text-xs'>Select up to {extraOptionData.max} extras</p>
          }

        </div>
      </div>

      <fieldset className='flex flex-col gap-1 mt-2'>
        {extraOptionData.extras.map((extra) => {
          const foundExtraSelection = checked2.find(e => e.extraId === extra.id);

          if (extraOptionData.max === 1) {
            return (
              <div key={extra.id} className='flex justify-between'>
                <div className='flex gap-2 items-center'>
                  <input
                    type='radio'
                    value={extra.id}
                    checked={ !!foundExtraSelection }
                    name={extraOptionData.id}
                    id={extra.id}
                    onChange={handleRadioChange(extra, !!foundExtraSelection)}
                  />
                  <label htmlFor={extra.id}>{extra.name}</label>
                </div>
                <span className='text-slate-600'>${extra.price}</span>
              </div>
            );
          }

          if (extraOptionData.max > 1) {
            // const isChecked = checked.some(e => e.id === extra.id);

            const maxReached = checked2.length >= extraOptionData.max;
            const isDisabled = (maxReached || countLimitReached) && !foundExtraSelection;

            return (
              <div key={extra.id} className='flex justify-between'>
                <div className='flex gap-2 items-center'>
                  <input
                    className="peer"
                    type='checkbox'
                    id={extra.id}
                    checked={!!foundExtraSelection}
                    onChange={handleCheckExtra(extra, )}
                    disabled={isDisabled}
                  />
                  <label htmlFor={extra.id} className='peer-disabled:text-slate-400 text-slate-700' aria-disabled={isDisabled}>{extra.name}</label>
                </div>
                { extra.price > 0 &&
                  <p className='text-slate-700 font-semibold'>
                   <span>$</span>{extra.price * (foundExtraSelection?.amount || 1)}
                 </p>
                }
                {extraOptionData.multiSelect && foundExtraSelection &&
                  <div>
                    <QuantitySelector
                      quantity={foundExtraSelection.amount}
                      onDecrement={handleSelectionDecrement(foundExtraSelection)}
                      onIncrement={handleSelectionIncrement(foundExtraSelection)}
                      disableIncrement={allSelectionsCount >= extraOptionData.countLimit}
                    />
                  </div>
                }
              </div>
            );
          }

        })}
      </fieldset>

      {/* <pre className='text-wrap px-3 py-2 rounded-md mt-2 bg-slate-200'>{JSON.stringify(checked2, null, 2)}</pre> */}
    </div>
  );
}

export default ProductExtraSelector;
