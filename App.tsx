import { StatusBar } from "expo-status-bar";
import React, { useState } from "react";
import {
  Alert,
  LayoutAnimation,
  LayoutAnimationConfig,
  Platform,
  Pressable,
  StyleSheet,
  Text,
  TouchableOpacity,
  UIManager,
  View,
} from "react-native";
import { Modal } from "./src/packages/modal/Modal";
import Swipeable from "./src/packages/swipeale/Swipeable";

const layoutAnimConfig: LayoutAnimationConfig = {
  duration: 300,
  update: {
    type: LayoutAnimation.Types.easeInEaseOut,
  },
  delete: {
    duration: 300,
    type: LayoutAnimation.Types.easeInEaseOut,
    property: LayoutAnimation.Properties.opacity,
  },
};

if (
  Platform.OS === "android" &&
  UIManager.setLayoutAnimationEnabledExperimental
) {
  UIManager.setLayoutAnimationEnabledExperimental(true);
}

export default function App() {
  const [isOpen, setIsOpen] = useState(false);
  const [items, setItems] = useState(["🥑", "🍌", "🍕"]);

  return (
    <View style={styles.container}>
      <TouchableOpacity
        onPress={() => {
          setIsOpen(true);
        }}
      >
        <View style={{ padding: 32, backgroundColor: "green" }}>
          <Text style={{}}>Open modal</Text>
        </View>
      </TouchableOpacity>
      <Modal isOpen={isOpen} onClose={() => setIsOpen(false)}>
        <Pressable onPress={() => Alert.alert("Delete!")}>
          <View style={styles.option}>
            <Text>Delete</Text>
          </View>
        </Pressable>
        <View style={styles.option}>
          <Text>Change title</Text>
        </View>
      </Modal>
      {items.map((item, i) => (
        <Swipeable
          onLeftSwipe={() => {
            setItems((prev) => [...prev.filter((x) => x !== item)]);
            LayoutAnimation.configureNext(layoutAnimConfig);
          }}
          key={item}
        >
          <Text>{item}</Text>
        </Swipeable>
      ))}

      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  option: {
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#DDD",
  },
});
