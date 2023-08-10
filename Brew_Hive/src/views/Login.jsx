import React, { useState, useEffect,useRef } from "react";
import {
  Button,
  TextField,
  FormControlLabel,
  Checkbox,
  Link,
  Grid,
  Box,
  Typography,
  Container,
  Alert,
  Slide, 
} from "@mui/material";
import logo from "../assets/Logo.svg";
import { disableSubmit } from "/src/helpers/input_checkers.jsx";
import { useNavigate } from "react-router-dom";
import loginUser from "../api/loginUser";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loginError, setLoginError] = useState(false);
  const [disabled, setDisabled] = useState(true);
  const containerRef = useRef(null);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { isMatch } = await loginUser(email, password);
      if (isMatch) {
        sessionStorage.setItem("Logged_In", true);
        navigate("/main");
      }
    } catch (error) {
      setLoginError(true)
      console.log("Error:", error.message);
    }
  };

  useEffect(() => {
    if (loginError) {
      const intervalId = setInterval(() => {
        setLoginError(false); // After 1.5 seconds, set the error back to false
        clearInterval(intervalId); // Clear the interval
      }, 1500); // 1500ms = 1.5 seconds

      return () => {
        clearInterval(intervalId); // Clean up the interval if the component unmounts
      };
    }
  }, [loginError]);


  useEffect(() => {
    setDisabled(disableSubmit(email, password));
  }, [email, password]);

  return (
    <Container
      maxWidth={"true"}
      component="main"
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
        bgcolor: "secondary.main",
      }}
    >
      <Box
        sx={{
          marginTop: 8,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          width: "400px",
        }}
      >
        <Box position="fixed" top="30px">
          <img src={logo} width="300px" />
        </Box>
        <Typography component="h1" variant="h5" ref={containerRef}>
          Sign in
        </Typography>
        {
            <Slide
              direction="up"
              in={loginError}
              mountOnEnter
              unmountOnExit
              container={containerRef.current}
            >
              <Alert
                variant="filled"
                severity="error"
                sx={{ margin: "9px 0px 9px 0px" }}
              >
                Invalid Email or password
              </Alert>
            </Slide>
          }
        <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
          <TextField
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email Address"
            name="Email"
            autoComplete="email"
            value={email}
            autoFocus
            onChange={(e) => {
              setEmail(e.target.value);
            }}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="Password"
            autoComplete="current-password"
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
            }}
          />
          <FormControlLabel
            control={<Checkbox value="remember" color="primary" />}
            label="Remember me"
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
            disabled={disabled}
          >
            Sign In
          </Button>
          <Grid container>
            <Grid item xs>
              <Link href="#" variant="body2">
                Forgot password?
              </Link>
            </Grid>
            <Grid item>
              <Link href="register" variant="body2">
                {"Don't have an account? Sign Up"}
              </Link>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </Container>
  );
}
