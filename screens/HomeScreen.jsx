import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  ImageBackground,
  StyleSheet,
} from "react-native";
import { globalStyles } from "../styles/global";
import Spacing from "../constants/Spacing";
import FontSize from "../constants/FontSize";
import Colors from "../constants/Colors";
import Font from "../constants/Font";
import { FIREBASE_AUTH } from "../FirebaseConfig";

function HomeScreen({ navigation }) {
  return (
    <View
      style={globalStyles.container}

      // source={require("../assets/background2.png")}
    >
      <Text style={styles.header}>Selamat Datang di Halaman Utama</Text>
      <Image source={require("../assets/logo-unima.jpg")} style={styles.logo} />
      <Text style={styles.description}>
        Aplikasi ini dibuat untuk memenuhi tugas akhir mata kuliah Pemrograman
        Mobile dimana terdapat fitur untuk memudahkan seperti mencari informasi
        mengenai film yang ingin ditonton, membantu mengelola daftar belanjaan,
        dan membantu menghitung operasi matematika.
      </Text>
      <TouchableOpacity
        style={{
          padding: 15,
          backgroundColor: Colors.primary,
          marginVertical: Spacing,
          borderRadius: Spacing,
          shadowColor: Colors.primary,
          shadowOffset: {
            width: 0,
            height: Spacing,
          },
          shadowOpacity: 0.3,
          shadowRadius: Spacing,
        }}
        title="Logout"
        onPress={() => FIREBASE_AUTH.signOut()}
      >
        <Text
          style={{
            color: "#fff",
            fontSize: 16,
            fontFamily: Font["poppins-semiBold"],
          }}
        >
          Logout
        </Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
    fontFamily: Font["poppins-bold"],
    textAlign: "center",
    marginTop: 20,
    color: Colors.primary,
  },
  description: {
    fontSize: 16,
    marginBottom: 50,
    fontFamily: Font["poppins-regular"],
    marginHorizontal: 20,
    textAlign: "justify",
    marginVertical: 20,
  },
  profileButton: {
    marginBottom: 20,
  },

  logo: {
    width: 120,
    height: 120,
    marginBottom: 15,
    borderRadius: 8,
  },
});

export default HomeScreen;
