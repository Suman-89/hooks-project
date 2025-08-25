import * as React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Typography,
  Box,
  Button,
  Grid,
} from "@mui/material";
import AxiosInstance, { image } from "./../../../api/axios/axios";
import { endPoints } from "../../../api/endpoints/endpoint";
import { toast } from "react-toastify";
import SweetAlertComponent from "../../../components/sweetAlert/sweetAlert";

import { styled } from "@mui/material/styles";
import RecipeReviewCard from "./card";

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
  color: (theme.vars ?? theme).palette.text.secondary,
  ...theme.applyStyles("dark", {
    backgroundColor: "#1A2027",
  }),
}));

export default function List() {
  const [list, setList] = React.useState([]);
  const [id, setId] = React.useState("");
  const [open, setOpen] = React.useState(false);
  console.log(list, "list");
  // Delete handler
  const handleRemove = async () => {
    const formData = new FormData();
    formData.append("id", id);
    try {
      const response = await AxiosInstance.post(endPoints.cms.remove, formData);
      if (response.data.status === 200) {
        toast.success(response.data.message);
      } else {
        toast.error(response.data.message);
      }
      const listResponse = await AxiosInstance.post(endPoints.cms.list);
      setList(listResponse.data.data);
    } catch (error) {
      toast.error("Something went wrong");
    }
  };

  React.useEffect(() => {
    async function showData() {
      try {
        const response = await AxiosInstance.post(endPoints.cms.list);
        setList(response.data.data);
      } catch (error) {
        toast.error("Failed to fetch data");
      }
    }
    showData();
  }, []);

  return (
    <>
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

        <Box sx={{ width: "100%" }}>
          <Grid
            container
            rowSpacing={1}
            columnSpacing={{ xs: 1, sm: 2, md: 3 }}
          >
            {Array.isArray(list) && list.length > 0 ? (
              list.map((row) => (
                // console.log(row)
                <Grid key={row._id} size={4}>
                  <Item>
                    <RecipeReviewCard row={row} />
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
        </Box>

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
