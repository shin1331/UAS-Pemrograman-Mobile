import { StyleSheet } from "react-native";

export const globalStyles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
  },
  header: {
    fontSize: 24,
    marginBottom: 20,
    fontWeight: "bold",
    color: "#fff",
  },
  input: {
    width: "80%",
    height: 40,
    borderColor: "#fff",
    borderWidth: 1,
    borderRadius: 5,
    marginBottom: 10,
    paddingLeft: 10,
    color: "#fff",
  },
  registerText: {
    marginTop: 10,
    color: "#fff",
    textDecorationLine: "underline",
  },
  loginText: {
    marginTop: 10,
    color: "#fff",
    textDecorationLine: "underline",
  },
});
