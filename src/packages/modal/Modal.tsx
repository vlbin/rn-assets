import React, {
  Fragment,
  PropsWithChildren,
  useEffect,
  useRef,
  useState,
} from "react";
import {
  Animated,
  Modal as RNModal,
  PanResponder,
  StyleSheet,
  TouchableWithoutFeedback,
  View,
} from "react-native";

type ModalProps = PropsWithChildren<{
  onClose: () => void;
  isOpen: boolean;
}>;

const Modal = ({ isOpen, onClose, children }: ModalProps) => {
  const inValue = 0;
  const outValue = 500;

  const pan = useRef(
    new Animated.ValueXY({
      x: 0,
      y: outValue,
    })
  ).current;

  const fadeOut = () => {
    Animated.timing(pan, {
      toValue: { x: 0, y: outValue },
      duration: 200,
      useNativeDriver: false,
    }).start(() => {
      onClose();
    });
  };

  const fadeIn = () => {
    Animated.timing(pan, {
      toValue: {
        x: 0,
        y: 0,
      },
      duration: 200,
      useNativeDriver: false,
    }).start();
  };

  const panResponder = useRef(
    PanResponder.create({
      onMoveShouldSetPanResponder: () => true,
      onStartShouldSetPanResponder: () => true,
      onPanResponderGrant: (e, g) => {
        pan.setOffset({
          x: 0,
          y: (pan.y as any)._value,
        });
        pan.setValue({ x: 0, y: g.dy });
      },
      onPanResponderMove: (e, g) => {
        if (g.dy > 0) {
          pan.setValue({ x: 0, y: g.dy });
        }
      },
      onPanResponderRelease: (e, g) => {
        if (g.vy > 0.3) {
          fadeOut();
        } else {
          Animated.timing(pan, {
            toValue: { x: 0, y: 0 },
            duration: 300,
            useNativeDriver: false,
          }).start();
        }
      },
    })
  ).current;

  useEffect(() => {
    if (isOpen) fadeIn();
  }, [isOpen]);

  return (
    <RNModal animationType="fade" transparent={true} visible={isOpen}>
      <View style={styles.container}>
        <TouchableWithoutFeedback onPress={fadeOut}>
          <View style={styles.overlay} />
        </TouchableWithoutFeedback>

        <Animated.View
          style={[styles.content, { transform: pan.getTranslateTransform() }]}
          {...panResponder.panHandlers}
        >
          <View style={styles.handle} />
          <View style={[styles.innerContent]}>{children}</View>
        </Animated.View>
      </View>
    </RNModal>
  );
};

export { Modal };

const styles = StyleSheet.create({
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
