import * as React from "react";
import clsx from "clsx";

interface ButtonProps {
  buttonClassName?: string;
  svgPath?: React.ReactNode;
}

export const Button: React.FC<
  React.DetailedHTMLProps<
    React.ButtonHTMLAttributes<HTMLButtonElement>,
    HTMLButtonElement
  > &
    ButtonProps
> = ({ buttonClassName, svgPath, children, ...rest }) => {
  return (
    <button
      type={"button"}
      className={clsx(
        buttonClassName,
        "inline-flex justify-center items-center rounded-md shadow-md border border-transparent px-2 py-1 sm:px-4 sm:py-2 text-sm sm:text-base text-gray-900 bg-gray-100 hover:bg-gray-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-gray-500 focus-visible:ring-offset-2 select-none disabled:opacity-50"
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
