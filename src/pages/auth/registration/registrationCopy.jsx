import { schema } from '@hookform/resolvers/ajv/src/__tests__/__fixtures__/data.js';
import { yupResolver } from '@hookform/resolvers/yup';
import { Box, Button, Checkbox, Container, FormControlLabel, TextField, Typography } from '@mui/material';
import React from 'react'
import { useForm } from 'react-hook-form';
import { Link } from 'react-router-dom';
import * as yup from "yup";


export default function RegistrationCopy() {

     const {
            register,
            handleSubmit,
            formState: { errors },
          } = useForm({
            resolver: yupResolver(schema),
          });

  return (
    <>
      <Container maxWidth="sm">
        <Box display="flex" flexDirection="column" alignItems="center" mt={5}>
          <Typography variant="h4" gutterBottom>
            Registration Page
          </Typography>
          <Typography variant="body1" textAlign="center" mb={2}>
            Create new
          </Typography>
          <Box component="form" 
        //   onSubmit={handleSubmit(onSubmit)} 
          width="100%">
            <TextField
              fullWidth
              label="First name"
            //   {...register("email")}
            //   error={!!errors.email}
            //   helperText={errors.email?.message}
              margin="normal"
              variant="outlined"
            />
            <TextField
              fullWidth
              label="Last name"
            //   {...register("email")}
            //   error={!!errors.email}
            //   helperText={errors.email?.message}
              margin="normal"
              variant="outlined"
            />
            <TextField
              fullWidth
              label="Email"
            //   {...register("email")}
            //   error={!!errors.email}
            //   helperText={errors.email?.message}
              margin="normal"
              variant="outlined"
            />
            <TextField
              fullWidth
              label="Password"
            //   {...register("password")}
            //   type={passwordType}
            //   error={!!errors.password}
            //   helperText={errors.password?.message}
              margin="normal"
              variant="outlined"
            />
            <TextField
              fullWidth
              label="Email"
            //   {...register("email")}
            //   error={!!errors.email}
            //   helperText={errors.email?.message}
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
                <Link to="/">Go to login</Link>
              </Typography>
            </Box>

            <Button
              type="submit"
              variant="contained"
              color="primary"
              fullWidth
              sx={{ mt: 2 }}
              // disabled={loading}
            >Button
              {/* {loading ? <CircularProgress size={24} color="inherit" /> : "Login"} */}
            </Button>
          </Box>
        </Box>
      </Container>
    </>
  )
}
