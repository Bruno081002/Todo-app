import { Stack } from "expo-router";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import "../global.css"

export default function RootLayout() {
  return (
	  <Stack> 
	  <Stack.Screen name="index" options={{headerShown: false}} />
	  </Stack>
  );
}
