import { useEffect, useState } from "react";

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
import { useAuth } from "~/context/AuthContext";

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
  const { authState, setAuthState } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  useEffect(() => {
    if (authState.token?.accessToken) {
      let routePath = "/admin";
      if (location?.state?.pathname) {
        routePath = location.state?.pathname;
      }
      navigate(routePath);
    }
  }, [location.state?.pathname, navigate, authState?.token?.accessToken]);

  const handleSubmit = (event) => {
    event.preventDefault();
    // DUMMY
    const data = {
      token: {
        refresh: "asdnaksldn",
        accessToken: "esdxasdkjn"
      },
      user: {
        name: "Esteban",
        email
      }
    };
    localStorage.setItem("auth", JSON.stringify(data));
    setAuthState(data);
    navigate("/admin");
  };

  return (
    <Stack className={classes.root} flexDirection="row" alignItems="center" justifyContent="center">
      <Container component="main" maxWidth="xs" className={classes.formWrapper}>
        <Stack flexDirection="column" alignItems="left" justifyContent="center">
          <h2>Login</h2>
          <Box component="form" onSubmit={handleSubmit} noValidate>
            <TextField
              margin="normal"
              required
              fullWidth
              value={email}
              label="Email Address"
              name="email"
              autoComplete="email"
              onChange={({ target }) => setEmail(target.value)}
              autoFocus
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              value={password}
              onChange={({ target }) => setPassword(target.value)}
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
