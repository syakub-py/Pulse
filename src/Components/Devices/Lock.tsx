import {Pressable, StyleSheet, Text, View} from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";
import {useState} from "react";

interface Props{
	lock:Device
}

export default function Lock(props:Props){
	const [isLocked, setIsLocked] = useState(false);
	const {lock} = props;
	const toggleIsLocked = () => {
		setIsLocked(!isLocked);
	};

	return(
		<Pressable onPress={toggleIsLocked}>
			{/* <Text>{lock.Location}</Text> */}
			<View style={[styles.container, {backgroundColor:isLocked?"black":"white"}]} >
				<View>
					<Ionicons name={isLocked?"lock-closed-outline":"lock-open-outline"} size={70} color={isLocked?"white":"black"}/>
					{(isLocked)?(<Text style={[styles.lockUnlockText, {color:isLocked?"white":"black"}]}>Locked</Text>):<Text style={[styles.lockUnlockText, {color:isLocked?"white":"black"}]}>unlocked</Text>}
				</View>
				<Text>{lock.Name}</Text>
			</View>
		</Pressable>
	);
}
const styles = StyleSheet.create({
	container: {
		height: 150,
		width: 150,
		backgroundColor: "black",
		opacity: 0.7,
		borderRadius: 20,
		justifyContent: "center",
		alignItems: "center"
	},
	lockUnlockText: {
		fontSize: 20,
		fontWeight: "bold",
		marginTop:10
	}
});
