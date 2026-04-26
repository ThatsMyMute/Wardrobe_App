import * as ImagePicker from "expo-image-picker";
import React, { useState } from "react";
import {
  Button,
  FlatList,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

type ClothingItem = {
  id: string;
  image: string;
  category: string;
};

export default function Index() {
  const [wardrobe, setWardrobe] = useState<ClothingItem[]>([]);
  const [outfit, setOutfit] = useState<ClothingItem[]>([]);

  async function addClothingItem() {
    const permission = await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (!permission.granted) {
      alert("Permission needed");
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      quality: 0.8,
      allowsEditing: true,
    });

    if (!result.canceled) {
      const imageUri = result.assets[0].uri;

      const categories = ["shirt", "pants", "shoes", "jacket"];
      const randomCategory =
        categories[Math.floor(Math.random() * categories.length)];

      const newItem: ClothingItem = {
        id: Date.now().toString(),
        image: imageUri,
        category: randomCategory,
      };

      setWardrobe((prev) => [...prev, newItem]);
    }
  }

  function generateOutfit() {
    const shirt = wardrobe.find((i) => i.category === "shirt");
    const pants = wardrobe.find((i) => i.category === "pants");
    const shoes = wardrobe.find((i) => i.category === "shoes");
    const jacket = wardrobe.find((i) => i.category === "jacket");

    const result = [shirt, pants, shoes, jacket].filter(
      (item): item is ClothingItem => item !== undefined
    );

    if (result.length === 0) {
      alert("Add clothes first");
      return;
    }

    setOutfit(result);
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>AI Wardrobe</Text>

      <Button title="Add Clothing" onPress={addClothingItem} />

      <TouchableOpacity style={styles.button} onPress={generateOutfit}>
        <Text style={styles.buttonText}>Generate Outfit</Text>
      </TouchableOpacity>

      <Text style={styles.section}>Wardrobe</Text>

      <FlatList
        horizontal
        data={wardrobe}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <Image source={{ uri: item.image }} style={styles.image} />
            <Text>{item.category}</Text>
          </View>
        )}
      />

      <Text style={styles.section}>Outfit</Text>

      <FlatList
        horizontal
        data={outfit}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <Image source={{ uri: item.image }} style={styles.image} />
            <Text>{item.category}</Text>
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 60,
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 26,
    fontWeight: "bold",
    marginBottom: 15,
  },
  section: {
    fontSize: 18,
    marginTop: 20,
    marginBottom: 10,
  },
  card: {
    marginRight: 10,
    alignItems: "center",
  },
  image: {
    width: 100,
    height: 100,
    borderRadius: 10,
  },
  button: {
    backgroundColor: "black",
    padding: 12,
    marginTop: 10,
    borderRadius: 8,
  },
  buttonText: {
    color: "white",
    textAlign: "center",
  },
});