import { ArrowIcon } from "@/components/ArrowIcon";
import { Props } from "@react-three/fiber";
import clsx from "clsx";

type ArrowButtonProps = {
  direction: "left" | "right";
  onClick: () => void;
  label?: string;
};

const ArrowButton = ({ direction, onClick, label, ...props }: ArrowButtonProps) => {
  return (
    <>
      <button
        onClick={onClick} 
        className={`carousel-button carousel-button-${direction}
        rounded-full border-white bg-white/10 p-3 opacity-85 ring-white focus:outline-none focus-visible:opacity-100 focus-visible:ring-4 
        z-20 text-xl size-12 md:size-16 lg:size-20 md:text-3xl font-semibold text-slate-700 hover:text-slate-900 hover:scale-110 transition-all duration-300 ease-in-out`}
      >
        <ArrowIcon className={clsx(direction === "right" && "-scale-x-100")} />
        <span className="sr-only">{label}</span>
      </button>
    </>
  );
};

export default ArrowButton;
