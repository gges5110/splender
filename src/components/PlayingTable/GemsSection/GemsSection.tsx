import { FC } from "react";
import { Disclosure } from "@headlessui/react";
import { ChevronUpIcon } from "@heroicons/react/24/outline";
import { GemsPicker, GemsPickerMode } from "./GemsPicker/GemsPicker";

interface GemsSectionProps {
  gems: number[];

  onSelect(gems: number[]): void;
}

export const GemsSection: FC<GemsSectionProps> = ({ gems, onSelect }) => {
  return (
    <Disclosure defaultOpen={true}>
      {({ open }) => (
        <>
          <Disclosure.Button className="flex w-full justify-between rounded-lg bg-slate-200 px-4 py-2 text-left font-medium text-slate-900 hover:bg-slate-300 focus:outline-none focus-visible:ring focus-visible:ring-slate-500 focus-visible:ring-opacity-75">
            <span className={"title"}>Gems</span>
            <ChevronUpIcon
              className={`${
                open ? "rotate-180 transform" : ""
              } h-5 w-5 text-slate-500`}
            />
          </Disclosure.Button>
          <Disclosure.Panel>
            <div className={"flex justify-between gap-2 mt-2 mb-4 flex-wrap"}>
              <GemsPicker
                gems={gems}
                onSelect={onSelect}
                mode={GemsPickerMode.PICK}
              />
            </div>
          </Disclosure.Panel>
        </>
      )}
    </Disclosure>
  );
};
