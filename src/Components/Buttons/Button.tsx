import {Pressable, StyleProp, Text, TextStyle, View, ViewStyle} from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";

interface Props {
	onPress?: () => void;
	title:string,
	containerStyle?: StyleProp<ViewStyle>;
	textStyle?: StyleProp<TextStyle>;
	iconName?:string,
}

export default function Button(props:Props){
	const {onPress, title, containerStyle, textStyle, iconName} = props;
	return (
		<Pressable onPress={onPress}>
			<View style={containerStyle}>
				{(!iconName) ?
					null : 
					<Ionicons name={iconName} size={20} color="white"/> 
				}
				<Text style={textStyle}>{title}</Text>
			</View>
		</Pressable>
	);
}
