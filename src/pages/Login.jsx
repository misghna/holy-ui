import { useEffect } from "react";

import {
  Button,
  TextField,
  Link,
  FormControlLabel,
  Checkbox,
  Grid,
  Box,
  Container,
  Stack,
  Typography
} from "@mui/material";
import { makeStyles } from "@mui/styles";
import { useNavigate, useLocation } from "react-router-dom";

import image from "~/assets/home1bg.jpg";

const useStyles = makeStyles(() => ({
  root: {
    width: "100vw",
    height: "100vh"
  },
  formWrapper: {
    backgroundColor: "white",
    height: "80%",
    display: "flex",
    alignItems: "center",
    borderRadius: "12px",
    flexDirection: "column",
    justifyContent: "center"
  },
  imageWrapper: {
    width: "100%",
    height: "100%",
    backgroundImage: `url(${image})`,
    backgroundSize: "cover",
    backgroundRepeat: "no-repeat",
    color: "white",
    // backgroundPositionX: "calc(100vw - 60vw)",
    backgroundPositionY: "calc(100vh - 95vh)"
  }
}));

function Login() {
  const classes = useStyles();
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const user = localStorage.getItem("user");
    if (user) {
      let routePath = "/admin/home";
      if (location?.state?.pathname) {
        routePath = location.state.pathname;
      }
      navigate(routePath);
    }
  }, [location.state.pathname, navigate]);

  const handleSubmit = (event) => {
    event.preventDefault();
    // implement login logic here
  };

  return (
    <Stack className={classes.root} flexDirection="row" fullWidth alignItems="center" justifyContent="center">
      <Container component="main" maxWidth="xs" className={classes.formWrapper}>
        <Stack flexDirection="column" fullWidth alignItems="left" justifyContent="center">
          <h2>Login</h2>
          <Box component="form" onSubmit={handleSubmit} noValidate>
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              autoFocus
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
            />
            <FormControlLabel control={<Checkbox value="remember" color="primary" />} label="Remember me" />
            <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }}>
              Sign In
            </Button>
            <Grid container>
              <Grid item xs>
                <Link href="#" variant="body2">
                  Forgot password?
                </Link>
              </Grid>
              <Grid item>
                <Link href="#" variant="body2">
                  {"Don't have an account? Sign Up"}
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Stack>
      </Container>
      <Container component="section" maxWidth="lg" className={classes.imageWrapper}>
        <Stack
          flexDirection="column"
          justifyContent="center"
          maxWidth="sm"
          p={5}
          mt={12}
          sx={{
            height: "83dvh",
            backgroundColor: "rgba(0,0,0,0.4)"
          }}
        >
          <Typography variant="h4">Join us in faith and fellowship as we grow together in love and service.</Typography>
          <Typography variant="overline">
            Discover the joy of belonging to a vibrant church community where you can deepen your relationship with God
            and make lifelong friendships
          </Typography>
        </Stack>
      </Container>
    </Stack>
  );
}

export default Login;
