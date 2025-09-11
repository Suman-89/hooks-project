import React, { useEffect, useState } from "react";
import {
  Grid,
  Box,
  Button,
  Typography,
  Paper,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import { toast } from "react-toastify";
import AxiosInstance from "../../../api/axios/axios";
import { endPoints } from "../../../api/endpoints/endpoint";
import SweetAlertComponent from "../../../components/sweetAlert/sweetAlert";
import RecipeReviewCard from "./card";
import HeroCarousel from "../../../components/hero";

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: "#fff",
  boxShadow: theme.shadows[3],
  borderRadius: theme.shape.borderRadius,
  padding: theme.spacing(2),
  height: "100%",
}));

export default function List() {
  const [list, setList] = useState([]);
  const [idToDelete, setIdToDelete] = useState("");
  const [open, setOpen] = useState(false);

  const fetchList = async () => {
    try {
      const response = await AxiosInstance.post(endPoints.cms.list);
      setList(response.data.data);
      localStorage.setItem("list", JSON.stringify(response.data.data));
    } catch (error) {
      toast.error("Failed to fetch data");
    }
  };

  useEffect(() => {
    fetchList();
  }, []);

  const handleDeleteClick = (itemId) => {
    setIdToDelete(itemId);
    setOpen(true);
  };

  const handleEdit = (id) =>{
    
  }

  const handleRemove = async () => {
    const formData = new FormData();
    formData.append("id", idToDelete);

    try {
      const response = await AxiosInstance.post(endPoints.cms.remove, formData);

      if (response.data.status === 200) {
        toast.success(response.data.message);
        fetchList();
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      toast.error("Something went wrong");
    } finally {
      setOpen(false);
    }
  };

  return (
    <>
      <HeroCarousel />

      <Box sx={{ px: { xs: 2, md: 6 }, py: 4 }}>
        <Grid container justifyContent="center" sx={{ mb: 3 }}>
          <Button
            variant="contained"
            color="primary"
            href="/cms/create"
            sx={(color)=>({ px: 3, py: 1.5, color:color.palette.secondary.main })}
          >
            Add New Item
          </Button>
        </Grid>

        {Array.isArray(list) && list.length > 0 ? (
          <Grid container spacing={3} sx={{display:"flex",justifyContent:"center", alignItems:"center"}}>
            {list.map((row) => (
              <Grid key={row._id}>
                <Item>
                  <RecipeReviewCard row={row} onDelete={handleDeleteClick} />
                </Item>
              </Grid>
            ))}
          </Grid>
        ) : (
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              height: "30vh",
              textAlign: "center",
            }}
          >
            <Typography variant="h6" color="text.secondary">
              No items found.
            </Typography>
          </Box>
        )}

        {open && (
          <SweetAlertComponent
            confirm={handleRemove}
            cancel={() => setOpen(false)}
            title="Are you sure?"
            subtitle="You will not be able to recover this!"
          />
        )}
      </Box>
    </>
  );
}
