import { observer } from "mobx-react-lite";
import {TextInput, StyleSheet, Button, SafeAreaView, View} from "react-native";
import { useContext, useState } from "react";
import { AppContext } from "../Contexts/AppContext";
import Header from "../Components/Header";
import DropdownPicker, { ItemType } from "react-native-dropdown-picker";
import {useNavigation} from "@react-navigation/native";
import {StackNavigationProp} from "@react-navigation/stack";
import BackButton from "../Components/BackButton";


function AddAProperty() {
	const [propertyDetails, setPropertyDetails] = useState<Property>({
		PropertyId: 0,
		Name: "",
		Address: "",
		PropertyType: "",
		isRental: false,
	});

	const propertyTypes: ItemType<string>[] = [
		{ label: "Single Family Home", value: "Home" },
		{ label: "Vacation Home", value: "Vacation Home" },
		{ label: "Condominium", value: "Condo" },
		{ label: "Multi-Family", value: "Multi-Family" },
		{ label: "Commercial Building", value: "Commercial Building" },
	];

	const [open, setOpen] = useState(false);
	const [selectedPropertyType, setSelectedPropertyType] = useState(propertyTypes[0].value as string);
	const appContext = useContext(AppContext);
	const navigation = useNavigation<StackNavigationProp<RootStackParamList, "AddAProperty">>();

	const handleInputChange = (field: keyof Property, value: string | string[] | boolean | number) => {
		setPropertyDetails((prev) => ({ ...prev, [field]: value }));
	};

	const handleSubmit = async (): Promise<void> => {
		propertyDetails.PropertyType = selectedPropertyType;
		await appContext.addProperty(propertyDetails);
		if (propertyDetails.isRental){
			appContext.setSelectedProperty(propertyDetails);
			navigation.navigate("AddALease");
		}else{
			navigation.navigate("BottomNavBar");
		}
	};

	return (
		<SafeAreaView style={styles.container}>
			<View style={styles.header}>
				<BackButton/>
				<Header title={"Add A Property"}/>
			</View>
			<TextInput
				style={styles.input}
				placeholder="Give the property a nick name"
				placeholderTextColor="white"
				value={propertyDetails.Name}
				onChangeText={(value) => handleInputChange("Name", value)}
			/>
			<TextInput
				style={styles.input}
				placeholder="Address"
				placeholderTextColor="white"
				value={propertyDetails.Address}
				onChangeText={(value) => handleInputChange("Address", value)}
			/>
			<DropdownPicker
				open={open}
				value={selectedPropertyType}
				items={propertyTypes}
				setOpen={setOpen}
				setValue={setSelectedPropertyType}
				placeholder="Property Type"
				{...styles}
			/>
			<Button
				title={!propertyDetails.isRental ? "Not a Rental" : "Is a Rental"}
				onPress={() => handleInputChange("isRental", !propertyDetails.isRental)}
			/>
			<Button title="Add This Property" onPress={handleSubmit} />
		</SafeAreaView>
	);
}

const styles = StyleSheet.create({
	container: {
		padding: 20,
		flex: 1,
		backgroundColor:"black"
	},
	input: {
		height: 40,
		backgroundColor: "#333",
		marginBottom: 10,
		paddingHorizontal: 10,
		borderRadius: 5,
		opacity: 0.7,
		color: "white",
	},
	multilineInput: {
		height: 100,
		textAlignVertical: "top",
	},
	style: {
		backgroundColor: "#333",
		borderColor: "#555",
		borderWidth: 1,
		borderRadius: 5,
		paddingHorizontal: 10,
		paddingVertical: 5,
	},
	textStyle: {
		color: "#fff",
		fontSize: 16,
	},
	placeholderStyle: {
		color: "#aaa",
		fontSize: 16,
	},
	dropdownStyle: {
		backgroundColor: "#333",
		borderColor: "#555",
		borderWidth: 1,
		borderRadius: 5,
	},
	listItemContainerStyle: {
		backgroundColor: "#333",
	},
	dropdownItemStyle: {
		backgroundColor: "#333",
		paddingVertical: 10,
		paddingHorizontal: 10,
		borderBottomColor: "#555",
		borderBottomWidth: 1,
	},
	dropdownItemTextStyle: {
		color: "#fff",
		fontSize: 16,
	},
	header:{
		flexDirection: "row",
		alignItems: "center",
	}
});

export default observer(AddAProperty);
