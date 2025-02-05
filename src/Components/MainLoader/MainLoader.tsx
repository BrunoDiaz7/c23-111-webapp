import { CircularProgress, Backdrop } from "@mui/material";

type MainLoaderProps = {
  isOpen: boolean;
};

export const MainLoader: React.FC<MainLoaderProps> = ({ isOpen }) => {
  return (
    <Backdrop
      sx={{
        color: "#fff",
        zIndex: isOpen ? 2000 : -1,
      }}
      open={isOpen}
    >
      <CircularProgress />
    </Backdrop>
  );
};
