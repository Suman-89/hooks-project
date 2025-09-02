import {
  Box,
  Typography,
  Grid,
  Card,
  CardContent,
  CardMedia,
  Button,
  Divider,
  Container,
  Stack,
  IconButton,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import DeleteIcon from "@mui/icons-material/Delete";
import { useCart } from "../../../../../context/context";
import { toast } from "react-toastify";
import { image } from "../../../../api/axios/axios";

export default function CartPage() {
  const {
    cartItems,
    removeFromCart,
    clearCart,
    increaseQuantity,
    decreaseQuantity,
  } = useCart();

  const total = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  const handleRemove = (id, title) => {
    removeFromCart(id);
    toast.info(`${title} removed from cart`);
  };

  return (
    <Container maxWidth="md" sx={{ mt: 5 }}>
      <Typography variant="h4" fontWeight={600} gutterBottom>
        Shopping Cart
      </Typography>

      {cartItems.length === 0 ? (
        <Typography variant="h6" color="text.secondary">
          Your cart is empty.
        </Typography>
      ) : (
        <>
          <Grid container spacing={3}>
            {cartItems.map((item) => (
              <>
             { console.log(item,'item')}
              <Grid item xs={12} key={item.id}>
                <Card sx={{ display: "flex", p: 2 }}>
                  <CardMedia
                    component="img"
                    sx={{
                      width: 100,
                      height: 100,
                      objectFit: "cover",
                      borderRadius: 2,
                      backgroundColor: "#f0f0f0",
                    }}
                    image={image(item.image)}
                    alt={item.title}
                  />
                  <CardContent sx={{ flex: 1 }}>
                    <Typography variant="h6">{item.title}</Typography>
                    <Typography color="text.secondary">
                      ₹{item.price}
                    </Typography>

                    <Box display="flex" alignItems="center" mt={1} gap={1}>
                      <IconButton
                        size="small"
                        onClick={() => decreaseQuantity(item.id)}
                        disabled={item.quantity === 1}
                        aria-label="Decrease quantity"
                      >
                        <RemoveIcon fontSize="small" />
                      </IconButton>
                      <Typography>{item.quantity}</Typography>
                      <IconButton
                        size="small"
                        onClick={() => increaseQuantity(item.id)}
                        aria-label="Increase quantity"
                      >
                        <AddIcon fontSize="small" />
                      </IconButton>
                    </Box>

                    <Typography variant="subtitle2" mt={1}>
                      Subtotal: ₹{item.price * item.quantity}
                    </Typography>

                    <IconButton
                      size="small"
                      color="error"
                      sx={{ mt: 1 }}
                      onClick={() => handleRemove(item.id, item.title)}
                      aria-label="Remove item"
                    >
                      <DeleteIcon />
                    </IconButton>
                  </CardContent>
                </Card>
              </Grid>
              </>
            ))}
          </Grid>

          <Divider sx={{ my: 4 }} />

          <Box
            display="flex"
            justifyContent="space-between"
            alignItems="center"
          >
            <Typography variant="h6">Total: ₹{total}</Typography>

            <Stack direction="row" spacing={2}>
              <Button
                variant="outlined"
                color="secondary"
                onClick={() => {
                  clearCart();
                  toast.info("Cart cleared");
                }}
              >
                Clear Cart
              </Button>
              <Button variant="contained" color="primary">
                Checkout
              </Button>
            </Stack>
          </Box>
        </>
      )}
    </Container>
  );
}
