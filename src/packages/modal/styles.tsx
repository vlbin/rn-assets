import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    top: 0,
    justifyContent: "flex-end",
  },
  handle: {
    backgroundColor: "#00000044",
    width: 32,
    height: 4,
    borderRadius: 1000,
  },
  overlay: {
    backgroundColor: "#000000AA",
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    top: 0,
    justifyContent: "flex-end",
  },
  content: {
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
    backgroundColor: "white",
    elevation: 4,
    alignItems: "center",
    padding: 8,
    zIndex: 10,
  },
  innerContent: {
    width: "100%",
    padding: 16,
    zIndex: 10,
  },
});
