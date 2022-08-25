import { Noble } from "../../../Interfaces";
import { FC, useState } from "react";
import { NobleDisplay } from "../../Shared/NobleDisplay/NobleDisplay";
import clsx from "clsx";
import { Button } from "../../Shared/Button";

interface NoblesSectionProps {
  nobles: Array<Noble>;
}

export const NoblesSection: FC<NoblesSectionProps> = ({ nobles }) => {
  const [showNobles, setShowNobles] = useState<boolean>(true);

  return (
    <>
      <div className={"flex justify-between gap-2 items-center"}>
        <span className={"title"}>Nobles</span>
        <Button
          onClick={() => {
            setShowNobles(!showNobles);
          }}
        >
          {showNobles ? "Hide" : "Show"} Nobles
          {!showNobles &&
            `(${nobles.filter((noble) => !noble.acquired).length})`}
        </Button>
      </div>
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
    </>
  );
};
