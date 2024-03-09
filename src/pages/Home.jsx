import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import { makeStyles } from "@mui/styles";

const useStyles = makeStyles((theme) => ({
  heroContent: {
    paddingTop: theme.spacing(10),
    paddingBottom: theme.spacing(5),
    textAlign: "center"
  }
}));

function Home() {
  const classes = useStyles();

  return (
    <Box className={classes.heroContent}>
      <Grid container spacing={2}>
        <Grid item xs={12} md={12}>
          <Typography variant="h1" component="h1">
            Welcome to Our Church!
          </Typography>
          <Typography variant="body1" component="p">
            Join us for worship, fellowship and community. We are a vibrant, loving church that welcomes everyone.
          </Typography>
        </Grid>
        <Grid item xs={12} md={6}></Grid>
      </Grid>
    </Box>
  );
}

export default Home;
