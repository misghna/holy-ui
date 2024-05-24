import { Typography, styled } from "@mui/material";

const Wrapper = styled("div")(() => ({
  display: "flex",
  height: "calc(100dvh - 7.25rem)",
  minHeight: "calc(100dvh - 7.25rem)",
  width: "100%",
  flexGrow: 1,
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center"
}));
const NoData = () => {
  return (
    <Wrapper>
      <Typography
        sx={{
          fontSize: "2rem",
          fontWeight: 500,
          color: "text.secondary"
        }}
      >
        No Data Available
      </Typography>
    </Wrapper>
  );
};
export default NoData;
