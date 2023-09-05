import React,{useState} from "react";
import { MainPage, Login, Register } from "./views";
import Navbar from "./components/Navbar";
import {
  Routes,
  Route,
  BrowserRouter as Router,
  useLocation ,
  Navigate 
} from "react-router-dom";
import CssBaseline from "@mui/material/CssBaseline";
import { ThemeProvider, createTheme } from "@mui/material/styles";
const theme = createTheme({
  palette: {
    primary: {
      main: "#98290C",
    },
    secondary: {
      main: "#FEAE2F",
      second: "#FEC872",
    },
  },
  typography: {
    fontFamily: [
      'Patua One',
    ].join(','),
  },
});
function App() {

  return (
    <>
      <ThemeProvider theme={theme}>  
        <CssBaseline />
        <Router>
          <AppContent />
        </Router>
      </ThemeProvider>
    </>
  );
}

function AppContent() {
  const location = useLocation();

  
  const loggedIn = sessionStorage.getItem("Logged_In")



  // Check if the current route is the login or register route
  const hideNavbar = location.pathname === "/" || location.pathname === "/register";
  return (
    <>
    {!hideNavbar && <Navbar />}
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/register" element={<Register />} />
      {/* Check if loggedIn is true before allowing access */}
      {loggedIn ? (
        <Route path="/main" element={<MainPage />} />
      ) : (
        // Redirect to login if not logged in
        <Route path="/main" element={<Navigate to="/" />} />
      )}
    </Routes>
  </>
);
}


export default App;
