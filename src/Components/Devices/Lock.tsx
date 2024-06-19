import {Pressable, StyleSheet, Text, View} from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";
import {useState} from "react";

export default function Lock(){
	const [isLocked, setIsLocked] = useState(false);
	const toggleIsLocked = () => {
		setIsLocked(!isLocked);
	};
	return(
		<Pressable onPress={toggleIsLocked}>
			<View style={styles.container} >
				{
					(isLocked)?(
						<View>
							<Ionicons name={"lock-closed-outline"} size={70} color={"white"}/>
							<Text style={[styles.lockUnlockText, {color:isLocked?"white":"black"}]}>Locked</Text>
						</View>
					):(
						<View>
							<Ionicons name={"lock-open-outline"} size={70} color={"white"}/>
							<Text style={[styles.lockUnlockText, {color:isLocked?"black":"white"}]}>Unlocked</Text>
						</View>
					)
				}
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
	}
});
