import { useRef } from "react";
import { PanResponder, Animated } from "react-native";

type UseGestureHandlerProps = {
  onIn?: () => void;
  onOut?: () => void;
};

export const useGestureHandler = ({ onIn, onOut }: UseGestureHandlerProps) => {
  const outValue = 500;
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
          fadeIn();
        }
      },
    })
  ).current;

  const pan = useRef(
    new Animated.ValueXY({
      x: 0,
      y: outValue,
    })
  ).current;

  const fadeOut = () => {
    fade(outValue, onOut);
  };

  const fadeIn = () => {
    fade(0, onIn);
  };

  const fade = (to: number, cb?: () => void) => {
    Animated.timing(pan, {
      toValue: { x: 0, y: to },
      duration: 320,
      useNativeDriver: false,
    }).start(cb);
  };

  return {
    fadeIn,
    fadeOut,
    pan,
    panResponder,
  };
};
