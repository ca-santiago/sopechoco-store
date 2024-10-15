import { BiMinus, BiPlus } from "react-icons/bi";

interface QuantitySelectorProps {
  quantity: number;
  onDecrement: () => void;
  onIncrement: () => void;
}

const QuantitySelector: React.FC<QuantitySelectorProps> = ({ quantity, onDecrement, onIncrement: increment }) => {
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
        className="p-1 rounded-md bg-blue-400 hover:bg-blue-500 disabled:bg-slate-400 text-white disabled:text-slate-400"
        onClick={increment}
      >
        <BiPlus />
      </button>
    </div>
  );
};

export default QuantitySelector;