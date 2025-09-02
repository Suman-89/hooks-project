import React, { useEffect, useState } from "react";
import AxiosInstance from "../../../api/axios/axios";
import { endPoints } from "../../../api/endpoints/endpoint";
import { toast } from "react-toastify";
import { profile_pic } from "../../../api/axios/axios";
import {
  Avatar,
  Box,
  Button,
  Card,
  Divider,
  Grid,
  IconButton,
  Typography,
} from "@mui/material";
import PeopleIcon from "@mui/icons-material/People";
import ChatBubbleIcon from "@mui/icons-material/ChatBubble";

export default function Profile({ media }) {
  const [user, setUser] = useState({});
  const imageData = profile_pic(media);

  useEffect(() => {
    async function fetchData() {
      try {
        const profile = await AxiosInstance.get(endPoints.auth.profileDetails);
        setUser(profile.data.data);
        toast.success(profile.data.message);
      } catch (error) {
        console.error("Failed to load profile", error);
        toast.error("Failed to load profile");
      }
    }
    fetchData();
  }, []);

  return (
    <Box
      sx={{
        minHeight: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        background: "linear-gradient(135deg, #ff4e94, #ff7eb3)",
        p: 2,
      }}
    >
      <Card
        sx={{
          maxWidth: 400,
          width: "100%",
          borderRadius: 4,
          textAlign: "center",
          p: 3,
          boxShadow: 6,
          position: "relative",
        }}
      >
        {/* Actions */}
        <Grid
          container
          spacing={1}
          sx={{
            position: "absolute",
            top: 16,
            left: "5%",
            width: "90%",
            flexDirection: { xs: "column", sm: "row" }, // responsive
            alignItems: { xs: "flex-start", sm: "center" },
          }}
        >
          <Grid
            item
            xs="auto"
            sx={{ display: "flex", alignItems: "center", gap: 0.5 }}
          >
            <IconButton color="primary" size="small">
              <PeopleIcon />
            </IconButton>
            <Typography variant="caption">Connect</Typography>
          </Grid>

          <Grid
            item
            xs="auto"
            sx={{ display: "flex", alignItems: "center", gap: 0.5 }}
          >
            <IconButton color="primary" size="small">
              <ChatBubbleIcon />
            </IconButton>
            <Typography variant="caption">Message</Typography>
          </Grid>
        </Grid>

        {/* Profile Image */}
        {user.profile_pic && (
          <Box sx={{ mt: { xs: 10, sm: 6 } }}>
            <Avatar
              src={imageData}
              alt="Profile"
              sx={{
                width: 110,
                height: 110,
                border: "6px solid #fff",
                boxShadow: 3,
                mx: "auto",
              }}
            />
          </Box>
        )}

        {/* Name & Info */}
        <Typography variant="h6" sx={{ mt: 2, fontWeight: "600" }}>
          {user.first_name || ""} {user.last_name || ""}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {user.city || "City"}, {user.country || "Country"}
        </Typography>

        <Typography variant="body2" sx={{ mt: 1, color: "text.primary" }}>
          {user.role || "Web Producer - Web Specialist"}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Columbia University - New York
        </Typography>

        {/* Stats */}
        <Grid container justifyContent="space-around" sx={{ my: 3 }}>
          <Grid item>
            <Typography variant="h6">65</Typography>
            <Typography variant="caption" color="text.secondary">
              Friends
            </Typography>
          </Grid>
          <Grid item>
            <Typography variant="h6">43</Typography>
            <Typography variant="caption" color="text.secondary">
              Photos
            </Typography>
          </Grid>
          <Grid item>
            <Typography variant="h6">21</Typography>
            <Typography variant="caption" color="text.secondary">
              Comments
            </Typography>
          </Grid>
        </Grid>

        <Divider sx={{ my: 2 }} />

        {/* Button */}
        <Button
          fullWidth
          sx={{
            borderRadius: "50px",
            py: 1,
            textTransform: "none",
            background: "linear-gradient(to right, #ff4e94, #ff7eb3)",
            color: "white",
            "&:hover": {
              opacity: 0.9,
              background: "linear-gradient(to right, #ff4e94, #ff7eb3)",
            },
          }}
        >
          Show more
        </Button>
      </Card>
    </Box>
  );
}
