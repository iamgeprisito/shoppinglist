import React from 'react';
import './App.css';
import { useState } from 'react';


function AddFoodItem() {
    const [foodItem, setFoodItem] = useState({
        name: '',
        description: '',
        price: '',
        image: '',
      });
    
      const handleChange = (e) => {
        const { name, value } = e.target;
        setFoodItem((prevState) => ({
          ...prevState,
          [name]: value,
        }));
      };
    
      const handleSubmit = (e) => {
        e.preventDefault();
        console.log(foodItem);
        setFoodItem({
          name: '',
          description: '',
          price: '',
          image: '',
        });
      };

      return (
        <div className="App">
          <h1>Add Food Item</h1>
          <form onSubmit={handleSubmit}>
            <input
              type="text"
              name="name"
              placeholder="Name"
              value={foodItem.name}
              onChange={handleChange}
              required
            />
            <input
              type="text"
              name="description"
              placeholder="Description"
              value={foodItem.description}
              onChange={handleChange}
              required
            />
            <input
              type="number"
              name="price"
              placeholder="Price"
              value={foodItem.price}
              onChange={handleChange}
              required
            />
            <input
              type="file"
              name="image"
              placeholder="Image"
              onChange={handleChange}
              required
            />
            <button type="submit">Submit</button>
          </form>
        </div>
      );
}

export default AddFoodItem;
