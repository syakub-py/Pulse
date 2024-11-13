import {Image, StyleSheet, TextInput, View, ActivityIndicator, Button} from "react-native";
import {useNavigation} from "@react-navigation/native";
import {useState} from "react";
import PasswordRequirementCheckBox from "../../Components/SignUp/PasswordRequirementCheckBox";
import * as ImagePicker from "expo-image-picker";
import _ from "lodash";
import {auth} from "@src/Utils/FirebaseConfig";
import {StackNavigationProp} from "@react-navigation/stack";
import { updateProfile } from "firebase/auth";
import {observer} from "mobx-react-lite";
import UploadPictures from "../../Components/GlobalComponents/UploadPictures";
import Layout from "../../Components/GlobalComponents/Layout";
import Header from "../../Components/GlobalComponents/Header";
import BackButton from "../../Components/GlobalComponents/BackButton";
import { useAuthContext } from "@src/Contexts/AuthContext";
import { FirebaseError } from "firebase/app";
import PasswordInput from "@src/Components/GlobalComponents/PasswordInput";
import {useTenantContext} from "@src/Contexts/TenantContext";
import validateEmailAndPassword from "@src/Utils/ValidateInputs/ValidateEmailAndPassword";
import {PASSWORD_REQUIREMENTS} from "@src/Constants/Constants";
import config from "../../../env";

function CreateUsernameAndPassword() {
	const [username, setUsername] = useState("");
	const [password, setPassword] = useState("");
	const [profilePicture, setProfilePicture] = useState("");
	const [isLoading, setIsLoading] = useState(false);
	const navigation = useNavigation<StackNavigationProp<RootStackParamList, "CreateUsernameAndPassword">>();
	const authContext = useAuthContext();
	const userContext = useTenantContext();

	const selectPicture = async () => {
		const result = await ImagePicker.launchImageLibraryAsync({
			mediaTypes: ImagePicker.MediaTypeOptions.Images,
			aspect: [4, 3],
			quality: 1,
			allowsMultipleSelection: false,
		});
		if (result.canceled) {
			return "";
		}
		setProfilePicture(result.assets[0].uri);
	};

	const handleSignUp = async () => {
		if (validateEmailAndPassword(username, password, PASSWORD_REQUIREMENTS) && !_.isNull(userContext)) {
			setIsLoading(true);
			await authContext.signUp(username, password);
			navigation.navigate("EnterTenantCode");
			setIsLoading(false);
		}
	};

	return (
		<Layout>
			<View style={styles.header}>
				<BackButton/>
				<Header title={"Sign Up"}/>
			</View>
			<View style={styles.profilePictureContainer}>
				{(profilePicture)?(
					<Image src={profilePicture} style={styles.profilePicture}/>
				):(
					<UploadPictures onclick={selectPicture}/>
				)}
			</View>
			<TextInput onChangeText={(text) => setUsername(text)} placeholder={"Email"} style={styles.textInput}/>
			<PasswordInput setPassword={setPassword}/>

			<PasswordRequirementCheckBox requirements={PASSWORD_REQUIREMENTS} password={password}/>
			{
				(!isLoading)?(
					<Button title={"Next"} onPress={handleSignUp}/>
				):(
					<ActivityIndicator size={"small"} color={"white"}/>
				)
			}

		</Layout>

	);
}

export default observer(CreateUsernameAndPassword);

const styles = StyleSheet.create({
	nextButton: {
		backgroundColor:"transparent",
		width:"90%",
		margin:10,
		alignItems:"center",
		padding:10,
		borderRadius:15,
	},
	nextButtonText: {
		color: "white",
		fontSize:20,
		fontWeight:"bold"
	},
	profilePicture: {
		backgroundColor:"black",
		width:100,
		height:100,
		borderRadius:50,
		alignItems:"center",
		justifyContent:"center",
		opacity:0.8
	},
	profilePictureContainer: {
		alignItems:"center",
		marginBottom:20
	},
	textInput: {
		height: 40,
		margin: 12,
		paddingHorizontal: 10,
		backgroundColor: "whitesmoke",
		borderRadius: 15,
		width:"90%"
	},
	header:{
		flexDirection: "row",
		alignItems: "center",
	},
});

