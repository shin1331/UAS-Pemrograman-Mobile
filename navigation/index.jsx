import { DefaultTheme, NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React, { useState, useEffect } from "react";

// Constants
import Colors from "../constants/Colors";
import Font from "../constants/Font";
import Icon from "react-native-vector-icons/FontAwesome5";

// Navigation
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
const Tab = createBottomTabNavigator();

// Firebase
import { onAuthStateChanged } from "firebase/auth";
import { FIREBASE_AUTH } from "../FirebaseConfig";

// Screen
import HomeScreen from "../screens/HomeScreen";
import CalculatorScreen from "../screens/CalculatorScreen";
import LoginScreen from "../screens/LoginScreen";
import RegisterScreen from "../screens/RegisterScreen";
import MovieListScreen from "../screens/MovieListScreen";
import MovieDetail from "../screens/MovieDetailScreen";
import ShoppingListScreen from "../screens/ShoppingListScreen";
import Welcome from "../screens/WelcomeScreen";

// Icon
import { MaterialIcons } from "@expo/vector-icons";
import { FontAwesome5 } from "@expo/vector-icons";

const theme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    background: Colors.background,
  },
};

export default function Navigation() {
  return (
    <NavigationContainer theme={theme}>
      <RootNavigator />
    </NavigationContainer>
  );
}

const Stack = createNativeStackNavigator();

function RootNavigator() {
  const [isLogin, setIsLogin] = useState(false);

  useEffect(() => {
    onAuthStateChanged(FIREBASE_AUTH, (user) => {
      if (user) {
        console.log("USER : ", user);
        setIsLogin(true);
      } else {
        setIsLogin(false);
      }
    });
  }, []);
  console.log(isLogin);
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
      initialRouteName="Welcome"
    >
      {isLogin ? (
        <>
          <Stack.Screen name="HomeScreen" component={TabNavigator} />
          <Stack.Screen
            name="MovieDetail"
            component={MovieDetail}
            options={{ title: "Movie Detail" }}
          />
        </>
      ) : (
        <>
          <Stack.Screen name="Welcome" component={Welcome} />
          <Stack.Screen name="Login" component={LoginScreen} />
          <Stack.Screen name="Register" component={RegisterScreen} />
        </>
      )}
    </Stack.Navigator>
  );
}

function TabNavigator() {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: Colors.primary,
        tabBarInactiveTintColor: Colors.secondary,
        tabBarLabelStyle: {
          fontFamily: Font["poppins-semiBold"],
          fontSize: 12,
          letterSpacing: 1,
        },
        tabBarStyle: {
          backgroundColor: Colors.background,
          borderTopWidth: 1,
          elevation: 0,
          height: 60,
          borderTopColor: Colors.gray,
        },
        tabBarHideOnKeyboard: true,
      }}
    >
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{
          tabBarIcon: () => (
            <Icon name="home" size={25} color={Colors.primary} />
          ),
        }}
      />
      <Tab.Screen
        name="Movie List"
        component={MovieListScreen}
        options={{
          tabBarIcon: () => (
            <MaterialIcons
              name="local-movies"
              size={24}
              color={Colors.primary}
            />
          ),
        }}
      />
      <Tab.Screen
        name="Shopping List"
        component={ShoppingListScreen}
        options={{
          tabBarIcon: () => (
            <FontAwesome5
              name="clipboard-list"
              size={24}
              color={Colors.primary}
            />
          ),
        }}
      />
      <Tab.Screen
        name="Calculator"
        component={CalculatorScreen}
        options={{
          tabBarIcon: () => (
            <Icon name="calculator" size={25} color={Colors.primary} />
          ),
        }}
      />

      {/* <Tab.Screen
        name="BmiCalculator"
        component={BmiScreen}
        options={{
          tabBarIcon: () => <Icon name="weight" size={25} color={"#1F41BB"} />,
        }}
      />
      <Tab.Screen
        name="KonfersiSuhu"
        component={KonversiSuhuScreen}
        options={{
          tabBarIcon: () => (
            <Icon name="temperature-low" size={25} color={"#1F41BB"} />
          ),
        }}
      /> */}
      {/* <Tab.Screen
        name="Aboutme"
        component={AboutmeScreen}
        options={{
          tabBarIcon: () => (
            <Icon name="male" size={25} color={Colors.primary} />
          ),
        }}
      /> */}
    </Tab.Navigator>
  );
}
