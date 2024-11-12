import { observer } from "mobx-react-lite";
import Layout from "../../Components/GlobalComponents/Layout";
import Header from "../../Components/GlobalComponents/Header";
import {Button, View, TextInput, StyleSheet, Image, ActivityIndicator} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import React, {useCallback, useEffect, useState} from "react";
import BackButton from "../../Components/GlobalComponents/BackButton";
import UploadPictures from "../../Components/GlobalComponents/UploadPictures";
import * as ImagePicker from "expo-image-picker";
import {useAuthContext} from "@src/Contexts/AuthContext";
import DropdownPicker, {ItemType} from "react-native-dropdown-picker";
import ValidateAddUserInputs from "@src/Utils/ValidateInputs/ValidateAddUserInputs";
import {useTenantContext} from "@src/Contexts/TenantContext";
import _ from "lodash";

function AddAUser() {
	const navigation = useNavigation<StackNavigationProp<RootStackParamList, "AddAUser">>();
	const userContext = useTenantContext();
	const authContext = useAuthContext();
	const LeaseId = authContext.leaseId;
	const [DocumentPicture, setDocumentPicture] = useState("");
	const [userDetails, setUserDetails] = useState<User>({
		leaseId: LeaseId,
		AnnualIncome: 0,
		DocumentProvidedUrl: "",
		firebaseUserId:authContext.firebaseUid,
		Email: authContext.username,
		SocialSecurity: "",
		Name: "",
		PhoneNumber: "",
		DateOfBirth: "",
		DocumentType:"",
	});
	const [isLoading, setIsLoading] = useState(false);
	const [open, setOpen] = useState(false);

	const documentTypes: ItemType<string>[] = [
		{ label: "Driver's License", value: "Driver's License" },
		{ label: "Passport", value: "Passport" },
		{ label: "National Identity Card", value: "National Identity Card" },
		{ label: "Social Security Card", value: "Social Security Card" },
		{ label: "Birth Certificate", value: "Birth Certificate" },
		{ label: "State ID Card", value: "State ID Card" },
		{ label: "Voter Registration Card", value: "Voter Registration Card" },
		{ label: "Military ID", value: "Military ID" },
		{ label: "Permanent Resident Card (Green Card)", value: "Permanent Resident Card (Green Card)" },
	];

	const [selectedDocumentType, setSelectedDocumentType] = useState(documentTypes[0].value as string);

	const handleInputChange = useCallback((name: string, value: string | number) => {
		setUserDetails({
			...userDetails,
			[name]: value,
		});
	}, [userDetails]);

	const handleAddUser = useCallback(async () => {
		try {
			if (!ValidateAddUserInputs(userDetails, DocumentPicture) || _.isNull(userContext)) return;
			setIsLoading(true);
			userDetails.DocumentProvidedUrl = await userContext.uploadPicture(DocumentPicture, `/DocumentPictures/${userDetails.Email}/`);

			const isAddUserSuccessful = await userContext.addUser(userDetails);

			if (!isAddUserSuccessful) return;

			authContext.setLeaseId(null);
			await authContext.clearContextAndFirebaseLogout();
			navigation.navigate("Login");
			setIsLoading(false);
		} catch (error) {
			alert("There was an issue on our end. Please try again later.");
			setIsLoading(false);
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [userDetails, DocumentPicture, userContext, authContext, LeaseId, navigation]);

	const selectPicture = async () => {
		const result = await ImagePicker.launchImageLibraryAsync({
			mediaTypes: ImagePicker.MediaTypeOptions.Images,
			aspect: [4, 3],
			quality: 1,
			allowsMultipleSelection: false,
		});
		if (result.canceled) {
			return;
		}
		setDocumentPicture(result.assets[0].uri);
	};

	useEffect(() => {
		setUserDetails((prev) => ({ ...prev, DocumentType: selectedDocumentType }));
	}, [selectedDocumentType]);

	return (
		<Layout>
			<View style={styles.headerContainer}>
				<BackButton/>
				<Header title={"Additional information"} />
			</View>
			<View style={styles.contentContainer}>
				<DropdownPicker
					open={open}
					value={selectedDocumentType}
					items={documentTypes}
					setOpen={setOpen}
					setValue={setSelectedDocumentType}
					placeholder="Select a Document"
					{...styles}
				/>
				{(DocumentPicture) ? (
					<Image src={DocumentPicture} style={styles.documentPictureContainer}/>
				) : (
					<UploadPictures onclick={selectPicture}/>
				)}

				<TextInput
					placeholder="John Doe"
					value={userDetails.Name}
					onChangeText={(text) => handleInputChange("Name", text)}
					style={styles.input}
					placeholderTextColor="white"
				/>

				<TextInput
					placeholder="$50,000"
					value={userDetails.AnnualIncome.toString()}
					onChangeText={(text) => handleInputChange("AnnualIncome", parseInt(text))}
					style={styles.input}
					keyboardType="numeric"
					placeholderTextColor="white"
				/>

				<TextInput
					placeholder="123-456-7890"
					value={userDetails.PhoneNumber}
					onChangeText={(text) => handleInputChange("PhoneNumber", text)}
					style={styles.input}
					keyboardType="phone-pad"
					placeholderTextColor="white"
				/>

				<TextInput
					placeholder="Date of birth: YYYY-MM-DD"
					value={userDetails.DateOfBirth}
					onChangeText={(text) => handleInputChange("DateOfBirth", text)}
					style={styles.input}
					placeholderTextColor="white"
				/>

				<TextInput
					placeholder="Social Sec: 123-12-1234"
					value={userDetails.SocialSecurity}
					onChangeText={(text) => handleInputChange("SocialSecurity", text)}
					style={styles.input}
					keyboardType="phone-pad"
					placeholderTextColor="white"
				/>
				{
					(!isLoading)?(
						<Button title={"Done"} onPress={handleAddUser} />
					):(
						<ActivityIndicator size={"small"} color={"white"}/>
					)
				}
			</View>
		</Layout>
	);
}

export default observer(AddAUser);

const styles = StyleSheet.create({
	input: {
		height: 40,
		backgroundColor: "#333",
		borderColor: "#555",
		borderWidth: 1,
		borderRadius: 5,
		paddingHorizontal: 10,
		paddingVertical: 5,
		color:"white",
		marginHorizontal:10,
		marginVertical:10,
	},
	headerContainer:{
		flexDirection: "row",
		alignItems: "center",
	},
	contentContainer:{
		padding: 20
	},
	documentPictureContainer:{
		width:200,
		height:200,
		borderRadius:10,
	}
});
