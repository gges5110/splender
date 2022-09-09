import {
  ComputerDesktopIcon,
  MoonIcon,
  SunIcon,
} from "@heroicons/react/24/outline";
import * as React from "react";
import { Fragment, useEffect, useState } from "react";
import { Listbox, Transition } from "@headlessui/react";

enum ColorTheme {
  Light,
  Dark,
  System,
}

const icons = [
  <SunIcon width={24} height={24} />,
  <MoonIcon width={24} height={24} />,
  <ComputerDesktopIcon width={24} height={24} />,
];

export const ColorThemeSelector = () => {
  const [selected, setSelected] = useState<ColorTheme>(
    localStorage.theme == null
      ? ColorTheme.System
      : localStorage.theme === "dark"
      ? ColorTheme.Dark
      : ColorTheme.Light
  );

  useEffect(() => {
    if (
      localStorage.theme === "dark" ||
      (!("theme" in localStorage) &&
        window.matchMedia("(prefers-color-scheme: dark)").matches)
    ) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, []);

  const onChange = (colorTheme: ColorTheme) => {
    if (colorTheme === ColorTheme.Light) {
      localStorage.theme = "light";
    } else if (colorTheme === ColorTheme.Dark) {
      localStorage.theme = "dark";
    } else {
      localStorage.removeItem("theme");
    }

    // On page load or when changing themes, best to add inline in `head` to avoid FOUC
    if (
      colorTheme === ColorTheme.Dark ||
      (!("theme" in localStorage) &&
        window.matchMedia("(prefers-color-scheme: dark)").matches)
    ) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }

    setSelected(colorTheme);
  };

  return (
    <Listbox value={selected} onChange={onChange}>
      <div className="relative">
        <Listbox.Button className="relative w-full p-1.5 hover:bg-gray-200 dark:hover:bg-slate-600 rounded-full focus:outline-none focus-visible:border-indigo-500 focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 focus-visible:ring-offset-2 focus-visible:ring-offset-orange-300 sm:text-sm">
          <span className="block truncate">{icons[selected]}</span>
        </Listbox.Button>
        <Transition
          as={Fragment}
          leave="transition ease-in duration-100"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <Listbox.Options className="z-10 absolute mt-1 max-h-60 w-28 overflow-auto rounded-md bg-white dark:bg-slate-800 py-1 text-base dark:text-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
            <Listbox.Option
              className={({ active }) =>
                `relative p-2 ${
                  active
                    ? "bg-sky-100 dark:bg-sky-700 text-sky-900"
                    : "text-gray-900"
                }`
              }
              value={ColorTheme.Light}
            >
              {({ selected }) => (
                <>
                  <div
                    className={`${
                      selected ? "font-medium" : "font-normal"
                    } flex items-center gap-2 dark:text-white`}
                  >
                    <SunIcon width={24} height={24} /> Light
                  </div>
                </>
              )}
            </Listbox.Option>
            <Listbox.Option
              className={({ active }) =>
                `relative p-2 ${
                  active
                    ? "bg-sky-100 dark:bg-sky-700 text-sky-900"
                    : "text-gray-900"
                }`
              }
              value={ColorTheme.Dark}
            >
              {({ selected }) => (
                <>
                  <div
                    className={`${
                      selected ? "font-medium" : "font-normal"
                    } flex items-center gap-2 dark:text-white`}
                  >
                    <MoonIcon width={24} height={24} /> Dark
                  </div>
                </>
              )}
            </Listbox.Option>
            <Listbox.Option
              className={({ active }) =>
                `relative p-2 ${
                  active
                    ? "bg-sky-100 dark:bg-sky-700 text-sky-900"
                    : "text-gray-900"
                }`
              }
              value={ColorTheme.System}
            >
              {({ selected }) => (
                <>
                  <div
                    className={`${
                      selected ? "font-medium" : "font-normal"
                    } flex items-center gap-2 dark:text-white`}
                  >
                    <ComputerDesktopIcon width={24} height={24} /> System
                  </div>
                </>
              )}
            </Listbox.Option>
          </Listbox.Options>
        </Transition>
      </div>
    </Listbox>
  );
};
