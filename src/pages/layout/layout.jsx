import React, { useEffect, useState } from "react";
import Navbar from "./navbar/navbar";
import Footer from "./footer/footer";
import { Box } from "@mui/material";
import HeroCarousel from "../../components/hero";

export default function Layout({ children }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const token = localStorage.getItem("token");

  useEffect(() => {
    if (token) {
      setIsAuthenticated(true);
    }
  }, [token]);

  return (
    <>
      <Box
        display="flex"
        flexDirection="column"
        minHeight="100vh" // full height of viewport
      >
        {isAuthenticated && <Navbar />}
        <Box component="main" flexGrow={1} p={2}>
          {children}
        </Box>
        {isAuthenticated && <Footer />}
      </Box>
    </>
  );
}
