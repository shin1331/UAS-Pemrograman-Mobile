import React from "react";
import {
  StyleSheet,
  Text,
  SafeAreaView,
  View,
  Pressable,
  TextInput,
  FlatList,
  ActivityIndicator,
} from "react-native";

import { FIREBASE_DB } from "../FirebaseConfig";
import {
  collection,
  addDoc,
  getDocs,
  deleteDoc,
  doc,
} from "firebase/firestore";

import Colors from "../constants/Colors";
import Font from "../constants/Font";
import Spacing from "../constants/Spacing";
import FontSize from "../constants/FontSize";
import AppTextInput from "../components/AppTextInput";

import ShoppingItem from "../components/ShoppingItem";

import { useState, useEffect } from "react";
import { MaterialIcons } from "@expo/vector-icons";

const db = FIREBASE_DB;

const ShoppingListScreen = () => {
  const [title, setTitle] = useState("");
  const [shoppingList, setShoppingList] = useState([]);

  const addShoppingItem = async () => {
    try {
      const docRef = await addDoc(collection(db, "shopping"), {
        title: title,
        isChecked: false,
      });
      console.log("Document written with ID: ", docRef.id);
      setTitle("");
    } catch (e) {
      console.error("Error adding document: ", e);
    }
    getShoppingList();
  };

  const getShoppingList = async () => {
    const querySnapshot = await getDocs(collection(db, "shopping"));
    // querySnapshot.forEach((doc) => {
    //   console.log(doc.id, doc.data());
    //   setShoppingList({ ...doc.data(), id: doc.id });
    // });
    const list = querySnapshot.docs.map((doc) => ({
      ...doc.data(),
      id: doc.id,
    }));
    setShoppingList(list);
  };

  const deleteShoppingList = async () => {
    const querySnapshot = await getDocs(collection(db, "shopping"));
    querySnapshot.docs.map((item) => deleteDoc(doc(db, "shopping", item.id)));
    getShoppingList();
  };

  useEffect(() => {
    getShoppingList();
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.heading}>Shopping List</Text>
        <Text style={styles.noOfItems}>({shoppingList.length})</Text>
        <Pressable onPress={deleteShoppingList}>
          <MaterialIcons name="delete" size={30} color={Colors.primary} />
        </Pressable>
      </View>
      {shoppingList.length > 0 ? (
        <FlatList
          data={shoppingList}
          renderItem={({ item }) => (
            <ShoppingItem
              title={item.title}
              isChecked={item.isChecked}
              id={item.id}
              getShoppingList={getShoppingList}
            />
          )}
          keyExtractor={(item) => item.id}
        />
      ) : (
        <Text style={{ alignSelf: "center", fontSize: 20, color: "grey" }}>
          No items in your shopping list
        </Text>
      )}

      <AppTextInput
        style={styles.input}
        placeholder="Add an item"
        value={title}
        onChangeText={(text) => {
          setTitle(text);
        }}
        onSubmitEditing={addShoppingItem}
      />
    </SafeAreaView>
  );
};

export default ShoppingListScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    fontFamily: Font["poppins-bold"],
    marginTop: 20,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 10,
    width: "90%",
    alignSelf: "center",
    marginBottom: 10,
    marginTop: 20,
  },
  heading: {
    fontSize: 30,
    fontWeight: "500",
    flex: 1,
    fontFamily: Font["poppins-bold"],
    color: Colors.primary,
  },
  noOfItems: {
    fontSize: 30,
    color: "grey",
    fontWeight: "500",
    marginRight: 20,
  },
  input: {
    height: 50,
    borderColor: "lightgrey",
    borderWidth: 1,
    width: "90%",
    alignSelf: "center",
    borderRadius: 10,
    paddingHorizontal: 10,
    marginBottom: 10,
    marginTop: "auto",
  },
});
