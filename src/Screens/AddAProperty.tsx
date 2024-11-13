import { observer } from "mobx-react-lite";
import {TextInput, StyleSheet, Button, SafeAreaView, View} from "react-native";
import {useCallback, useState} from "react";
import Header from "../Components/GlobalComponents/Header";
import DropdownPicker, { ItemType } from "react-native-dropdown-picker";
import {useNavigation} from "@react-navigation/native";
import {StackNavigationProp} from "@react-navigation/stack";
import BackButton from "../Components/GlobalComponents/BackButton";
import {usePropertyContext} from "@src/Contexts/PropertyContext";
import _ from "lodash";
import {useAuthContext} from "@src/Contexts/AuthContext";
import {PROPERTY_TYPES} from "@src/Constants/Constants";

function AddAProperty() {
	const [propertyDetails, setPropertyDetails] = useState<Property>({
		Name: "",
		Address: "",
		PropertyType: "",
		isRental: false,
		PurchasePrice: "",
		Taxes: "",
		MortgagePayment: "",
		OperatingExpenses: "",
	});

	const [open, setOpen] = useState(false);
	const [selectedPropertyType, setSelectedPropertyType] = useState(PROPERTY_TYPES[0].value as string);
	const propertyContext = usePropertyContext();
	const navigation = useNavigation<StackNavigationProp<RootStackParamList, "AddAProperty">>();
	const authContext = useAuthContext();
	const handleInputChange = (field: keyof Property, value: string | string[] | boolean | number) => {
		setPropertyDetails((prev) => ({ ...prev, [field]: value }));
	};

	const handleSubmit = useCallback(async (): Promise<void> => {
		if (_.isNull(propertyContext)) return;

	    propertyDetails.PropertyType = selectedPropertyType;
	    const isAddPropertySuccessful = await propertyContext.addProperty(authContext.postgresUid, propertyDetails);

	    if (!isAddPropertySuccessful) return;

	    if (propertyDetails.isRental) {
	        propertyContext.setSelectedProperty(propertyDetails);
	        navigation.navigate("AddALease");
	    } else {
	        navigation.navigate("BottomNavBar");
	    }
	}, [propertyContext, propertyDetails, selectedPropertyType, authContext.postgresUid, navigation]);

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
				items={PROPERTY_TYPES}
				setOpen={setOpen}
				setValue={setSelectedPropertyType}
				placeholder="Property Type"
				{...styles}
			/>
			<TextInput
				style={styles.input}
				placeholder="monthly operating expenses"
				placeholderTextColor="white"
				value={propertyDetails.OperatingExpenses}
				onChangeText={(value) => handleInputChange("OperatingExpenses", value)}
			/>
			<TextInput
				style={styles.input}
				placeholder="monthly mortgage payment"
				placeholderTextColor="white"
				value={propertyDetails.MortgagePayment}
				onChangeText={(value) => handleInputChange("MortgagePayment", value)}
			/>
			<TextInput
				style={styles.input}
				placeholder="Taxes"
				placeholderTextColor="white"
				value={propertyDetails.Taxes}
				onChangeText={(value) => handleInputChange("Taxes", value)}
			/>
			<TextInput
				style={styles.input}
				placeholder="Purchase Price"
				placeholderTextColor="white"
				value={propertyDetails.PurchasePrice}
				onChangeText={(value) => handleInputChange("PurchasePrice", value)}
			/>
			<Button
				title={!propertyDetails.isRental ? "Not a Rental" : "Is a Rental"}
				onPress={() => handleInputChange("isRental", !propertyDetails.isRental)}
			/>
			<Button title="Add This Property" onPress={handleSubmit} />
		</SafeAreaView>
	);
}

const styles= StyleSheet.create({
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
