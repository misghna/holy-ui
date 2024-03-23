import { Box, Typography } from "@mui/material";
import { makeStyles } from "@mui/styles";

const useStyles = makeStyles((theme) => ({
  root: {
    height: "85dvh",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "column",
    padding: theme.spacing(4),
    backgroundColor: theme.palette.background.default
  }
}));

const ErrorPage = () => {
  const classes = useStyles();

  return (
    <Box className={classes.root}>
      <Typography variant="h3" gutterBottom>
        404 Not Found
      </Typography>
      <Typography variant="body1">
        The page you are looking for was not found. Please check the URL and try again.
      </Typography>
    </Box>
  );
};

export default ErrorPage;
