import React, { useEffect } from "react";
import { useTokenStore } from "../../../zustand/store";
import { useNavigate, Link } from "react-router-dom";
import { toast } from "react-toastify";
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Box,
  IconButton,
  Menu,
  MenuItem,
  Avatar,
  Divider,
  ListItemIcon,
} from "@mui/material";
import Tooltip from "@mui/material/Tooltip";
// import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import ShoppingCartCheckoutIcon from "@mui/icons-material/ShoppingCartCheckout";
import PersonAdd from "@mui/icons-material/PersonAdd";
import Settings from "@mui/icons-material/Settings";
import Logout from "@mui/icons-material/Logout";

import LogoutIcon from "@mui/icons-material/Logout";

export default function Navbar() {
  const navigate = useNavigate();
  const token = useTokenStore((state) => state.token);
  const setToken = useTokenStore((state) => state.setToken);
  const [anchorEl, setAnchorEl] = React.useState(null);


  const user = localStorage.getItem("user_email");
  const user_icon = user.slice(0,1).toUpperCase();


  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  useEffect(() => {
    setToken();
  }, []);

  const handleLogout = () => {
    if (token) {
      localStorage.removeItem("token");
      setToken();
      toast("Logout successfully");
      setTimeout(() => {
        navigate("/");
        window.location.reload();
      }, 1000);
    }
  };


  return (
    <>
      {token && (
        <AppBar position="static" color="primary">
          <Toolbar sx={{ justifyContent: "space-between" }}>
            <Typography variant="h6" component="div">
              <Box
                component="img"
                src="/src/assets/logo.png"
                alt="Logo"
                sx={{ height: 100 }}
              />
            </Typography>

            <Box sx={{ display: "flex", gap: 2 }}>
              <Button color="inherit" component={Link} to="/cms/list">
                Home
              </Button>
              <React.Fragment>
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    textAlign: "center",
                  }}
                >
                  {/* <Typography sx={{ minWidth: 100 }}>Contact</Typography>
                  <Typography sx={{ minWidth: 100 }}>Profile</Typography> */}
                  <Tooltip title="Account settings">
                    <IconButton
                      onClick={handleClick}
                      size="small"
                      sx={{ ml: 2}}
                      aria-controls={open ? "account-menu" : undefined}
                      aria-haspopup="true"
                      aria-expanded={open ? "true" : undefined}
                    >
                      <Avatar sx={(color)=>({ width: 32, height: 32, backgroundColor: color.palette.success.main})}>{user_icon}</Avatar>
                    </IconButton>
                  </Tooltip>
                </Box>
                <Menu
                  anchorEl={anchorEl}
                  id="account-menu"
                  open={open}
                  onClose={handleClose}
                  onClick={handleClose}
                  slotProps={{
                    paper: {
                      elevation: 0,
                      sx: {
                        overflow: "visible",
                        filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
                        mt: 1.5,
                        "& .MuiAvatar-root": {
                          width: 32,
                          height: 32,
                          ml: -0.5,
                          mr: 1,
                        },
                        "&::before": {
                          content: '""',
                          display: "block",
                          position: "absolute",
                          top: 0,
                          right: 14,
                          width: 10,
                          height: 10,
                          bgcolor: "background.paper",
                          transform: "translateY(-50%) rotate(45deg)",
                          zIndex: 0,
                        },
                      },
                    },
                  }}
                  transformOrigin={{ horizontal: "right", vertical: "top" }}
                  anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
                >
                  <MenuItem onClick={()=>navigate("/auth/profile")}>
                    <Avatar /> Profile
                  </MenuItem>
                  {/* <MenuItem onClick={handleClose}>
                    <Avatar /> My account
                  </MenuItem> */}
                  <Divider />
                  <MenuItem onClick={()=>navigate("/cms/cart")}>
                    <ListItemIcon>
                      <ShoppingCartCheckoutIcon />
                    </ListItemIcon>
                    Go to Cart
                  </MenuItem>

                  <MenuItem onClick={handleLogout}>
                    <ListItemIcon>
                      <Logout fontSize="small" />
                    </ListItemIcon>
                    Logout
                  </MenuItem>
                </Menu>
              </React.Fragment>

              {/* <IconButton color="inherit" onClick={handleLogout}>
                <LogoutIcon />
              </IconButton> */}
            </Box>
          </Toolbar>
        </AppBar>
      )}
    </>
  );
}
