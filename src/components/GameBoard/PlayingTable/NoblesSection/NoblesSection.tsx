import { Noble } from "src/interfaces/Interfaces";
import { FC } from "react";
import { NobleDisplay } from "src/components/Shared/NobleDisplay/NobleDisplay";
import { SectionCollapse } from "src/components/Shared/SectionCollapse/SectionCollapse";

interface NoblesSectionProps {
  nobles: Array<Noble>;
}

export const NoblesSection: FC<NoblesSectionProps> = ({ nobles }) => (
  <SectionCollapse title={"Nobles"}>
    <div className={"px-2 mt-2"}>
      <div className={"flex justify-between gap-2"}>
        {nobles.map((noble, index) => (
          <div className={"noble-size"} key={index}>
            {!noble.acquired && <NobleDisplay noble={noble} />}
          </div>
        ))}
      </div>
    </div>
  </SectionCollapse>
);
