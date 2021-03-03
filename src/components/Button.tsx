import React from "react";

interface ButtonProps {
  buttonClassName?: string;
  svgPath?: React.SVGProps<SVGPathElement>;
}

export const Button: React.FC<
  React.DetailedHTMLProps<
    React.ButtonHTMLAttributes<HTMLButtonElement>,
    HTMLButtonElement
  > &
    ButtonProps
> = ({ buttonClassName, svgPath: SvgPath, children, ...rest }) => {
  return (
    <button
      className={`bg-gray-100 text-base font-semibold py-2 px-4 rounded-lg shadow-md inline-flex items-center ${buttonClassName}`}
      {...rest}
    >
      {SvgPath && (
        <svg
          className="w-4 h-4 mr-2"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          {SvgPath}
        </svg>
      )}

      {children}
    </button>
  );
};
