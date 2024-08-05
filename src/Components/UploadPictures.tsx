import {Pressable, StyleSheet} from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";
import {observer} from "mobx-react-lite";

interface Props{
	onclick:()=>void;
}

function UploadPictures(props:Props) {
	const {onclick} = props;
	return (
		<Pressable style={styles.profilePicture} onPress={()=>onclick()}>
			<Ionicons name={"cloud-upload-outline"} color={"white"} size={30}/>
		</Pressable>
	);
}

export default observer(UploadPictures);

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
