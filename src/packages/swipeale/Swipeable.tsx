import {
  Animated,
  Dimensions,
  PanResponder,
  StyleSheet,
  Text,
  View,
} from "react-native";
import React, { PropsWithChildren } from "react";
import { useRef } from "react";

type Props = PropsWithChildren<{
  onLeftSwipe: () => void;
}>;

const Swipeable = ({ onLeftSwipe, children }: Props) => {
  const pan = useRef(new Animated.ValueXY()).current;
  const panResponser = useRef(
    PanResponder.create({
      onMoveShouldSetPanResponder: () => true,
      onStartShouldSetPanResponder: () => true,
      onPanResponderGrant: (e, g) => {
        pan.setOffset({
          x: (pan.x as any)._value,
          y: 0,
        });
        pan.setValue({ x: g.dx, y: 0 });
      },
      onPanResponderMove: (e, g) => {
        pan.setValue({ x: g.dx, y: 0 });
      },
      onPanResponderRelease: (e, g) => {
        if (g.dx < -50) {
          Animated.timing(pan, {
            toValue: {
              x: -Dimensions.get("screen").width,
              y: 0,
            },
            duration: 200,
            useNativeDriver: false,
          }).start(() => {
            onLeftSwipe();
          });
        } else {
          Animated.timing(pan, {
            toValue: 0,
            duration: 200,
            useNativeDriver: false,
          }).start();
        }
      },
    })
  ).current;

  return (
    <View style={styles.container}>
      <Animated.View
        style={[styles.swipeable, { transform: pan.getTranslateTransform() }]}
        {...panResponser.panHandlers}
      >
        {children}
      </Animated.View>
    </View>
  );
};

export default Swipeable;

const styles = StyleSheet.create({
  container: {
    width: "100%",
    backgroundColor: "red",
    position: "relative",
  },
  swipeable: {
    padding: 32,
    backgroundColor: "white",
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderColor: "#ddd",
  },
});
