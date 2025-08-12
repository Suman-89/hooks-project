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

import { styled } from '@mui/material/styles';
import RecipeReviewCard from "./card";

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: (theme.vars ?? theme).palette.text.secondary,
  ...theme.applyStyles('dark', {
    backgroundColor: '#1A2027',
  }),
}));


export default function List() {
  const [list, setList] = React.useState([]);
  const [id, setId] = React.useState("");
  const [open, setOpen] = React.useState(false);
console.log(list,'list')
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
        <Grid sx={{ display: 'flex', justifyContent: 'space-between' }}>
          <Typography variant="h4" gutterBottom>
            CMS List
          </Typography>
          <Button variant="contained" color="primary" href="/cms/create" sx={{ padding: 2, marginBottom: 2 }}>
            Create
          </Button>
        </Grid>
        {/* <TableContainer component={Paper} sx={{ borderRadius: 2, boxShadow: 3 }}>
          <Table>
            <TableHead sx={{ backgroundColor: "#f5f5f5" }}>
              <TableRow>
                <TableCell><strong>Created At</strong></TableCell>
                <TableCell><strong>Description</strong></TableCell>
                <TableCell><strong>Status</strong></TableCell>
                <TableCell><strong>Title</strong></TableCell>
                <TableCell><strong>User ID</strong></TableCell>
                <TableCell><strong>Image</strong></TableCell>
                <TableCell><strong>Actions</strong></TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {Array.isArray(list) && list.length > 0 ? (
                list.map((row) => (
                  <TableRow key={row._id}>
                    <TableCell>{row.createdAt}</TableCell>
                    <TableCell>{row.description}</TableCell>
                    <TableCell>{row.status}</TableCell>
                    <TableCell>{row.title}</TableCell>
                    <TableCell>{row.user_id}</TableCell>
                    <TableCell>
                      <img
                        src={image(row.image)}
                        alt="cms-img"
                        style={{
                          borderRadius: "50%",
                          width: "50px",
                          height: "50px",
                          objectFit: "cover",
                        }}
                      />
                    </TableCell>
                    <TableCell>
                      <Box sx={{ display: "flex", gap: 1 }}>
                        <Button
                          variant="contained"
                          color="success"
                          href={`/cms/update/${row._id}`}
                        >
                          Edit
                        </Button>
                        <Button
                          variant="contained"
                          color="error"
                          onClick={() => {
                            setId(row._id);
                            setOpen(true);
                          }}
                        >
                          Delete
                        </Button>
                      </Box>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={7} align="center">
                    No data available
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer> */}
        <Box sx={{ width: '100%' }}>
          <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>

            {Array.isArray(list) && list.length > 0 ? (
              list.map((row) => (
                // console.log(row)
                <Grid key={row._id} size={4}>
                  <Item>
                    <RecipeReviewCard row={row}/>
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
