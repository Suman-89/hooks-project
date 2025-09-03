import {
  Box,
  Button,
  Checkbox,
  Container,
  FormControl,
  FormControlLabel,
  FormLabel,
  TextField,
  Typography,
  Stack,
  CssBaseline,
} from "@mui/material";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { Link, useNavigate } from "react-router-dom";
import AxiosInstance from "../../../api/axios/axios";
import { endPoints } from "../../../api/endpoints/endpoint";
import { toast } from "react-toastify";
import { useTokenStore } from "../../../zustand/store";

const schema = yup.object().shape({
  email: yup.string().email("Invalid email format").required("Email is required"),
  password: yup.string().min(3, "Password must be at least 3 characters").required("Password is required"),
});

export default function Login() {
  const setToken = useTokenStore((state) => state.setToken);
  const navigate = useNavigate();
  const [passwordType, setPasswordType] = useState("password");

  const {
    register,
    handleSubmit,
    formState: { isSubmitting, errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit = async (data) => {
    const formData = new FormData();
    formData.append("email", data.email);
    formData.append("password", data.password);
    try {
      const response = await AxiosInstance.post(endPoints.auth.signin, formData);
      if (response.data.status === 200) {
        localStorage.setItem("token", response.data.token);
        toast.success(response.data.message);
        setToken();
        navigate("/cms/list");
        window.location.reload();
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      toast.error("Login failed");
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
              backgroundColor: "#ffffff",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <Typography variant="h5" fontWeight={600} textAlign="center" mb={1}>
              Sign In
            </Typography>
            <Typography variant="body2" textAlign="center" color="text.secondary" mb={3}>
              Enter your credentials to access the dashboard
            </Typography>

            <Box component="form" onSubmit={handleSubmit(onSubmit)} noValidate sx={{ width: "100%" }}>
              <Stack spacing={2}>
                <FormControl fullWidth>
                  <FormLabel>Email Address</FormLabel>
                  <TextField
                    {...register("email")}
                    error={!!errors.email}
                    helperText={errors.email?.message}
                    autoComplete="email"
                    variant="outlined"
                    fullWidth
                  />
                </FormControl>

                <FormControl fullWidth>
                  <FormLabel>Password</FormLabel>
                  <TextField
                    {...register("password")}
                    type={passwordType}
                    error={!!errors.password}
                    helperText={errors.password?.message}
                    autoComplete="current-password"
                    variant="outlined"
                    fullWidth
                  />
                </FormControl>

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
                  <Link to="/auth/register" style={{ textDecoration: "none" }}>
                    <Typography variant="body2"  sx={{
                        color: "primary.main",            
                        textDecoration: "none",          
                        "&:hover": {
                          color: "secondary.main",        
                          textDecoration: "underline",    
                        },
                      }}>
                      Create Account
                    </Typography>
                  </Link>
                </Box>

                <Button
                  type="submit"
                  variant="contained"
                  fullWidth
                  disabled={isSubmitting}
                  sx={{
                    py: 1.5,
                    fontWeight: 600,
                    textTransform: "none",
                     backgroundColor: "primary",
                    ":hover": { backgroundColor: "secondary" },
                  }}
                >
                  {isSubmitting ? "Signing in..." : "Sign In"}
                </Button>
              </Stack>
            </Box>
          </Box>
        </Container>
      </Box>
    </>
  );
}
