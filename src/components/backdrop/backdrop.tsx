import { Backdrop as MuiBackdrop, Box, LinearProgress } from "@mui/material";

type Props = {
  open: boolean;
};

const Backdrop = ({ open }: Props) => {
  return (
    <MuiBackdrop open={open} sx={{ zIndex: 9999, bgcolor: "#ffffff50" }}>
      <Box sx={{ width: "100%", top: 0, position: "absolute" }}>
        <LinearProgress />
      </Box>
    </MuiBackdrop>
  );
};

export default Backdrop;
