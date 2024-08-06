import { Container } from "@mui/material";
import { Room } from "src/components/Room/Room";

export const RoomPage = () => {
  return (
    <Container
      maxWidth={"xl"}
      sx={{
        paddingLeft: { xs: 0, sm: 2 },
        paddingRight: { xs: 0, sm: 2 },
      }}
    >
      <Room />
    </Container>
  );
};
