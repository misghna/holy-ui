import { Box, CircularProgress } from "@mui/material";

const Loading = () => {
  return (
    <Box
      sx={{
        display: "flex",
        height: "calc(100dvh - 7.25rem)",
        width: "100%",
        flexGrow: 1,
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center"
      }}
    >
      <CircularProgress />
    </Box>
  );
};
export default Loading;
