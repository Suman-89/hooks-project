import React, { useState, useEffect } from "react";
import {
  Box,
  Button,
  Container,
  TextField,
  Typography,
} from "@mui/material";
import { Link, useParams, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { toast } from "react-toastify";
import { useDropzone } from "react-dropzone";
import AxiosInstance, { image } from "../../../api/axios/axios";
import { endPoints } from "../../../api/endpoints/endpoint";

const schema = yup.object().shape({
  title: yup.string().required("Title is required"),
  description: yup.string().required("Description is required"),
  image: yup.mixed().nullable(), // optional during update
});

export default function Update() {
  const [preview, setPreview] = useState(null);
  const [details, setDetails] = useState(null);
  const { id } = useParams();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    setValue,
    formState: { isSubmitting, errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  // Dropzone setup
  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    accept: { "image/*": [] },
    multiple: false,
    onDrop: (acceptedFiles) => {
      if (acceptedFiles && acceptedFiles.length > 0) {
        const file = acceptedFiles[0];
        setValue("image", acceptedFiles, { shouldValidate: true });
        const objectUrl = URL.createObjectURL(file);
        setPreview(objectUrl);
      }
    },
  });

  // Cleanup preview URL when component unmounts
  useEffect(() => {
    return () => {
      if (preview) URL.revokeObjectURL(preview);
    };
  }, [preview]);

  // Fetch record by ID
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await AxiosInstance.get(`${endPoints.cms.details}/${id}`);
        setDetails(res.data.data);
      } catch (err) {
        console.error(err);
      }
    };
    fetchData();
  }, [id]);

  // Set initial values when data is fetched
  useEffect(() => {
    if (details) {
      setValue("title", details.title || "");
      setValue("description", details.description || "");
    }
  }, [details, setValue]);

  // Handle submit
  const onSubmit = async (data) => {
    const formData = new FormData();
    formData.append("id", id);
    formData.append("title", data.title);
    formData.append("description", data.description);

    if (data.image && data.image.length > 0) {
      formData.append("image", data.image[0]);
    }

    try {
      const response = await AxiosInstance.post(endPoints.cms.update, formData);
      if (response.data.status === 200) {
        toast.success(response.data.message);
        navigate("/cms/list"); // go back home after update
      }
    } catch (error) {
      console.error("Update failed", error);
      toast.error("Update failed");
    }
  };

  return (
    <Container maxWidth="sm">
      <Box display="flex" flexDirection="column" alignItems="center" mt={5}>
        <Typography variant="h4" gutterBottom>
          Update Info
        </Typography>

        <Box
          component="form"
          onSubmit={handleSubmit(onSubmit)}
          width="100%"
          noValidate
        >
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

          {/* Dropzone Upload Box */}
          <Box
            {...getRootProps()}
            sx={{
              border: "2px dashed #aaa",
              borderRadius: "10px",
              p: 3,
              textAlign: "center",
              cursor: "pointer",
              mt: 2,
              backgroundColor: isDragActive ? "#f0f8ff" : "transparent",
            }}
          >
            <input {...getInputProps()} />
            {isDragActive ? (
              <Typography>Drop the file here ...</Typography>
            ) : (
              <Typography>
                Drag & drop an image here, or click to select
              </Typography>
            )}
          </Box>
          {errors.image && (
            <Typography color="error">{errors.image.message}</Typography>
          )}

          {/* Image Preview */}
          {preview ? (
            <Box
              component="img"
              sx={{
                height: 200,
                width: 400,
                margin: "15px auto 0",
                borderRadius: "10px",
                display: "block",
              }}
              src={preview}
              alt="Preview"
            />
          ) : details?.image ? (
            <Box
              component="img"
              sx={{
                height: 200,
                width: 400,
                margin: "15px auto 0",
                borderRadius: "10px",
                display: "block",
              }}
              src={image(details.image)}
              alt="Current"
            />
          ) : (
            <Typography mt={2} textAlign="center">
              No image uploaded yet
            </Typography>
          )}

          <Box mt={3}>
            <Button
              type="submit"
              variant="contained"
              color="primary"
              fullWidth
              disabled={isSubmitting}
            >
              {isSubmitting ? "Loading..." : "Update"}
            </Button>
          </Box>
        </Box>

        <Box mt={2}>
          <Typography variant="body2">
            <Link to="/">Go to Home</Link>
          </Typography>
        </Box>
      </Box>
    </Container>
  );
}
