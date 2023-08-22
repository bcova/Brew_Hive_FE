import React,{useState} from "react";
import { useNavigate } from "react-router-dom";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import Container from "@mui/material/Container";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import Tooltip from "@mui/material/Tooltip";
import MenuItem from "@mui/material/MenuItem";
import navLogo from "../assets/navLogo.png";
import Selfie from "../assets/selfie.jpg";

const pages = ["Products", "Pricing", "Blog"];
const settings = ["Profile", "Account","Logout"];

function Navbar() {
  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);
  const navigate = useNavigate();
  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const handleLogOut = () => {
    sessionStorage.removeItem("Logged_In");
    sessionStorage.removeItem("Token");
    sessionStorage.removeItem("User_Info");
    navigate("/");
  }

  const userInfo = sessionStorage.getItem('User_Info')
const storedObject = JSON.parse(userInfo);
const username = storedObject.username

  
  return (

    <AppBar position="fixed"  >
      <Container maxWidth={'true'}  >
        <Toolbar  disableGutters sx={{display:"flex", justifyContent:"space-between"}}>
          <Avatar
            src={navLogo}
            component="a"
            href="/"
            sx={{
              display: { xs: "none", md: "flex" },width:"100px", height:"70px",position:'relative',
              right:'24px'
            }}
              variant="square"
          />
          <Box  sx={{ flexGrow: 0, display: { xs: "flex", md: "none" },   }}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <MenuIcon color="secondary" />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "left",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "left",
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: "block", md: "none",".MuiPaper-root ":{
                  backgroundColor:'secondary.main'
                }},
              }}
              
            >
              {pages.map((page) => (
                <MenuItem key={page} onClick={handleCloseNavMenu}>
                  <Typography textAlign="center">{page}</Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>
          <Avatar
            src={navLogo}
            component="a"
            href="/"
            sx={{
              mr: 2,
              display: { xs: "flex", md: "none" },
              width:"100px",
              height:"65px",
              bgcolor:'white'
            }}
            variant="square"
          />
          <Box sx={{ flexGrow: 0, display: { xs: "none", md: "flex" } }}>
            {pages.map((page) => (
              <Button
                key={page}
                onClick={handleCloseNavMenu}
                sx={{ my: 2, color: "secondary.main", display: "block",fontWeight:'bold' }}
              >
                {page}
              </Button>
            ))}
          </Box>

          <Box sx={{ flexGrow: 0,}}>
            <Tooltip title="Open settings">
              <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                <Avatar alt="Avatar" src={Selfie} />
              </IconButton>
            </Tooltip>
            <Menu
              sx={{ mt: "45px"}}
              id="menu-appbar"
              anchorEl={anchorElUser}
              anchorOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
            >
              {settings.map((setting) => (
                <MenuItem key={setting} onClick={handleCloseUserMenu}  >
                {setting == 'Logout' ?<Button variant="contained" onClick={handleLogOut} textAlign="center">{setting}</Button>: <Button variant="contained" textAlign="center">{setting}</Button>}
                </MenuItem>
              ))}
            </Menu>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}
export default Navbar;
