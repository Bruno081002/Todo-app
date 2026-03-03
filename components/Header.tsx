import React from "react";
import { Text, View, TouchableOpacity } from "react-native";
import { router } from "expo-router";
import { useSafeAreaInsets } from "react-native-safe-area-context";

type HeaderProps = {
	title: string,
}

export default function Header({title}: HeaderProps) {
	const handleBackPress = () => {
		router.back();
	}
	const insets = useSafeAreaInsets();
	return (
		<View  style={{paddingTop: insets.top}}{...{/*style={{paddingTop: insets.top, position: "absolute", top: 0}} */}} className=" w-full pb-2 flex-row justify-between px-6 bg-background bg-gray-200 shadow-2xl"> 
			<View className="flex-row items-center flex-1 px-6 h-16 rounded-md">	
				<TouchableOpacity onPress={handleBackPress} className="mr-4">
					<Text className="text-black-500 text-2xl">{title}</Text>
				</TouchableOpacity>
			</View>		
		</View>
	) 
}
