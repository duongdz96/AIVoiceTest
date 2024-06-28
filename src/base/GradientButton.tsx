import React, { ReactNode } from 'react';
import {
  Dimensions,
  GestureResponderEvent,
  StyleProp,
  Text,
  TouchableOpacity,
  ViewStyle,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

export type ButtonProps = {
  children: ReactNode;
  onPress?: (event: GestureResponderEvent) => void;
  style?: StyleProp<ViewStyle>;
  width: number;
  radius: number;
  height: number;
};

const GradientButton = ({
  children,
  onPress,
  width,
  radius,
  height,
}: ButtonProps) => {
  return (
    <TouchableOpacity onPress={onPress} style={{ alignItems: 'center' }}>
      <LinearGradient
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        colors={['#F79394', '#A245B8']}
        style={{
          borderRadius: radius,
          width: width,
          height: height,
          alignItems: 'center',
          justifyContent: 'center',
        }}>
        {children}
      </LinearGradient>
    </TouchableOpacity>
  );
};

export default GradientButton;
