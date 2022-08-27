import { Dialog, Transition } from "@headlessui/react";
import { Fragment } from "react";
import * as React from "react";
import { XMarkIcon } from "@heroicons/react/24/outline";

export interface ModalProps {
  open: boolean;
  children?: React.ReactNode;
  onClose(): void;
}

export const Modal: React.FC<ModalProps> = ({ open, onClose, children }) => {
  return (
    <div>
      <Transition appear show={open} as={Fragment}>
        <Dialog as="div" className="relative z-10" onClose={onClose}>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black bg-opacity-25" />
          </Transition.Child>

          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-4 text-center">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel className="transform overflow-hidden rounded-2xl bg-white text-left align-middle shadow-xl transition-all">
                  <button
                    className={
                      "absolute rounded-full hover:bg-gray-200 p-1.5 right-2 top-2"
                    }
                    onClick={onClose}
                  >
                    <XMarkIcon className={"h-6 w-6"} />
                  </button>
                  <div className={"h-6"}></div>
                  {children}
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </div>
  );
};
