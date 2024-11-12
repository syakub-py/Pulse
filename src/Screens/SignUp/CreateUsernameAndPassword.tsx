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
		if (validateEmailAndPassword(username, password, PASSWORD_REQUIREMENTS)) {
			setIsLoading(true);
			try {
				const user = await auth.createUserWithEmailAndPassword(username, password);
				if (_.isEmpty(user.user) && _.isNull(user.user) || _.isNull(userContext)) return;
				if (!_.isEmpty(profilePicture)) {
					const profilePictureUrl = await userContext.uploadPicture(profilePicture, `ProfilePictures/${username}/`);
					authContext.setProfilePicture(profilePictureUrl);
					await updateProfile(user.user, {photoURL: profilePictureUrl});
				} else {
					authContext.setProfilePicture("https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png");
				}
				authContext.setFirebaseUid(user.user.uid);
				authContext.setUsername(username);
				authContext.setPassword(password);
				navigation.navigate("EnterTenantCode");
			}catch (error) {
				if (error instanceof FirebaseError) {
					console.error("Firebase Error:", error);
					alert(error.message);
				}else{
					console.error("General Error:", error);
					authContext.setProfilePicture("https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png");
					alert(error);
				}
			}
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

