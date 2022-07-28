import React, { FC } from "react";

interface ResetButtonProps {
  disabled: boolean;

  onClick(): void;
}

export const ResetButton: FC<ResetButtonProps> = ({ onClick, disabled }) => {
  return (
    <button
      disabled={disabled}
      onClick={onClick}
      className={
        "w-24 h-8 sm:h-10 inline-flex items-center bg-purple-600 text-white text-base font-semibold py-2 px-4 rounded-full shadow-md hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 focus:ring-offset-purple-200 disabled:opacity-50"
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
          d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
        />
      </svg>

      <span>Reset</span>
    </button>
  );
};