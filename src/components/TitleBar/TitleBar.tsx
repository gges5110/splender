import * as React from "react";
import { FC, useState } from "react";
import { useLocalStorage } from "usehooks-ts";
import { WelcomeDialog } from "../Shared/Dialogs/WelcomeDialog";
import { InformationCircleIcon } from "@heroicons/react/24/outline";
import { GitHubIcon } from "../Shared/Icons";
import { Button } from "../Shared/Button";

interface TitleBarProps {
  startNewGame(): void;
}

export const TitleBar: FC<TitleBarProps> = ({ startNewGame }) => {
  const [showWelcomeDialog] = useLocalStorage("showWelcomeDialog", true);
  const [welcomeDialogOpen, setWelcomeDialogOpen] = useState(showWelcomeDialog);

  return (
    <>
      <WelcomeDialog
        open={welcomeDialogOpen}
        onClose={() => {
          setWelcomeDialogOpen(false);
        }}
      />
      <div className={"flex flex-row justify-between items-center"}>
        <h1 className={"font-semibold text-lg"}>Splendor</h1>
        <div className={"flex flex-row gap-2 items-center"}>
          <button
            className={"rounded-full hover:bg-gray-200 p-1.5"}
            onClick={() => {
              setWelcomeDialogOpen(true);
            }}
          >
            <InformationCircleIcon className={"h-6 w-6"} />
          </button>
          <a href={"https://github.com/gges5110/splender"}>
            <GitHubIcon />
          </a>

          <Button onClick={startNewGame}>New Game</Button>
        </div>
      </div>
    </>
  );
};
