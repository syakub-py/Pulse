import {Pressable, StyleSheet} from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";

interface Props{
	onclick:()=>void;
}

export default function UploadPictures(props:Props) {
	const {onclick} = props;
	return (
		<Pressable style={styles.profilePicture} onPress={()=>onclick()}>
			<Ionicons name={"cloud-upload-outline"} color={"white"} size={30}/>
		</Pressable>
	);
}


const styles = StyleSheet.create({
	profilePicture: {
		backgroundColor:"black",
		width:100,
		height:100,
		borderRadius:50,
		alignItems:"center",
		justifyContent:"center",
		opacity:0.8
	},
});
