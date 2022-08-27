import * as React from "react";
import clsx from "clsx";

export enum Variant {
  GRAY,
  WHITE,
}

const VARIANT_MAPS: Record<Variant, string> = {
  [Variant.GRAY]:
    "text-gray-900 bg-gray-100 hover:bg-gray-200  focus-visible:ring-gray-500",
  [Variant.WHITE]:
    "text-gray-900 bg-white-100 hover:bg-gray-200  focus-visible:ring-gray-500",
};

interface ButtonProps {
  svgPath?: React.ReactNode;
  variant?: Variant;
}

export const Button: React.FC<
  React.DetailedHTMLProps<
    React.ButtonHTMLAttributes<HTMLButtonElement>,
    HTMLButtonElement
  > &
    ButtonProps
> = ({ svgPath, variant = Variant.GRAY, children, ...rest }) => {
  return (
    <button
      type={"button"}
      className={clsx(
        "inline-flex justify-center items-center rounded-md shadow-md border border-transparent px-2 py-1 sm:px-4 sm:py-2 text-sm sm:text-base focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 select-none disabled:opacity-50",
        VARIANT_MAPS[variant]
      )}
      {...rest}
    >
      {svgPath && (
        <svg
          className="w-4 h-4 mr-2"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          {svgPath}
        </svg>
      )}

      {children}
    </button>
  );
};
