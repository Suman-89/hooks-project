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
} from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import axios from "axios";
import { toast } from "react-toastify";
import UploadFileIcon from '@mui/icons-material/UploadFile';

const schema = yup.object().shape({
  first_name: yup.string().required("First name is required"),
  last_name: yup.string().required("Last name is required"),
  email: yup.string().email("Invalid email").required("Email is required"),
  password: yup.string().min(3, "At least 3 chars").required("Password is required"),
  profile_pic: yup
    .mixed()
    .test("fileExist", "Profile picture is required", v => v && v.length > 0),
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

  // Preview uploaded image
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
      <Box
        sx={{
          minHeight: "100vh",
          backgroundColor: "#f0f2f5",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          px: 2,
        }}
      >
        <Container maxWidth="sm">
          <Box
            sx={{
              p: { xs: 3, sm: 4 },
              borderRadius: 3,
              boxShadow: 4,
              backgroundColor: "#fff",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <Typography variant="h5" fontWeight={600} textAlign="center" mb={1}>
              Create Account
            </Typography>
            <Typography
              variant="body2"
              textAlign="center"
              color="text.secondary"
              mb={3}
            >
              Fill in your details to register
            </Typography>

            <Box
              component="form"
              onSubmit={handleSubmit(onSubmit)}
              noValidate
              sx={{ width: "100%" }}
            >
              <Stack spacing={2}>
                {/** All TextFields are now size="small" & margin="dense" **/}
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
                    <Avatar
                      src={preview}
                      alt="Profile Preview"
                      sx={{ width: 80, height: 80 }}
                    />
                  ) : (
                    <Typography variant="body2" color="text.secondary">
                      No image selected
                    </Typography>
                  )}
                </Box>

                <Box
                  display="flex"
                  justifyContent="space-between"
                  alignItems="center"
                >
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
                  <Link to="/" style={{ textDecoration: "none" }}>
                    <Typography
                      variant="body2"
                      // component={RouterLink}
                      to="/"
                      sx={{
                        color: "primary.main",            // default text color
                        textDecoration: "none",           // remove underline
                        "&:hover": {
                          color: "secondary.main",        // on hover, use secondary color
                          textDecoration: "underline",    // optional hover decoration
                        },
                      }}
                    >
                      Back to Login
                    </Typography>
                  </Link>
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
                    backgroundColor: "primary",
                    ":hover": { backgroundColor: "secondary" },
                  }}
                >
                  {isSubmitting ? "Registering..." : "Register"}
                </Button>
              </Stack>
            </Box>
          </Box>
        </Container>
      </Box>
    </>
  );
}
