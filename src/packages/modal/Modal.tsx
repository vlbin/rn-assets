import React, { PropsWithChildren, useEffect } from "react";
import {
  Animated,
  Modal as RNModal,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import { styles } from "./styles";
import { useGestureHandler } from "./useGestureHandler";

type ModalProps = PropsWithChildren<{
  onClose: () => void;
  isOpen: boolean;
}>;

const Modal = ({ isOpen, onClose, children }: ModalProps) => {
  const { fadeIn, fadeOut, pan, panResponder } = useGestureHandler({
    onOut: onClose,
  });

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
