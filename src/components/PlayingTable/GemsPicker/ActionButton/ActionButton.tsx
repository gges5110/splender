import React, { FC } from "react";

interface ActionButtonProps {
  disabled: boolean;
  actionLabelText: string;

  onClick(): void;
}

export const ActionButton: FC<ActionButtonProps> = ({
  disabled,
  actionLabelText,
  onClick,
}) => {
  return (
    <button
      disabled={disabled}
      onClick={onClick}
      className={
        "w-24 h-8 sm:h-10 inline-flex items-center bg-indigo-600 text-white text-base font-semibold py-2 px-4 rounded-full shadow-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 focus:ring-offset-purple-200 disabled:opacity-50"
      }
    >
      <svg
        className="w-4 h-4 mr-2"
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M5 13l4 4L19 7"
        />
      </svg>
      <span className={"select-none"}>{actionLabelText}</span>
    </button>
  );
};
