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
} from "@mui/material";
import LogoutIcon from "@mui/icons-material/Logout";

export default function Navbar() {
  const navigate = useNavigate();
  const token = useTokenStore((state) => state.token);
  const setToken = useTokenStore((state) => state.setToken);

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
        <AppBar position="static" color="light">
          <Toolbar sx={{ justifyContent: "space-between" }}>
            <Typography variant="h6" component="div">
              My App
            </Typography>

            <Box sx={{ display: "flex", gap: 2 }}>
              <Button color="inherit" component={Link} to="/auth/profile">
                Profile
              </Button>
              <Button color="inherit" component={Link} to="/cms/list">
                List
              </Button>
              <Button color="inherit" component={Link} to="/cms/create">
                Create
              </Button>

              <IconButton color="inherit" onClick={handleLogout}>
                <LogoutIcon />
              </IconButton>
            </Box>
          </Toolbar>
        </AppBar>
      )}
    </>
  );
}
