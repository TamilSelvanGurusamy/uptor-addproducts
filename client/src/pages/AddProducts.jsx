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
  Paper,
  IconButton
} from "@mui/material";
import { Delete as DeleteIcon, Edit as EditIcon } from "@mui/icons-material";

export default function AddProducts() {
  const [name, setName] = useState("");
  const [quantity, setQuantity] = useState("");
  const [price, setPrice] = useState("");
  const [image, setImage] = useState(null);
  const [products, setProducts] = useState([]);
  const [editingId, setEditingId] = useState(null);

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
    if (image) {
      formData.append("image", image);
    }

    if (editingId) {
      await api.put(`/products/${editingId}`, formData);
      setEditingId(null);
    } else {
      await api.post("/products", formData);
    }

    setName("");
    setQuantity("");
    setPrice("");
    setImage(null);

    fetchProducts();
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this product?")) {
      await api.delete(`/products/${id}`);
      fetchProducts();
    }
  };

  const handleEdit = (product) => {
    setName(product.name);
    setQuantity(product.quantity);
    setPrice(product.price);
    setImage(null);
    setEditingId(product._id);
  };

  const handleCancel = () => {
    setName("");
    setQuantity("");
    setPrice("");
    setImage(null);
    setEditingId(null);
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
                {editingId ? "Update Product" : "Submit"}
              </Button>

              {editingId && (
                <Button
                  variant="outlined"
                  fullWidth
                  sx={{ mt: 2 }}
                  onClick={handleCancel}
                >
                  Cancel
                </Button>
              )}
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
                <TableCell><b>Actions</b></TableCell>
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
                        src={`http://ec2-3-108-67-162.ap-south-1.compute.amazonaws.com:5000/uploads/${p.image}`}
                        width="90"
                        style={{ borderRadius: 4 }}
                      />
                    )}
                  </TableCell>
                  <TableCell>
                    <IconButton
                      size="small"
                      color="primary"
                      onClick={() => handleEdit(p)}
                      title="Edit"
                    >
                      <EditIcon />
                    </IconButton>
                    <IconButton
                      size="small"
                      color="error"
                      onClick={() => handleDelete(p._id)}
                      title="Delete"
                    >
                      <DeleteIcon />
                    </IconButton>
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
