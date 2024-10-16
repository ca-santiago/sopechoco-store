import { BiMinus, BiPlus } from "react-icons/bi";

interface QuantitySelectorProps {
  quantity: number;
  onDecrement: () => void;
  onIncrement: () => void;
  disableIncrement?: boolean;
}

const QuantitySelector: React.FC<QuantitySelectorProps> = ({
  quantity,
  onDecrement,
  onIncrement,
  disableIncrement,
}) => {
  return (
    <div className="flex items-center">
      <button
        disabled={quantity === 1}
        className="p-1 rounded-md bg-blue-400 hover:bg-blue-500 disabled:bg-slate-300 text-white"
        onClick={onDecrement}
      >
        <BiMinus />
      </button>
      <span className="text-slate-600 font-semibold mx-2">{quantity}</span>
      <button
        disabled={disableIncrement}
        className="p-1 rounded-md bg-blue-400 hover:bg-blue-500 disabled:bg-slate-300 text-white"
        onClick={onIncrement}
      >
        <BiPlus />
      </button>
    </div>
  );
};

export default QuantitySelector;