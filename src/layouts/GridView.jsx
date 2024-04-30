import { Box, CircularProgress, Grid, Typography } from "@mui/material";
import { makeStyles } from "@mui/styles";

import CardView from "~/components/Card";
import useGridData from "~/hooks/useGridData";

const useStyles = makeStyles(() => ({
  root: {
    flexGrow: 1
  },
  grid: {
    width: "100%",
    justifyContent: "center"
  }
}));

export default function GridView() {
  const classes = useStyles();
  const { contents: cardData, loading } = useGridData();

  if (loading) {
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
  }
  if (!loading && cardData.length === 0) {
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
        <Typography
          sx={{
            fontSize: "2rem",
            fontWeight: 500,
            color: "text.secondary"
          }}
        >
          No Data Available
        </Typography>
      </Box>
    );
  }
  return (
    <Grid container className={classes.grid}>
      {!loading &&
        cardData.length > 0 &&
        cardData.map((data) => (
          <Grid item xs={12} sm={6} lg={4} key={data.id}>
            <CardView data={data} />
          </Grid>
        ))}
    </Grid>
  );
}
