import React from "react";
import {
  Card,
  CardHeader,
  CardMedia,
  CardContent,
  CardActions,
  Avatar,
  IconButton,
  Typography,
  Box,
} from "@mui/material";
import {
  Favorite as FavoriteIcon,
  Delete as DeleteIcon,
  AddShoppingCart as AddShoppingCartIcon,
  MoreVert as MoreVertIcon,
  Edit as EditIcon,
} from "@mui/icons-material";
import { image } from "../../../api/axios/axios";
import { useCart } from "../../../../context/context";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

export default function RecipeReviewCard({ row, onDelete }) {
  const { addToCart } = useCart();
  const navigate = useNavigate();

  const handleAddToCart = () => {
    const item = {
      id: row._id,
      image: row.image,
      title: row.title,
      price: row.price,
      quantity: 1,
    };
    addToCart(item);
    toast.success(`${row.title} added to cart`);
  };

  const handleEdit = (id) => {
    navigate(`/cms/update/${id}`);
  };

  return (
    <Card
      sx={{
        maxWidth: 300,
        width: "100%",
        display: "flex",
        flexDirection: "column",
        borderRadius: 3,
        boxShadow: 3,
        overflow: "hidden",
        margin: 0,
      }}
    >
      {/* Header */}
      <CardHeader
        avatar={
          <Avatar sx={{ bgcolor: "primary.main" }} aria-label="item">
            {row.title?.charAt(0).toUpperCase()}
          </Avatar>
        }
        action={
          <IconButton aria-label="settings">
            <MoreVertIcon />
          </IconButton>
        }
        title={
          <Typography variant="subtitle1" fontWeight={600}>
            {row.title}
          </Typography>
        }
        subheader={new Date(row.createdAt).toLocaleDateString()}
      />

      {/* Image */}
      <CardMedia
        component="img"
        image={image(row.image)}
        alt={row.title}
        sx={{
          width: "100%",
          height: 450,
          objectFit: "cover", // clean fit
        }}
      />

      {/* Content */}
      <CardContent sx={{ flexGrow: 1 }}>
        <Typography
          variant="body2"
          color="text.secondary"
          sx={{
            display: "-webkit-box",
            WebkitLineClamp: 3,
            WebkitBoxOrient: "vertical",
            overflow: "hidden",
          }}
        >
          {row.description}
        </Typography>

        {/* <Box mt={2}>
          <Typography variant="h6" fontWeight={700} color="primary">
            ₹ {row.price}
          </Typography>
        </Box> */}
      </CardContent>

      {/* Actions */}
      <CardActions
        disableSpacing
        sx={{
          justifyContent: "space-between",
          px: 2,
          pb: 2,
        }}
      >
        <Box>
          <IconButton aria-label="favorite">
            <FavoriteIcon />
          </IconButton>
          <IconButton aria-label="add to cart" onClick={handleAddToCart}>
            <AddShoppingCartIcon />
          </IconButton>
        </Box>

        <Box>
          <IconButton aria-label="edit" onClick={() => handleEdit(row._id)}>
            <EditIcon />
          </IconButton>
          <IconButton aria-label="delete" onClick={() => onDelete(row._id)}>
            <DeleteIcon />
          </IconButton>
        </Box>
      </CardActions>
    </Card>
  );
}
