import React, { useState, useEffect } from "react";
import "./App.css";
import "@aws-amplify/ui-react/styles.css";
import { API, Storage } from 'aws-amplify';
import {
  Button,
  Flex,
  Heading,
  Image,
  Text,
  TextField,
  View,
  withAuthenticator,
} from '@aws-amplify/ui-react';

import { listNotes } from "./graphql/queries";
import {
  createNote as createNoteMutation,
  deleteNote as deleteNoteMutation,
} from "./graphql/mutations";

// Import the AddFoodItem component
import AddFoodItem from './AddFoodItem';

const App = ({ signOut }) => {
  const [notes, setNotes] = useState([]);
  const [foodItems, setFoodItems] = useState([]);

  useEffect(() => {
    fetchNotes();
  }, []);

  async function fetchNotes() {
    const apiData = await API.graphql({ query: listNotes });
    const notesFromAPI = apiData.data.listNotes.items;
    await Promise.all(
      notesFromAPI.map(async (note) => {
        if (note.image) {
          const url = await Storage.get(note.name);
          note.image = url;
        }
        return note;
      })
    );
    setNotes(notesFromAPI);
  }

  async function createNote(event) {
    event.preventDefault();
    const form = new FormData(event.target);
    const image = form.get("image");
    const data = {
      name: form.get("name"),
      description: form.get("description"),
      image: image.name,
    };
    if (!!data.image) await Storage.put(data.name, image);
    await API.graphql({
      query: createNoteMutation,
      variables: { input: data },
    });
    fetchNotes();
    event.target.reset();
  }

  async function deleteNote({ id, name }) {
    const newNotes = notes.filter((note) => note.id !== id);
    setNotes(newNotes);
    await Storage.remove(name);
    await API.graphql({
      query: deleteNoteMutation,
      variables: { input: { id } },
    });
  }

  function addFoodItem(newFoodItem) {
    setFoodItems((prevFoodItems) => [...prevFoodItems, newFoodItem]);
  }

  return (
    <View className="App">
      <Heading level={1}><b>My Shopping List</b></Heading>
      <View as="form" margin="3rem 0" onSubmit={createNote}>
        {/* ... (the rest of the existing code in the first component) */}
      </View>
      
      {/* Add the AddFoodItem component */}
      <AddFoodItem onAddFoodItem={addFoodItem} />

      <View margin="3rem 0">
        {foodItems.map((item) => (
          <Flex
            key={item.name}
            direction="row"
            justifyContent="center"
            alignItems="center"
          >
            <Text as="strong" fontWeight={700}>
              {item.name}
            </Text>
            <Text as="span">{item.description}</Text>
            <Text as="span">${item.price}</Text>
            {item.image && (
              <Image
                src={item.image}
                alt={`visual aid for ${item.name}`}
                style={{ width: 400 }}
              />
            )}
          </Flex>
        ))}
      </View>

      <Button onClick={signOut}>Sign Out</Button>
    </View>
  );
};

export default withAuthenticator(App);
