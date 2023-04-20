import React, { useState } from 'react';
import { Button, TextField, TextareaAutosize, Box } from '@mui/material';

const AddFoodItem = ({ onAdd }) => {
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    price: '',
    image: null,
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleImageChange = (e) => {
    setFormData({ ...formData, image: e.target.files[0] });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.name || !formData.price) return;
    onAdd(formData);
    setFormData({ name: '', description: '', price: '', image: null });
  };

  return (
    <Box
      component="form"
      sx={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        gap: 2,
        width: '100%',
        maxWidth: 500,
        m: 'auto',
        mt: 4,
        p: 2,
        bgcolor: 'grey.900',
        borderRadius: 1,
        boxShadow: 3,
      }}
      onSubmit={handleSubmit}
    >
      <h2 style={{ color: 'white' }}>Add Food Item</h2>
      <TextField
        variant="outlined"
        fullWidth
        name="name"
        label="Name"
        value={formData.name}
        onChange={handleChange}
        required
      />
      <TextareaAutosize
        name="description"
        placeholder="Description"
        rows={4}
        style={{ width: '100%' }}
        value={formData.description}
        onChange={handleChange}
      />
      <TextField
        variant="outlined"
        fullWidth
        type="number"
        step="0.01"
        name="price"
        label="Price"
        value={formData.price}
        onChange={handleChange}
        required
      />
      <input
        accept="image/*"
        id="contained-button-file"
        type="file"
        onChange={handleImageChange}
        style={{ display: 'none' }}
      />
      <label htmlFor="contained-button-file">
        <Button variant="contained" component="span">
          Upload Image
        </Button>
      </label>
      <Button variant="contained" type="submit">
        Add Food Item
      </Button>
    </Box>
  );
};

export default AddFoodItem;
