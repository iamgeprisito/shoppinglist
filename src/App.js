import React, { useState } from 'react';
import AddFoodItem from './components/AddFoodItem';
import { CssBaseline, Container, Typography } from '@mui/material';

function App() {
  const [foodItems, setFoodItems] = useState([]);

  const handleAddFoodItem = (foodItem) => {
    setFoodItems([...foodItems, foodItem]);
  };

  return (
    <div className="App">
      <CssBaseline />
      <Container maxWidth="md">
        <AddFoodItem onAdd={handleAddFoodItem} />
        <Typography variant="h4" gutterBottom>
          Food Items
        </Typography>
        <ul>
          {foodItems.map((foodItem, index) => (
            <li key={index}>
              {foodItem.name} - {foodItem.description} - ${foodItem.price}
            </li>
          ))}
        </ul>
      </Container>
    </div>
  );
}

export default App;
