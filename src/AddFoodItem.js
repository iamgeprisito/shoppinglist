import React from 'react';
import './App.css';
import { useState } from 'react';
import { Storage } from 'aws-amplify';

function AddFoodItem({ onAddFoodItem }) {
    const [foodItem, setFoodItem] = useState({
        name: '',
        description: '',
        price: '',
        image: '',
    });

    const handleChange = (e) => {
        const { name, value, type, files } = e.target;
        if (type === 'file') {
          setFoodItem((prevState) => ({
            ...prevState,
            [name]: files[0],
          }));
        } else {
          setFoodItem((prevState) => ({
            ...prevState,
            [name]: value,
          }));
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        let uploadedImageUrl;
        if (foodItem.image) {
          const { key } = await Storage.put(foodItem.image.name, foodItem.image);
          uploadedImageUrl = await Storage.get(key);
        }

        const newFoodItem = {
          name: foodItem.name,
          description: foodItem.description,
          price: foodItem.price,
          image: uploadedImageUrl,
        };

        onAddFoodItem(newFoodItem);

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
