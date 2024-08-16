import { observer } from "mobx-react-lite";
import Layout from "../../Components/Layout";
import Header from "../../Components/Header";
import {Button, View, TextInput, StyleSheet, Image} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import React, {useCallback, useEffect, useState} from "react";
import _ from "lodash";
import BackButton from "../../Components/BackButton";
import { useAppContext } from "../../Contexts/AppContext";
import UploadPictures from "../../Components/UploadPictures";
import * as ImagePicker from "expo-image-picker";
import {useAuthContext} from "../../Contexts/AuthContext";
import DropdownPicker, {ItemType} from "react-native-dropdown-picker";

function AddATenant() {
	const navigation = useNavigation<StackNavigationProp<RootStackParamList, "AddATenant">>();
	const appContext = useAppContext();
	const authContext = useAuthContext();
	const LeaseId = authContext.leaseId;
	const [DocumentPicture, setDocumentPicture] = useState("");
	const [tenantDetails, setTenantDetails] = useState<Tenant>({
		AnnualIncome: 0,
		DocumentProvidedUrl: "",
		UserId:authContext.uid,
		Email: authContext.username,
		SocialSecurity: "",
		TenantId: 0,
		Name: "",
		PhoneNumber: "",
		DateOfBirth: "",
		DocumentType:"",
	});
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
		{ label: "Tribal ID Card", value: "Tribal ID Card" },
	];

	const [selectedDocumentType, setSelectedDocumentType] = useState(documentTypes[0].value as string);


	const handleInputChange = useCallback((name: string, value: string | number) => {
		setTenantDetails({
			...tenantDetails,
			[name]: value,
		});
	}, [tenantDetails]);

	const areValidInputs = () => {
		if (!tenantDetails.Name) {
			alert("A Name is required");
			return false;
		}

		if(_.isEmpty(DocumentPicture)){
			alert("Please upload a document");
			return false;
		}

		if (!tenantDetails.AnnualIncome || isNaN(Number(tenantDetails.AnnualIncome))) {
			alert("Annual income is required and must be a number");
			tenantDetails.AnnualIncome = 0;
			return false;
		}

		if (!tenantDetails.PhoneNumber) {
			alert("Phone number is required");
			return false;
		} else if (!/^\d{3}-\d{3}-\d{4}$/.test(tenantDetails.PhoneNumber)) {
			alert("Invalid phone number format. Please use XXX-XXX-XXXX.");
			return false;
		}

		if (!tenantDetails.DateOfBirth) {
			alert("Date of birth is required");
			return false;
		} else if (!/^\d{4}-\d{2}-\d{2}$/.test(tenantDetails.DateOfBirth)) {
			alert("Invalid date format. Please use YYYY-MM-DD.");
			return false;
		}

		if (!tenantDetails.SocialSecurity) {
			alert("Social Security Number is required");
			return false;
		} else if (!/^\d{3}-\d{2}-\d{4}$/.test(tenantDetails.SocialSecurity)) {
			alert("Invalid Social Security Number format. Please use XXX-XX-XXXX.");
			return false;
		}
		return true;
	};

	const handleAddTenant = async () => {
		try {
			if (_.isUndefined(LeaseId) || _.isNull(LeaseId)) {
				alert("There is no lease selected");
				return;
			}
			if (!areValidInputs()) return;
			navigation.navigate("Login");
			tenantDetails.DocumentProvidedUrl = await appContext.uploadPicture(DocumentPicture, authContext.username,`/DocumentPictures/${tenantDetails.Name}/`);
			await appContext.addTenant({ ...tenantDetails, LeaseId: LeaseId });
			authContext.setLeaseId(null);
		} catch (error) {
			alert("There was an issue on our end. Please try again later.");
		}
	};

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
		setTenantDetails((prev) => ({ ...prev, DocumentType: selectedDocumentType }));
	}, [selectedDocumentType]);

	return (
		<Layout>
			<View style={styles.headerContainer}>
				<BackButton/>
				<Header title={"Please fill out all your information"} />
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
					value={tenantDetails.Name}
					onChangeText={(text) => handleInputChange("Name", text)}
					style={styles.input}
					placeholderTextColor="white"
				/>

				<TextInput
					placeholder="$50,000"
					value={tenantDetails.AnnualIncome.toString()}
					onChangeText={(text) => handleInputChange("AnnualIncome", parseInt(text))}
					style={styles.input}
					keyboardType="numeric"
					placeholderTextColor="white"
				/>

				<TextInput
					placeholder="123-456-7890"
					value={tenantDetails.PhoneNumber}
					onChangeText={(text) => handleInputChange("PhoneNumber", text)}
					style={styles.input}
					keyboardType="phone-pad"
					placeholderTextColor="white"
				/>

				<TextInput
					placeholder="Date of birth: YYYY-MM-DD"
					value={tenantDetails.DateOfBirth}
					onChangeText={(text) => handleInputChange("DateOfBirth", text)}
					style={styles.input}
					placeholderTextColor="white"
				/>

				<TextInput
					placeholder="Social Sec: 123-12-1234"
					value={tenantDetails.SocialSecurity}
					onChangeText={(text) => handleInputChange("SocialSecurity", text)}
					style={styles.input}
					keyboardType="phone-pad"
					placeholderTextColor="white"
				/>
				<Button title={"Done"} onPress={handleAddTenant} />
			</View>
		</Layout>
	);
}

export default observer(AddATenant);

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
