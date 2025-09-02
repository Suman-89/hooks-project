import React, { useEffect, useState } from "react";
import {
  Grid,
  Box,
  Button,
  TableRow,
  TableCell,
  Paper,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import { toast } from "react-toastify";
import AxiosInstance from "../../../api/axios/axios";
import { endPoints } from "../../../api/endpoints/endpoint";
import SweetAlertComponent from "../../../components/sweetAlert/sweetAlert";
import RecipeReviewCard from "./card";

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
  color: (theme.vars ?? theme).palette.text.secondary,
}));

export default function List() {
  const [list, setList] = useState([]);
  const [idToDelete, setIdToDelete] = useState("");
  const [open, setOpen] = useState(false);

  const fetchList = async () => {
    try {
      const response = await AxiosInstance.post(endPoints.cms.list);
      setList(response.data.data);
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

  const handleRemove = async () => {
    const formData = new FormData();
    formData.append("id", idToDelete);
    try {
      const response = await AxiosInstance.post(endPoints.cms.remove, formData);
      if (response.data.status === 200) {
        toast.success(response.data.message);
        fetchList(); // Refresh list
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
    <Box sx={{ padding: 3 }}>
      <Grid sx={{ display: "flex", justifyContent: "end" }}>
        <Button
          variant="outlined"
          color="primary"
          href="/cms/create"
          sx={{ padding: 2, marginBottom: 2 }}
        >
          Add New Item
        </Button>
      </Grid>

      <Grid container spacing={2}>
        {Array.isArray(list) && list.length > 0 ? (
          list.map((row) => (
            <Grid item xs={12} sm={6} md={4} key={row._id}>
              <Item>
                <RecipeReviewCard row={row} onDelete={handleDeleteClick} />
              </Item>
            </Grid>
          ))
        ) : (
          <TableRow>
            <TableCell colSpan={7} align="center">
              No data available
            </TableCell>
          </TableRow>
        )}
      </Grid>

      {open && (
        <SweetAlertComponent
          confirm={handleRemove}
          cancel={() => setOpen(false)}
          title="Are you sure?"
          subtitle="You will not be able to recover this!"
        />
      )}
    </Box>
  );
}
