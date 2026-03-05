import FontAwesome6 from "@expo/vector-icons/FontAwesome6";
import React from "react";
import { TouchableOpacity, View } from "react-native";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
} from "react-native-reanimated";

type AddButtonProps = {
  onPress: () => void;
};



export default function AddButton({ onPress }: AddButtonProps) {
  const animationValue = useSharedValue(1);
  const style = useAnimatedStyle(() => ({
    transform: [{ scale: animationValue.value }],
  }));
  return (
    <View className="flex-1">
      <Animated.View
        style={[style, { position: "absolute", bottom: 40, right: 40 }]}
      >
        <TouchableOpacity
          onPress={onPress}
          className="bg-blue-500 w-20 h-20 rounded-full items-center justify-center"
        >
          <FontAwesome6 name="plus" size={50} color="white" />
        </TouchableOpacity>
      </Animated.View>
    </View>
  );
}
