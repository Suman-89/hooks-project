import React from "react";
import { Box, Grid, Typography, Link, Divider, IconButton } from "@mui/material";
import { Facebook, Twitter, Instagram, Language } from "@mui/icons-material";

export default function Footer() {
  return (
    <Box component="footer" sx={{ bgcolor: "primary.dark", color: "grey.200", mt: 4, pt: 4 }}>
      {/* Top Section */}
      <Grid container spacing={4} maxWidth="lg" sx={{ mx: "auto", px: 2 }}>
        {/* Brand Info */}
        <Grid >
          <Typography variant="h6" component="div">
            <Box
              component="img"
              src="/assets/logo/new.png"
              alt="Logo"
              sx={{ height: 60 }}
            />
          </Typography>
          <Typography variant="body2" color="grey.500">
            The best place to buy amazing products. Quality guaranteed.
          </Typography>
        </Grid>

        {/* Quick Links */}
        <Grid >
          <Typography variant="subtitle1" sx={{ fontWeight: "bold", mb: 1 }}>
            Quick Links
          </Typography>
          <Box sx={{ display: "flex", flexDirection: "column", gap: 0.5 }}>
            <Link href="/cms/list" underline="hover" color="secondary" variant="body2">
              Home
            </Link>
            <Link href="/cms/list" underline="hover" color="secondary" variant="body2">
              Products
            </Link>
            <Link href="/cms/list" underline="hover" color="secondary" variant="body2">
              About Us
            </Link>
            <Link href="/cms/list" underline="hover" color="secondary" variant="body2">
              Contact
            </Link>
          </Box>
        </Grid>

        {/* Contact Info */}
        <Grid >
          <Typography variant="subtitle1" sx={{ fontWeight: "bold", mb: 1 }}>
            Contact
          </Typography>
          <Typography variant="body2" color="grey.500">📍 123 Market Street, Mumbai, India</Typography>
          <Typography variant="body2" color="grey.500">📞 +91 98765 43210</Typography>
          <Typography variant="body2" color="grey.500">✉ support@myshop.com</Typography>
        </Grid>

        {/* Socials */}
        <Grid >
          <Typography variant="subtitle1" sx={{ fontWeight: "bold", mb: 1 }}>
            Follow Us
          </Typography>
          <Box sx={{ display: "flex", gap: 1 }}>
            <IconButton color="secondary" href="#">
              <Language />
            </IconButton>
            <IconButton color="secondary" href="#">
              <Twitter />
            </IconButton>
            <IconButton color="secondary" href="#">
              <Facebook />
            </IconButton>
            <IconButton color="secondary" href="#">
              <Instagram />
            </IconButton>
          </Box>
        </Grid>
      </Grid>

      {/* Bottom Section */}
      <Divider sx={{ bgcolor: "grey.600", mt: 3 }} />
      <Box sx={{ textAlign: "center", py: 2 }}>
        <Typography variant="body2" color="grey.500">
          © {new Date().getFullYear()} The Grocery Connection. All Rights Reserved.
        </Typography>
      </Box>
    </Box>
  );
}
