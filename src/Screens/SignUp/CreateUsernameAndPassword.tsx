import {Image, StyleSheet, TextInput, View, ActivityIndicator, Button} from "react-native";
import {useNavigation} from "@react-navigation/native";
import {useState} from "react";
import PasswordRequirementCheckBox from "../../Components/SignUp/PasswordRequirementCheckBox";
import * as ImagePicker from "expo-image-picker";
import _ from "lodash";
import {auth} from "../../Utils/Firebase";
import {StackNavigationProp} from "@react-navigation/stack";
import { updateProfile } from "firebase/auth";
import {observer} from "mobx-react-lite";
import UploadPictures from "../../Components/UploadPictures";
import Layout from "../../Components/Layout";
import Header from "../../Components/Header";
import BackButton from "../../Components/BackButton";
import { useAuthContext } from "../../Contexts/AuthContext";
import {useAppContext} from "../../Contexts/AppContext";

import { FirebaseError } from "firebase/app";


const validateForm = (username: string, password: string, requirements: PasswordRequirement[]): boolean => {
	const emailRegex = /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/;

	if (!username || !password) {
		alert("Please fill out all fields.");
		return false;
	}
	if (!emailRegex.test(username)) {
		alert("Please enter a valid email address.");
		return false;
	}
	if (!requirements.every(requirement => requirement.fulfilled)) {
		alert("Make sure the password meets all requirements.");
		return false;
	}
	return true;
};

function CreateUsernameAndPassword() {
	const [username, setUsername] = useState("");
	const [password, setPassword] = useState("");
	const [profilePicture, setProfilePicture] = useState("");
	const navigation = useNavigation<StackNavigationProp<RootStackParamList, "CreateUsernameAndPassword">>();
	const authContext = useAuthContext();
	const appContext = useAppContext();
	const requirements:PasswordRequirement[] = [
		{
			label: "At least 8 characters and less than 50 characters",
			fulfilled: password.length >= 8 && password.length <= 50,
		},
		{
			label: "Contains at least one uppercase letter",
			fulfilled: /[A-Z]/.test(password),
		},
		{
			label: "Contains at least one lowercase letter",
			fulfilled: /[a-z]/.test(password),
		},
		{
			label: "Contains at least one number",
			fulfilled: /\d/.test(password),
		},
		{
			label: "Contains at least one special character",
			fulfilled: /[!@#$%^&*()_+{}[\]:;<>,.?~\\-]/.test(password),
		},
	];

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
		if (validateForm(username, password, requirements)) {
			try {
				const user = await auth.createUserWithEmailAndPassword(username, password);
				if (!_.isEmpty(user.user) && !_.isNull(user.user)) {
					if (!_.isEmpty(profilePicture)) {
						const profilePictureUrl = await appContext.uploadPicture(profilePicture, username, `ProfilePictures/${username}/`);
						authContext.setProfilePicture(profilePictureUrl);
						await updateProfile(user.user, {photoURL: profilePictureUrl});
					} else {
						authContext.setProfilePicture("https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png");
					}
					authContext.setUid(user.user.uid);
					authContext.setUsername(username);
					authContext.setPassword(password);
					navigation.navigate("EnterTenantCode");
				}
			}catch (error) {
				if (error instanceof FirebaseError) {
					console.error("Firebase Error:", error);
					alert(error.message);
				}
				console.error("General Error:", error);
				authContext.setProfilePicture("https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png");
				alert(error);
			}
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
			<TextInput onChangeText={(text) => setPassword(text)} placeholder={"Password"} style={styles.textInput} secureTextEntry/>
			<PasswordRequirementCheckBox requirements={requirements}/>
			<Button title={"Next"} onPress={handleSignUp}/>

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
	},
	header:{
		flexDirection: "row",
		alignItems: "center",
	}
});

