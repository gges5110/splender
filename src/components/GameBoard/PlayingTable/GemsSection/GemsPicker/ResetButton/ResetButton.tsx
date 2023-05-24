import { FC } from "react";
import { ArrowPathIcon } from "@heroicons/react/24/outline";

interface ResetButtonProps {
  disabled: boolean;

  onClick(): void;
}

export const ResetButton: FC<ResetButtonProps> = ({ onClick, disabled }) => {
  return (
    <button
      className={
        "w-24 flex-none h-8 sm:h-10 inline-flex items-center text-base font-semibold dark:text-black py-2 px-4 rounded-full shadow-md bg-gray-100 hover:bg-gray-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-gray-500 focus-visible:ring-offset-2 disabled:opacity-50"
      }
      disabled={disabled}
      onClick={onClick}
    >
      <svg
        className={"w-4 h-4 mr-2"}
        fill={"none"}
        stroke={"currentColor"}
        viewBox={"0 0 24 24"}
        xmlns={"http://www.w3.org/2000/svg"}
      >
        <ArrowPathIcon />
      </svg>

      <span>Reset</span>
    </button>
  );
};
