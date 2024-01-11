import { StyleSheet, Text, View, SafeAreaView, Pressable } from "react-native";
import React, { useState, useEffect } from "react";
import { AntDesign, MaterialIcons } from "@expo/vector-icons";
import { updateDoc, doc, deleteDoc } from "firebase/firestore";
import { FIREBASE_DB } from "../FirebaseConfig";
import Colors from "../constants/Colors";
import Font from "../constants/Font";

const db = FIREBASE_DB;

// Shopping object
const ShoppingItem = ({ title, isChecked, id, getShoppingList }) => {
  const [isCheckedItem, setIsCheckedItem] = useState(isChecked);

  const updateIsChecked = async () => {
    await updateDoc(doc(db, "shopping", id), {
      isChecked: isCheckedItem,
    });
  };

  const deleteItem = async () => {
    await deleteDoc(doc(db, "shopping", id));
    getShoppingList();
  };

  useEffect(() => {
    updateIsChecked();
  }, [isCheckedItem]);

  return (
    <View style={styles.container}>
      <Pressable onPress={() => setIsCheckedItem(!isCheckedItem)}>
        {
          // Checked icon
          isCheckedItem ? (
            <AntDesign name="checkcircle" size={24} color={Colors.primary} />
          ) : (
            <AntDesign name="checkcircleo" size={24} color={Colors.primary} />
          )
        }
      </Pressable>

      <View style={styles.containerInfo}>
        <Text style={styles.title}>{title}</Text>
      </View>

      <Pressable onPress={deleteItem}>
        <MaterialIcons
          name="delete"
          size={24}
          color={Colors.primary}
          style={{ marginLeft: 10 }}
        />
      </Pressable>
    </View>
  );
};

export default ShoppingItem;

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.white,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 10,
    width: "90%",
    alignSelf: "center",
    borderRadius: 10,
    marginVertical: 10,
    borderWidth: 2,
    borderColor: Colors.primary,
  },
  containerInfo: {
    flex: 2,
    flexDirection: "column",
    marginLeft: 20,
  },
  title: {
    // flex: 1,
    fontSize: 20,
    fontFamily: Font["poppins-semiBold"],
    fontWeight: "500",
    color: Colors.primary,
  },
  quantity: {
    fontSize: 15,
    fontFamily: Font["poppins-regular"],
    fontWeight: "500",
    color: Colors.primary,
  },
});
