import {Pressable, StyleProp, Text, TextStyle, View, ViewStyle} from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";
import React from "react";
import {observer} from "mobx-react-lite";

interface Props {
	onPress?: () => void;
	title:string,
	containerStyle?: StyleProp<ViewStyle>;
	textStyle?: StyleProp<TextStyle>;
	iconName?:string,
}

function Button(props:Props){
	const {onPress, title, containerStyle, textStyle, iconName} = props;
	return (
		<Pressable onPress={onPress}>
			<View style={containerStyle}>
				{
					(iconName)?(
						<Ionicons name={iconName} size={20} color="white"/>
					):null
				}
				<Text style={textStyle}>{title}</Text>
			</View>
		</Pressable>
	);
}
export default observer(Button);
