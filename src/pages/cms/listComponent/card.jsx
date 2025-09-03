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
} from "@mui/material";
import { red } from "@mui/material/colors";
import {
  Favorite as FavoriteIcon,
  Share as ShareIcon,
  Delete as DeleteIcon,
  AddShoppingCart as AddShoppingCartIcon,
  MoreVert as MoreVertIcon,
  Edit as EditIcon,
} from "@mui/icons-material";
import { image } from "../../../api/axios/axios";
import { useCart } from "../../../../context/context";
import { toast } from "react-toastify";

export default function RecipeReviewCard({ row, onDelete }) {
  const { addToCart } = useCart();

  const handleAddToCart = () => {
    const item = {
      id: row._id,
      image:row.image,
      title: row.title,
      price: row.price,
      quantity: 1,
    };
    addToCart(item);
    console.log(item,'added item')
    toast.success(`${row.title} added to cart`);
  };

  return (
    <Card sx={{ maxWidth: 345, height: 400, padding: 1 }}>
      <CardHeader
        avatar={
          <Avatar sx={{ bgcolor: red[500] }} aria-label="item">
            {row.title?.charAt(0).toUpperCase()}
          </Avatar>
        }
        action={
          <IconButton aria-label="settings">
            <MoreVertIcon />
          </IconButton>
        }
        title={row.title}
        subheader={new Date(row.createdAt).toLocaleDateString()}
      />
      <CardMedia
        component="img"
        height="190"
        image={image(row.image)}
        alt={row.title}
      />
      <CardContent>
        <Typography variant="body2" color="text.secondary">
          {row.description}
        </Typography>
      </CardContent>
      <CardActions disableSpacing>
        <IconButton aria-label="favorite">
          <FavoriteIcon />
        </IconButton>
        <IconButton aria-label="add to cart" onClick={handleAddToCart}>
          <AddShoppingCartIcon />
        </IconButton>
        <IconButton aria-label="edit">
          <EditIcon />
        </IconButton>
        <IconButton aria-label="share">
          <ShareIcon />
        </IconButton>
        <IconButton aria-label="delete" onClick={() => onDelete(row._id)}>
          <DeleteIcon />
        </IconButton>
      </CardActions>
    </Card>
  );
}
