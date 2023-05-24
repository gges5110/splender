import * as React from "react";
import { TitleBar } from "../TitleBar/TitleBar";
import { Outlet } from "react-router-dom";

interface LayoutProps {}

export const Layout: React.FC<LayoutProps> = () => {
  return (
    <div className={"h-screen dark:bg-slate-900"}>
      <div
        className={
          "mx-auto sm:my-auto py-4 sm:p-8 w-screen sm:w-auto dark:bg-slate-900 dark:text-white"
        }
      >
        <div className={"flex flex-wrap justify-center"}>
          <div className={"w-full px-2 sm:px-4 ml-4 sm:mx-4"}>
            <TitleBar />
          </div>
          <Outlet />
        </div>
      </div>
    </div>
  );
};
