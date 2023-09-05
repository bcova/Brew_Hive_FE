import {
  Button,
  TextField,
  Link,
  Grid,
  Box,
  Typography,
  Container,
  Alert,
  Slide,
  SvgIcon,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import logo from "../assets/Logo.svg";
import React, { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { checkRegisterInputs } from "/src/helpers/input_checkers.jsx";
import registerUser from "../api/users/registerUser";
export default function Register() {
  const [first_name, setFirst_name] = useState("");
  const [last_name, setLast_name] = useState("");
  const [email, setEmail] = useState("");
  const [hashed_Password, setHashed_Password] = useState("");
  const [confirm_Password, setConfirm_Password] = useState("");
  const [signUpError, setSignUpError] = useState(false);
  const [username, setUsername] = useState("");
  const [city, setCity] = useState("");
  const first_nameRef = useRef(null);
  const last_nameRef = useRef(null);
  const usernameRef = useRef(null);
  const cityRef = useRef(null);
  const emailRef = useRef(null);
  const passwordRef = useRef(null);
  const confirmPassRef = useRef(null);
  const containerRef = useRef(null);
  const navigate = useNavigate();


  const handleSubmit = async (e) => {
    e.preventDefault();
    const input_helpers = {
      first_name: first_name,
      last_name: last_name,
      city: city,
      email: email,
      hashed_Password: hashed_Password,
      confirm_Password: confirm_Password,
      username: username,
      first_nameRef: first_nameRef,
      last_nameRef: last_nameRef,
      usernameRef: usernameRef,
      emailRef: emailRef,
      passwordRef: passwordRef,
      confirmPassRef: confirmPassRef,
      cityRef: cityRef,
    };



    const isValidInputs = checkRegisterInputs(input_helpers);
    if (isValidInputs) {
      const user = {
        first_name,
        last_name,
        city,
        email,
        hashed_Password,
        username,
      };
      const registering = await registerUser(user);
      console.log("registering", registering.token );
      if (registering.success === true) {
        sessionStorage.setItem("User_Info", JSON.stringify(user));
        sessionStorage.setItem("Logged_In", true);
        sessionStorage.setItem("Token", registering.token);
        sessionStorage.setItem("User_id", registering.user_id);
        navigate("/main");
      } else setSignUpError(registering);
    } else {
      return;
    }
  };


  return (
    <Container
      component="main"
      maxWidth={"true"}
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
        bgcolor: "secondary.main",
        // overflow: "hidden",
      }}
    >
      <Box
        sx={{
          marginTop: 8,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          width: "400px",
          position: "relative",
          // top: "50px",
        }}
      >
        <Box position="fixed" top="-50px">
          <img src={logo} width="250px"  />
        </Box>
        <Typography component="h1" variant="h5">
          Sign up
        </Typography>
        <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField
                autoComplete="given-name"
                name="first_name"
                required
                fullWidth
                id="first_name"
                label="First Name"
                value={first_name}
                onChange={(e) => setFirst_name(e.target.value)}
                inputRef={first_nameRef}
                autoFocus
                sx={{zIndex: 0}}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                required
                fullWidth
                id="last_name"
                label="Last Name"
                name="last_name"
                autoComplete="family-name"
                value={last_name}
                onChange={(e) => setLast_name(e.target.value)}
                inputRef={last_nameRef}
                sx={{zIndex: 0}}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                id="city"
                label="City,State"
                name="city"
                autoComplete="city"
                value={city}
                onChange={(e) => setCity(e.target.value)}
                inputRef={cityRef}
                sx={{zIndex: 0}}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                id="username"
                label="username"
                name="username"
                autoComplete="family-name"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                inputRef={usernameRef}
                sx={{zIndex: 0}}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                inputRef={emailRef}
                sx={{zIndex: 0}}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                name="hashed_Password"
                label="Password"
                type="password"
                id="hashed_Password"
                autoComplete="new-password"
                value={hashed_Password}
                onChange={(e) => setHashed_Password(e.target.value)}
                inputRef={passwordRef}
              />
            </Grid>
            {/* <Box sx={{ border: 0, p:0, bgcolor: 'transparent',margin:'auto' }}>
        <Box p={0}>
                <List>
                  <ListItem disableGutters>
                    <ListItemIcon>
                      <SvgIcon>
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 24 24"
                          fill={AT_LEAST_8_CHARS_REGEX.test(hashed_Password) ?  "green" :"red"}
                          
                          className="w-6 h-6"
                        >
                          <path
                            fillRule="evenodd"
                            d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12zm13.36-1.814a.75.75 0 10-1.22-.872l-3.236 4.53L9.53 12.22a.75.75 0 00-1.06 1.06l2.25 2.25a.75.75 0 001.14-.094l3.75-5.25z"
                            clipRule="evenodd"
                          />
                        </svg>
                      </SvgIcon>
                    </ListItemIcon>
                    <ListItemText primary="Contains at least 8 characters" />
                  </ListItem>
                  <ListItem disableGutters>
                    <ListItemIcon>
                      <SvgIcon>
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 24 24"
                          fill={UPPERCASE_LETTER_REGEX.test(hashed_Password) ?  "green" :"red"}
                          className="w-6 h-6"
                        >
                          <path
                            fillRule="evenodd"
                            d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12zm13.36-1.814a.75.75 0 10-1.22-.872l-3.236 4.53L9.53 12.22a.75.75 0 00-1.06 1.06l2.25 2.25a.75.75 0 001.14-.094l3.75-5.25z"
                            clipRule="evenodd"
                          />
                        </svg>
                      </SvgIcon>
                    </ListItemIcon>
                    <ListItemText primary="Contains at least 1 uppercase letter" />
                  </ListItem>
                  <ListItem disableGutters>
                    <ListItemIcon>
                      <SvgIcon>
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 24 24"
                          fill={NUMBER_REGEX.test(hashed_Password) ?  "green" :"red"}
                          className="w-6 h-6"
                        >
                          <path
                            fillRule="evenodd"
                            d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12zm13.36-1.814a.75.75 0 10-1.22-.872l-3.236 4.53L9.53 12.22a.75.75 0 00-1.06 1.06l2.25 2.25a.75.75 0 001.14-.094l3.75-5.25z"
                            clipRule="evenodd"
                          />
                        </svg>
                      </SvgIcon>
                    </ListItemIcon>
                    <ListItemText primary="Contains at least 1 number" />
                  </ListItem>
                  <ListItem disableGutters>
                    <ListItemIcon>
                      <SvgIcon>
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 24 24"
                          fill={SPECIAL_CHARACTER_REGEX.test(hashed_Password) ?  "green" :"red"}
                          className="w-6 h-6"
                        >
                          <path
                            fillRule="evenodd"
                            d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12zm13.36-1.814a.75.75 0 10-1.22-.872l-3.236 4.53L9.53 12.22a.75.75 0 00-1.06 1.06l2.25 2.25a.75.75 0 001.14-.094l3.75-5.25z"
                            clipRule="evenodd"
                          />
                        </svg>
                      </SvgIcon>
                    </ListItemIcon>
                    <ListItemText primary="Contains at least 1 special character" />
                  </ListItem>
                </List>
              </Box>
        </Box> */}
            <Grid item xs={12} ref={containerRef}>
              <TextField
                required
                fullWidth
                name="Confirm_Password"
                label="Confirm Password"
                type="password"
                id="Confirm_Password"
                value={confirm_Password}
                onChange={(e) => setConfirm_Password(e.target.value)}
                inputRef={confirmPassRef}
              />
            </Grid>
          </Grid>
          {
            <Slide
              direction="up"
              in={signUpError}
              mountOnEnter
              unmountOnExit
              container={containerRef.current}
            >
              <Alert
                variant="filled"
                severity="error"
                sx={{ margin: "9px 0px 9px 0px" }}
              >
                {signUpError}
              </Alert>
            </Slide>
          }
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 2, mb: 2 }} //changed mb from 2 to 0 
          >
            Sign Up
          </Button>
          <Grid container justifyContent="flex-end">
            <Grid  >
              <Link href="/" variant="body2">
                Already have an account? Sign in
              </Link>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </Container>
  );
}
