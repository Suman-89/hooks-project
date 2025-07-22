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
import Navbar from "../layout/navbar/navbar";
import AxiosInstance from "../../api/axios/axios";
import { endPoints } from "../../api/endpoints/endpoint";
import { toast } from "react-toastify";
// import { useNavigate } from 'react-router-dom';

const schema = yup.object().shape({
  title: yup.string().required("Title is required"),
  description: yup.string().required("Description is required"),
  image: yup
    .mixed()
    .test("fileExist", "Profile picture is required", (value) => {
      return value && value.length > 0;
    }),
});

export default function Create() {
  const [preview, setPreview] = useState(null);

  const {
    register,
    handleSubmit,
    formState: { isSubmitting, errors },
    watch,
  } = useForm({
    resolver: yupResolver(schema),
  });

  const watchFile = watch("image");

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
    formData.append("title", data.title);
    formData.append("description", data.description);
    formData.append("image", data.image[0]);
    console.log("formData");
    try {
      const response = await AxiosInstance.post(endPoints.cms.create, formData);
      console.log("Success:", response);
      if (response.data.status === 200) {
        toast(response.data.message);
      }
    } catch (error) {
      console.error("Registration failed", error);
    }
  };

  return (
    <>
      <Container maxWidth="sm">
        <Box display="flex" flexDirection="column" alignItems="center" mt={5}>
          <Typography variant="h4" gutterBottom>
            Create new
          </Typography>

          <Box component="form" onSubmit={handleSubmit(onSubmit)} width="100%">
            <TextField
              fullWidth
              label="Title"
              {...register("title")}
              error={!!errors.title}
              helperText={errors.title?.message}
              margin="normal"
              variant="outlined"
            />

            <TextField
              fullWidth
              label="Description"
              {...register("description")}
              error={!!errors.description}
              helperText={errors.description?.message}
              margin="normal"
              variant="outlined"
            />

            <input
              type="file"
              accept="image/*"
              {...register("image")}
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
                {errors.image.message}
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
                <Link to="/">Go to Home</Link>
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
                Create
              </Button>
            )}
          </Box>
        </Box>
      </Container>
    </>
  );
}
