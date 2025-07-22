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
} from "@mui/material";
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from 'react-router-dom';

const schema = yup.object().shape({
  first_name: yup.string().required("First name is required"),
  last_name: yup.string().required("Last name is required"),
  email: yup
    .string()
    .email("Invalid email format")
    .required("Email is required"),
  password: yup
    .string()
    .min(3, "Password must be at least 3 characters")
    .required("Password is required"),
  profile_pic: yup
    .mixed()
    .test("fileExist", "Profile picture is required", (value) => {
      return value && value.length > 0;
    }),
});

export default function Registration() {
  const [preview, setPreview] = useState(null);
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { isSubmitting, errors },
    watch,
  } = useForm({
    resolver: yupResolver(schema),
  });

  const watchFile = watch("profile_pic");

  useEffect(() => {
    if (watchFile && watchFile.length > 0) {
      const file = watchFile[0];
      const objectUrl = URL.createObjectURL(file);
      setPreview(objectUrl);

      return () => URL.revokeObjectURL(objectUrl);
    } else {
      setPreview(null);
    }
  }, [watchFile]);

  const onSubmit = async (data) => {
    const formData = new FormData();
    formData.append("first_name", data.first_name);
    formData.append("last_name", data.last_name);
    formData.append("email", data.email);
    formData.append("password", data.password);
    formData.append("profile_pic", data.profile_pic[0]);

    try {
      const response = await axios.post(
        `https://wtsacademy.dedicateddevelopers.us/api/user/signup`,
        formData
      );
      console.log("Success:", response.data);
      if (response.data.status === 200) {
        toast(response.data.message);
        navigate('/');
      } else toast(response.data.message);
    } catch (error) {
      console.error("Registration failed", error);
      toast(response);
    }
  };

  return (
    <>
      <Container maxWidth="sm">
        <Box display="flex" flexDirection="column" alignItems="center" mt={5}>
          <Typography variant="h4" gutterBottom>
            Registration Page
          </Typography>
          <Typography variant="body1" textAlign="center" mb={2}>
            Create new account
          </Typography>

          <Box component="form" onSubmit={handleSubmit(onSubmit)} width="100%">
            <TextField
              fullWidth
              label="First Name"
              {...register("first_name")}
              error={!!errors.first_name}
              helperText={errors.first_name?.message}
              margin="normal"
              variant="outlined"
            />

            <TextField
              fullWidth
              label="Last Name"
              {...register("last_name")}
              error={!!errors.last_name}
              helperText={errors.last_name?.message}
              margin="normal"
              variant="outlined"
            />

            <TextField
              fullWidth
              label="Email"
              {...register("email")}
              error={!!errors.email}
              helperText={errors.email?.message}
              margin="normal"
              variant="outlined"
            />

            <TextField
              fullWidth
              label="Password"
              type="password"
              {...register("password")}
              error={!!errors.password}
              helperText={errors.password?.message}
              margin="normal"
              variant="outlined"
            />

            <input
              type="file"
              accept="image/*"
              {...register("profile_pic")}
              style={{ display: "none" }}
              id="profile-upload"
            />
            <label htmlFor="profile-upload">
              <Button
                variant="contained"
                component="span"
                sx={{ mt: 2 }}
                fullWidth
              >
                Upload Profile Picture
              </Button>
            </label>
            {errors.profile_pic && (
              <Typography color="error" variant="body2" mt={1}>
                {errors.profile_pic.message}
              </Typography>
            )}

            <Box mt={2} display="flex" justifyContent="center">
              {preview ? (
                <Avatar
                  src={preview}
                  alt="Profile Preview"
                  sx={{ width: 100, height: 100 }}
                />
              ) : (
                <Typography variant="body2" color="textSecondary">
                  No image selected
                </Typography>
              )}
            </Box>

            <Box
              display="flex"
              justifyContent="space-between"
              alignItems="center"
              mt={2}
            >
              <FormControlLabel control={<Checkbox />} label="Show Password" />
              <Typography variant="body2">
                <Link to="/">Go to Login</Link>
              </Typography>
            </Box>
            {isSubmitting ? (
              <Button
                type="submit"
                variant="contained"
                color="primary"
                fullWidth
                sx={{ mt: 2 }}
                disabled={isSubmitting}
              >
                Loading...
              </Button>
            ) : (
              <Button
                type="submit"
                variant="contained"
                color="primary"
                fullWidth
                sx={{ mt: 2 }}
              >
                Register
              </Button>
            )}
            {/* <Button
            type="submit"
            variant="contained"
            color="primary"
            fullWidth
            sx={{ mt: 2 }}
          >
            Register
          </Button> */}
          </Box>
        </Box>
      </Container>
    </>
  );
}
