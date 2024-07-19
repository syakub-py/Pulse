import {StyleSheet, TextInput, View} from "react-native";
import {useContext, useState} from "react";
import SignUpLayout from "../../Components/SignUpLayout";
import {useNavigation} from "@react-navigation/native";
import * as ImagePicker from "expo-image-picker";
import {AppContext} from "../../Contexts/AppContext";

export default function AddHomes() {
	const appContext = useContext(AppContext);
	const navigation = useNavigation();
	const [housePhotos, setHousePhotos] = useState<string[]>();
	const [nickName, setNickName] = useState("");
	const [address, setAddress] = useState("");
	const [description, setDescription] = useState("");

	const selectHousePhotos = async () => {
		const result = await ImagePicker.launchImageLibraryAsync({
			mediaTypes: ImagePicker.MediaTypeOptions.Images,
			aspect: [4, 3],
			quality: 1,
		});
		if (!result.canceled) {
			return result.assets.map((photo)=>photo.uri);
		}
		return [];
	};

	const continueToConfigureDevices = async ()=>{
		const localPhotosUrl = await selectHousePhotos();
		setHousePhotos(await appContext.upload(localPhotosUrl, address));
	};

	return (
		<SignUpLayout>
			<View>
				<TextInput style={styles.textInput} placeholder={"Nick name"} onChangeText={(text)=>setNickName(text)}/>
				<TextInput style={styles.textInput} placeholder={"Address"} onChangeText={(text)=>setAddress(text)}/>
				<TextInput style={styles.textInput} placeholder={"Description"} onChangeText={(text)=>setDescription(text)}/>
				{/*<Button title={"Next"} onPress={() => navigation.navigate("")}/>*/}
			</View>
		</SignUpLayout>
	);
}

const styles = StyleSheet.create({
	textInput: {
		height: 40,
		margin: 12,
		paddingHorizontal: 10,
		backgroundColor: "whitesmoke",
		borderRadius: 15,
	},
});
