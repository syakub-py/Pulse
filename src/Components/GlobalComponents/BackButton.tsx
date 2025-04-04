import {Pressable} from "react-native";
import {useNavigation} from "@react-navigation/native";
import Ionicons from "react-native-vector-icons/Ionicons";

export default function BackButton() {
	const navigation = useNavigation();
	return (
		<Pressable onPress={() => navigation.goBack()}>
			<Ionicons name="chevron-back-outline" size={30} color={"white"}/>
		</Pressable>
	);
}
