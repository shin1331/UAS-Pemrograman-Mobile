import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import axios from "axios";
import Font from "../constants/Font";
import Colors from "../constants/Colors";

const MovieDetail = ({ route, navigation }) => {
  const [movieDetails, setMovieDetails] = useState(null);

  useEffect(() => {
    const { imdbID } = route.params;
    // Function to fetch movie details by ID from OMDB API
    const fetchMovieDetails = async () => {
      try {
        const response = await axios.get(
          `http://www.omdbapi.com/?i=${imdbID}&apikey=48c2f4f7`
        );
        setMovieDetails(response.data);
      } catch (error) {
        console.error("Error fetching movie details:", error);
      }
    };

    fetchMovieDetails();
  }, [route.params]);

  if (!movieDetails) {
    return (
      <View style={styles.container}>
        <Text>Loading...</Text>
      </View>
    );
  }

  return (
    <ScrollView style={styles.container}>
      <Image source={{ uri: movieDetails.Poster }} style={styles.poster} />
      <View style={styles.details}>
        <Text style={styles.title}>{movieDetails.Title}</Text>
        <Text style={styles.info}>Year: {movieDetails.Year}</Text>
        <Text style={styles.info}>Released: {movieDetails.Released} </Text>
        <Text style={styles.info}>Director: {movieDetails.Director}</Text>
        <Text style={styles.info}>Writer: {movieDetails.Writer}</Text>
        <Text style={styles.info}>Actors: {movieDetails.Actors}</Text>
        <Text style={styles.info}>Plot: {movieDetails.Plot}</Text>

        {/* Tambahkan informasi lain yang ingin ditampilkan */}
      </View>
      <TouchableOpacity
        style={styles.backButton}
        onPress={() => navigation.goBack()}
      >
        <Text style={styles.backButtonText}>Back to Movie List</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    fontFamily: Font["poppins-bold"],
  },
  poster: {
    width: "100%",
    height: 500,
    marginBottom: 10,
  },
  details: {
    marginBottom: 10,
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 5,
    fontFamily: Font["poppins-bold"],
  },
  backButton: {
    backgroundColor: Colors.primary,
    padding: 10,
    borderRadius: 5,
    alignSelf: "flex-start",
    marginTop: 10,
    marginLeft: 20,
    marginBottom: 20,
  },
  backButtonText: {
    color: "white",
    fontWeight: "bold",
    fontFamily: Font["poppins-bold"],
  },
  info: {
    fontSize: 16,
    marginBottom: 5,
    fontFamily: Font["poppins-reguler"],
  },
});

export default MovieDetail;
