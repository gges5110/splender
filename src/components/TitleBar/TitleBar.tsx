import { FC } from "react";
import { InformationCircleIcon } from "@heroicons/react/24/outline";
import { GitHubIcon } from "../Shared/Icons";
import { ColorThemeSelector } from "./ColorThemeSelector/ColorThemeSelector";
import { NavLink } from "react-router-dom";

interface TitleBarProps {}

export const TitleBar: FC<TitleBarProps> = () => {
  return (
    <>
      <div className={"flex flex-row justify-between items-center"}>
        <NavLink
          className={({ isActive, isPending }) =>
            isActive ? "active" : isPending ? "pending" : ""
          }
          to={"/"}
        >
          <h1 className={"font-semibold text-lg"}>Splendor</h1>
        </NavLink>

        <div className={"flex flex-row gap-2 items-center"}>
          <ColorThemeSelector />
          <button className={"rounded-full hover:bg-gray-200 p-1.5"}>
            <NavLink to={"/help"}>
              <InformationCircleIcon className={"h-6 w-6"} />
            </NavLink>
          </button>
          <a href={"https://github.com/gges5110/splender"}>
            <GitHubIcon />
          </a>
        </div>
      </div>
    </>
  );
};
