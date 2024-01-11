import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  FlatList,
  Image,
  StyleSheet,
  TextInput,
  TouchableOpacity,
} from "react-native";
import AppTextInput from "../components/AppTextInput";
import axios from "axios";
import Font from "../constants/Font";
import { SafeAreaView } from "react-native-safe-area-context";
import Colors from "../constants/Colors";

const MovieList = ({ navigation }) => {
  const [movies, setMovies] = useState([]);
  const [searchKeyword, setSearchKeyword] = useState(""); // Default keyword

  useEffect(() => {
    // Function to fetch movies data from OMDB API
    const fetchMovies = async () => {
      try {
        const response = await axios.get(
          `http://www.omdbapi.com/?apikey=48c2f4f7&s=${searchKeyword}`
        );
        setMovies(response.data.Search);
      } catch (error) {
        console.error("Error fetching movies:", error);
      }
    };

    fetchMovies();
  }, [searchKeyword]);

  const renderMovieItem = ({ item }) => (
    <TouchableOpacity
      style={styles.movieItem}
      onPress={() =>
        navigation.navigate("MovieDetail", { imdbID: item.imdbID })
      }
    >
      <View style={styles.movieItem}>
        <Image source={{ uri: item.Poster }} style={styles.poster} />
        <View style={styles.details}>
          <Text style={styles.title}>{item.Title}</Text>
          <Text style={styles.info}>Year: {item.Year}</Text>
          <Text style={styles.info}>Type: {item.Type}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      <Text
        style={{
          fontFamily: Font["poppins-bold"],
          fontSize: 30,
          marginTop: 20,
          color: Colors.primary,
          marginLeft: 10,
        }}
      >
        Movie List
      </Text>
      <AppTextInput
        style={styles.searchInput}
        placeholder="Search Movies"
        value={searchKeyword}
        onChangeText={(text) => setSearchKeyword(text)}
      />
      <FlatList
        data={movies}
        renderItem={renderMovieItem}
        keyExtractor={(item) => item.imdbID}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    backgroundColor: "#fff",
  },
  movieItem: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
  },
  poster: {
    width: 80,
    height: 120,
    marginRight: 10,
  },
  details: {
    flex: 1,
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    fontFamily: Font["poppins-bold"],
  },
  searchInput: {
    height: 50,
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
    marginVertical: 20,
    fontFamily: Font["poppins-reguler"],
  },
  info: {
    fontFamily: Font["poppins-reguler"],
  },
});

export default MovieList;
