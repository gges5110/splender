import { Noble } from "src/interfaces/Interfaces";
import { FC } from "react";
import { NobleDisplay } from "src/components/Shared/NobleDisplay/NobleDisplay";
import { SectionCollapse } from "src/components/Shared/SectionCollapse/SectionCollapse";
import { Box } from "@mui/material";

interface NoblesSectionProps {
  nobles: Array<Noble>;
}

export const NoblesSection: FC<NoblesSectionProps> = ({ nobles }) => (
  <SectionCollapse title={"Nobles"}>
    <Box mt={2} px={1}>
      <Box display={"flex"} gap={1} justifyContent={"space-between"}>
        {nobles.map((noble, index) => (
          <div className={"noble-size"} key={index}>
            {!noble.acquired && <NobleDisplay noble={noble} />}
          </div>
        ))}
      </Box>
    </Box>
  </SectionCollapse>
);
