import React, { useState, useEffect } from "react";
import {
  Box,
  Button,
  Checkbox,
  Container,
  FormControlLabel,
  TextField,
  Typography,
  Avatar,
  Stack,
  CssBaseline,
  Grid,
  Paper,
} from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import axios from "axios";
import { toast } from "react-toastify";
import UploadFileIcon from "@mui/icons-material/UploadFile";

const schema = yup.object().shape({
  first_name: yup.string().required("First name is required"),
  last_name: yup.string().required("Last name is required"),
  email: yup.string().email("Invalid email").required("Email is required"),
  password: yup.string().min(3, "At least 3 chars").required("Password is required"),
  profile_pic: yup
    .mixed()
    .test("fileExist", "Profile picture is required", (v) => v && v.length > 0),
});

export default function Registration() {
  const [preview, setPreview] = useState(null);
  const [passwordType, setPasswordType] = useState("password");
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { isSubmitting, errors },
    watch,
  } = useForm({
    resolver: yupResolver(schema),
  });

  useEffect(() => {
    const fileList = watch("profile_pic");
    if (fileList && fileList.length) {
      const objectUrl = URL.createObjectURL(fileList[0]);
      setPreview(objectUrl);
      return () => URL.revokeObjectURL(objectUrl);
    }
    setPreview(null);
  }, [watch("profile_pic")]);

  const onSubmit = async (data) => {
    const formData = new FormData();
    formData.append("first_name", data.first_name);
    formData.append("last_name", data.last_name);
    formData.append("email", data.email);
    formData.append("password", data.password);
    formData.append("profile_pic", data.profile_pic[0]);

    try {
      const res = await axios.post(
        "https://wtsacademy.dedicateddevelopers.us/api/user/signup",
        formData
      );
      if (res.data.status === 200) {
        toast.success(res.data.message);
        navigate("/");
      } else {
        toast.error(res.data.message);
      }
    } catch (err) {
      toast.error("Registration failed");
    }
  };

  return (
    <>
      <CssBaseline />
      <Grid container sx={{ minHeight: "100vh", display: "flex", justifyContent: "center" }}>
        {/* Left Panel */}
        <Grid
          item
          xs={12}
          md={6}
          sx={{
            background: "linear-gradient(135deg, #000000ff, #2a5298)",
            color: "#fff",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: { xs: "center", md: "flex-start" },
            textAlign: { xs: "center", md: "left" },
            px: { xs: 4, md: 8 },
            py: 6,
          }}
        >
          <Box mb={2}>
            <Box
              component="img"
              src="/assets/logo/new.png"
              alt="Logo"
              sx={{ height: { xs: 60, md: 100 } }}
            />
          </Box>
          <Typography variant="h5" gutterBottom>
            Join Us Today
          </Typography>
          <Typography variant="body1" sx={{ maxWidth: 400 }}>
            Create your account to unlock exclusive features, discounts, and personalized content.
          </Typography>
          <Box mt={4}>
            <Typography variant="caption">
              Already have an account?
              <Link to="/" style={{ textDecoration: "none", marginLeft:3 }}>
                      <Typography
                        variant="caption"
                        sx={{
                          color: "secondary.main",
                          textDecoration: "none",
                          "&:hover": {
                            color: "#8fb3f786",
                            textDecoration: "underline",
                          },
                        }}
                      >
                        Back to Login
                      </Typography>
                    </Link>
            </Typography>
          </Box>
        </Grid>

        {/* Right Panel */}
        <Grid
          item
          xs={12}
          md={6}
          component={Paper}
          elevation={4}
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            px: { xs: 4, sm: 10 },
            py: { xs: 4, sm: 6 },
          }}
        >
          <Container maxWidth="sm">
            <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
              <Typography variant="h5" fontWeight={600} textAlign="center" mb={1}>
                Create Account
              </Typography>
              <Typography variant="body2" textAlign="center" color="text.secondary" mb={3}>
                Fill in your details to register
              </Typography>

              <Box component="form" onSubmit={handleSubmit(onSubmit)} noValidate sx={{ width: "100%" }}>
                <Stack spacing={2}>
                  <TextField
                    fullWidth
                    size="small"
                    margin="dense"
                    label="First Name"
                    {...register("first_name")}
                    error={!!errors.first_name}
                    helperText={errors.first_name?.message}
                  />
                  <TextField
                    fullWidth
                    size="small"
                    margin="dense"
                    label="Last Name"
                    {...register("last_name")}
                    error={!!errors.last_name}
                    helperText={errors.last_name?.message}
                  />
                  <TextField
                    fullWidth
                    size="small"
                    margin="dense"
                    label="Email Address"
                    {...register("email")}
                    error={!!errors.email}
                    helperText={errors.email?.message}
                    autoComplete="email"
                  />
                  <TextField
                    fullWidth
                    size="small"
                    margin="dense"
                    label="Password"
                    type={passwordType}
                    {...register("password")}
                    error={!!errors.password}
                    helperText={errors.password?.message}
                    autoComplete="new-password"
                  />

                  <input
                    type="file"
                    accept="image/*"
                    {...register("profile_pic")}
                    id="profile-upload"
                    style={{ display: "none" }}
                  />
                  <label htmlFor="profile-upload">
                    <Button
                      variant="outlined"
                      color="primary"
                      component="span"
                      fullWidth
                      sx={{ textTransform: "none", mt: 1 }}
                    >
                      <UploadFileIcon />
                      Upload Profile Picture
                    </Button>
                  </label>
                  {errors.profile_pic && (
                    <Typography color="error" variant="body2">
                      {errors.profile_pic.message}
                    </Typography>
                  )}

                  <Box display="flex" justifyContent="center" mt={2}>
                    {preview ? (
                      <Avatar src={preview} alt="Profile Preview" sx={{ width: 80, height: 80 }} />
                    ) : (
                      <Typography variant="body2" color="text.secondary">
                        No image selected
                      </Typography>
                    )}
                  </Box>

                  <Box display="flex" justifyContent="space-between" alignItems="center">
                    <FormControlLabel
                      control={
                        <Checkbox
                          onClick={() =>
                            setPasswordType((prev) => (prev === "password" ? "text" : "password"))
                          }
                        />
                      }
                      label="Show Password"
                    />
                    
                  </Box>

                  <Button
                    type="submit"
                    variant="contained"
                    fullWidth
                    disabled={isSubmitting}
                    sx={{
                      py: 1.25,
                      fontWeight: 600,
                      textTransform: "none",
                    }}
                  >
                    {isSubmitting ? "Registering..." : "Register"}
                  </Button>
                </Stack>
              </Box>
            </Box>
          </Container>
        </Grid>
      </Grid>
    </>
  );
}
