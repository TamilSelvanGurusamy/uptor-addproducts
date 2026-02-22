import { useEffect, useState } from "react";
import api from "../services/api";

import {
  Box,
  Button,
  Card,
  CardContent,
  Container,
  Grid,
  TextField,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper
} from "@mui/material";

export default function AddProducts() {
  const [name, setName] = useState("");
  const [quantity, setQuantity] = useState("");
  const [price, setPrice] = useState("");
  const [image, setImage] = useState(null);
  const [products, setProducts] = useState([]);

  const fetchProducts = async () => {
    const res = await api.get("/products");
    setProducts(res.data);
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("name", name);
    formData.append("quantity", quantity);
    formData.append("price", price);
    formData.append("image", image);

    await api.post("/products", formData);

    setName("");
    setQuantity("");
    setPrice("");
    setImage(null);

    fetchProducts();
  };

  return (

    <Box
      sx={{
        display: "grid",
        gridTemplateColumns: "30% 70%",
        gap: 3,
        mt: 4,
        px: 2
      }}
    >
      {/* LEFT SIDE - FORM */}
      < Grid item xs={12} md={4} >
        <Card>
          <CardContent>
            <Typography variant="h6" gutterBottom>
              Add Product
            </Typography>

            <Box component="form" onSubmit={handleSubmit}>
              <TextField
                label="Product Name"
                fullWidth
                margin="normal"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />

              <TextField
                label="Quantity"
                type="number"
                fullWidth
                margin="normal"
                value={quantity}
                onChange={(e) => setQuantity(e.target.value)}
                required
              />

              <TextField
                label="Price"
                type="number"
                fullWidth
                margin="normal"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                required
              />

              <Button
                variant="outlined"
                component="label"
                fullWidth
                sx={{ mt: 2 }}
              >
                Upload Image
                <input
                  type="file"
                  hidden
                  onChange={(e) => setImage(e.target.files[0])}
                />
              </Button>

              <Button
                type="submit"
                variant="contained"
                fullWidth
                sx={{ mt: 3 }}
              >
                Submit
              </Button>
            </Box>
          </CardContent>
        </Card>
      </Grid >

      {/* RIGHT SIDE - LIST */}
      < Grid item xs={12} md={9} >
        <Typography variant="h6" gutterBottom>
          Product List
        </Typography>

        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell><b>Name</b></TableCell>
                <TableCell><b>Quantity</b></TableCell>
                <TableCell><b>Price</b></TableCell>
                <TableCell><b>Image</b></TableCell>
              </TableRow>
            </TableHead>

            <TableBody>
              {products.map((p) => (
                <TableRow key={p._id}>
                  <TableCell>{p.name}</TableCell>
                  <TableCell>{p.quantity}</TableCell>
                  <TableCell>₹ {p.price}</TableCell>
                  <TableCell>
                    {p.image && (
                      <img
                        src={`http://ec2-100-53-18-75.compute-1.amazonaws.com:5000/uploads/${p.image}`}
                        width="90"
                        style={{ borderRadius: 4 }}
                      />
                    )}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Grid >
    </Box>
  );
}
