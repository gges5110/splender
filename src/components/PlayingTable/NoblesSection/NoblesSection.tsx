import { Noble } from "../../../Interfaces";
import { FC, useState } from "react";
import { NobleDisplay } from "../../Shared/NobleDisplay/NobleDisplay";
import clsx from "clsx";
import { Button } from "../../Shared/Button";
import { Disclosure } from "@headlessui/react";
import { ChevronUpIcon } from "@heroicons/react/24/solid";

interface NoblesSectionProps {
  nobles: Array<Noble>;
}

export const NoblesSection: FC<NoblesSectionProps> = ({ nobles }) => {
  const [showNobles, setShowNobles] = useState<boolean>(true);

  return (
    <>
      <Disclosure defaultOpen={true}>
        {({ open }) => (
          <>
            <Disclosure.Button className="flex w-full justify-between rounded-lg bg-blue-100 px-4 py-2 text-left font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring focus-visible:ring-blue-500 focus-visible:ring-opacity-75">
              <span className={"title"}>Nobles</span>
              <ChevronUpIcon
                className={`${
                  open ? "rotate-180 transform" : ""
                } h-5 w-5 text-blue-500`}
              />
            </Disclosure.Button>
            <Disclosure.Panel>
              <div
                className={clsx("flex justify-between gap-2 mt-2", {
                  hidden: !showNobles,
                })}
              >
                {nobles.map((noble, index) => (
                  <div className={"noble-size"} key={index}>
                    {!noble.acquired && <NobleDisplay noble={noble} />}
                  </div>
                ))}
              </div>
            </Disclosure.Panel>
          </>
        )}
      </Disclosure>
    </>
  );
};
