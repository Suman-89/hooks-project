import React, { useState, useEffect } from "react";
import {
  Box,
  Button,
  Container,
  TextField,
  Typography,
} from "@mui/material";
import { Link, useParams } from "react-router-dom";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { toast } from "react-toastify";
import AxiosInstance, { image } from "../../../api/axios/axios";
import { endPoints } from "../../../api/endpoints/endpoint";

const schema = yup.object().shape({
  title: yup.string().required("Title is required"),
  description: yup.string().required("Description is required"),
//   image: yup
//     .mixed()
//     .test("fileExist", "Image is required", (value) => {
//       return value && value.length > 0;
//     }),
});

export default function Update() {
  const [preview, setPreview] = useState(null);
  const [details, setDetails] = useState({});
  const { id } = useParams();
// useparams is used when the path is dynamic
  const {
    register,
    handleSubmit,
    setValue,
    formState: { isSubmitting, errors },
    watch,
  } = useForm({
    resolver: yupResolver(schema),
  });

  const watchFile = watch("image");

  // Handle preview for uploaded file
  useEffect(() => {
    let objectUrl = null;

    if (watchFile && watchFile.length > 0) {
      const file = watchFile[0];
      objectUrl = URL.createObjectURL(file);
      setPreview(objectUrl);
    } else {
      setPreview(null);
    }

    return () => {
      if (objectUrl) URL.revokeObjectURL(objectUrl);
    };
  }, [watchFile]);

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

  const onSubmit = async (data) => {
    const formData = new FormData();
    formData.append("id", id);
    formData.append("title", data.title);
    formData.append("description", data.description);
    formData.append("image", data.image[0]);

    try {
      const response = await AxiosInstance.post(endPoints.cms.update, formData);
      if (response.data.status === 200) {
        toast.success(response.data.message);
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

          <input
            type="file"
            {...register("image")}
            onChange={(e) => {
              const file = e.target.files?.[0];
              if (file) {
                setValue("image", e.target.files, { shouldValidate: true });
              }
            }}
            accept="image/*"
            style={{ marginTop: 16 }}
          />
          {errors.image && (
            <Typography color="error">{errors.image.message}</Typography>
          )}

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
              Drag or drop content here
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