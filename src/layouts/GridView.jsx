import { Grid } from "@mui/material";
import { makeStyles } from "@mui/styles";

import CardView from "~/components/Card";
// import useGridData from "~/hooks/useGridData";
import { contentData } from "~/data/contentData";
const useStyles = makeStyles(() => ({
  root: {
    flexGrow: 1
  },
  grid: {
    width: "100%"
  }
}));
// const partialUrl = "a5a4743103745caca161";

export default function GridView() {
  const classes = useStyles();
  // const { cardData } = useGridData(partialUrl);

  return (
    <Grid container className={classes.grid}>
      {contentData &&
        contentData.map((data) => (
          <Grid item xs={12} sm={4} key={data.id}>
            <CardView data={data} />
          </Grid>
        ))}
    </Grid>
  );
}
