import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import {
  Box,
  Button,
  Checkbox,
  Container,
  FormControlLabel,
  //   Link,
  TextField,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import AxiosInstance from "../../../api/axios/axios";
import { endPoints } from "../../../api/endpoints/endpoint";
import Navbar from "../../layout/navbar/navbar";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { useTokenStore } from "../../../zustand/store";

const schema = yup.object().shape({
  email: yup
    .string()
    .email("Invalid email format")
    .required("Email is required"),
  password: yup
    .string()
    .min(3, "Password must be at least 3 characters")
    .required("Password is required"),
});

export default function Login() {
  const setToken = useTokenStore((state) => state.setToken);
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { isSubmitting, errors },
  } = useForm({
    resolver: yupResolver(schema),
  });


  const onSubmit = async (data) => {
    // FormData() function is initializing an object => it is a constructor
    const formData = new FormData();
    formData.append("email", data.email);
    formData.append("password", data.password);
    try {
      const response = await AxiosInstance.post(
        endPoints.auth.signin,
        formData
      );
      // console.log(response)
      if (response.data.status === 200) {
        localStorage.setItem("token", response.data.token);
        toast(response.data.message);
        setToken();
        navigate("/cms/list");
        window.location.reload();

      } else {
        toast(response.data.message);
      }
      return response;
    } catch (error) {
      toast(response);
    }
  };

  return (
    <>
      <Container maxWidth="sm">
        <Box display="flex" flexDirection="column" alignItems="center" mt={5}>
          <Typography variant="h4" gutterBottom>
            Login Page
          </Typography>
          <Typography variant="body1" textAlign="center" mb={2}>
            Login using your registered email and password.
          </Typography>
          <Box component="form" onSubmit={handleSubmit(onSubmit)} width="100%">
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
              {...register("password")}
              //   type={passwordType}
              error={!!errors.password}
              helperText={errors.password?.message}
              margin="normal"
              variant="outlined"
            />

            <Box
              display="flex"
              justifyContent="space-between"
              alignItems="center"
              mt={1}
            >
              <FormControlLabel
                control={
                  <Checkbox
                  //   onClick={() =>
                  //     setPasswordType((prev) =>
                  //       prev === "password" ? "text" : "password"
                  //     )
                  //   }
                  />
                }
                label="Show Password"
              />
              <Typography variant="body2">
                <Link to="/auth/register">Go to register</Link>
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
                disabled={isSubmitting}
              >
                Sign in
              </Button>
            )}
          </Box>
        </Box>
      </Container>
    </>
  );
}
