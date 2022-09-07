import { Noble } from "../../../Interfaces";
import { FC } from "react";
import { NobleDisplay } from "../../Shared/NobleDisplay/NobleDisplay";
import { Disclosure } from "@headlessui/react";
import { ChevronUpIcon } from "@heroicons/react/24/outline";
import * as React from "react";

interface NoblesSectionProps {
  nobles: Array<Noble>;
}

export const NoblesSection: FC<NoblesSectionProps> = ({ nobles }) => {
  return (
    <Disclosure defaultOpen={true}>
      {({ open }) => (
        <>
          <Disclosure.Button className="flex w-full justify-between rounded-lg bg-slate-200 px-4 py-2 text-left font-medium text-slate-900 hover:bg-slate-300 focus:outline-none focus-visible:ring focus-visible:ring-slate-500 focus-visible:ring-opacity-75">
            <span className={"title"}>
              Nobles{" "}
              {!open && `(${nobles.filter((noble) => !noble.acquired).length})`}
            </span>
            <ChevronUpIcon
              className={`${
                open ? "rotate-180 transform" : ""
              } h-5 w-5 text-slate-500`}
            />
          </Disclosure.Button>
          <Disclosure.Panel>
            <div className={"px-2 mt-2 mb-4"}>
              <div className={"flex justify-between gap-2"}>
                {nobles.map((noble, index) => (
                  <div className={"noble-size"} key={index}>
                    {!noble.acquired && <NobleDisplay noble={noble} />}
                  </div>
                ))}
              </div>
            </div>
          </Disclosure.Panel>
        </>
      )}
    </Disclosure>
  );
};
