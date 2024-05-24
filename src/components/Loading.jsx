import { CircularProgress, styled } from "@mui/material";
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
const Loading = () => {
  return (
    <Wrapper>
      <CircularProgress />
    </Wrapper>
  );
};
export default Loading;
