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
          <Disclosure.Button className={"playing-table-subsections-title"}>
            <span className={"title"}>Gems</span>
            <ChevronUpIcon
              className={`${
                open ? "rotate-180 transform" : ""
              } h-5 w-5 text-slate-500`}
            />
          </Disclosure.Button>
          <Disclosure.Panel>
            <div className={"p-2"}>
              <div className={"flex flex-col justify-between gap-2"}>
                <GemsPicker
                  gems={gems}
                  mode={GemsPickerMode.PICK}
                  onSelect={onSelect}
                />
              </div>
            </div>
          </Disclosure.Panel>
        </>
      )}
    </Disclosure>
  );
};
