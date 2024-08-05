import { observer } from "mobx-react-lite";
import Layout from "../Components/Layout";
import Header from "../Components/Header";
import { Button, View, TextInput, StyleSheet } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import React, { useContext, useState } from "react";
import _ from "lodash";
import { AppContext } from "../Contexts/AppContext";
import BackButton from "../Components/BackButton";

function AddATenant() {
	const navigation = useNavigation<StackNavigationProp<RootStackParamList, "AddATenant">>();
	const appContext = useContext(AppContext);
	const [leaseIndex, setLeaseIndex] = useState(0);
	const LeaseId = !_.isUndefined(appContext.SelectedPropertyLeases[leaseIndex]) ? appContext.SelectedPropertyLeases[leaseIndex].LeaseId : undefined;

	const [tenantDetails, setTenantDetails] = useState<Tenant>({
		Name: "",
		PhoneNumber: "",
		DateOfBirth: "",
		LeaseId: LeaseId
	});

	const handleInputChange = (name: string, value: string | number) => {
		setTenantDetails({
			...tenantDetails,
			[name]: value,
		});
	};

	const areValidInputs = () => {
		if (!tenantDetails.Name) {
			alert("A Name is required");
			return false;
		}

		if (!tenantDetails.AnnualIncome || isNaN(Number(tenantDetails.AnnualIncome))) {
			alert("Annual income is required and must be a number");
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

		return true;
	};

	const handleAddTenant = async () => {
		try {
			if (leaseIndex >= appContext.SelectedPropertyLeases.length) {
				navigation.navigate("BottomNavBar");
				return;
			}
			if (_.isUndefined(LeaseId)) {
				alert("There is no lease selected");
				return;
			}

			if (!areValidInputs()) {
				return;
			}

			await appContext.addTenant(LeaseId, { ...tenantDetails, LeaseId: LeaseId });
			setLeaseIndex(leaseIndex + 1);

		} catch (error) {
			alert("There was an issue adding your lease");
		}
	};

	return (
		<Layout>
			<View style={styles.headerContainer}>
				<BackButton/>
				<Header title={"Add Your tenants for this property"} />
			</View>
			<View style={styles.contentContainer}>
				<TextInput
					placeholder="John Doe"
					value={tenantDetails.Name}
					onChangeText={(text) => handleInputChange("Name", text)}
					style={styles.input}
					placeholderTextColor="white"
				/>

				<TextInput
					placeholder="$50,000"
					value={tenantDetails.AnnualIncome?.toString()}
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

				<Button title={leaseIndex < appContext.SelectedPropertyLeases.length - 1 ? "Add Tenant and Continue" : "Add Tenant and Finish"} onPress={handleAddTenant} />
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
		color:"white"
	},
	headerContainer:{
		flexDirection: "row",
		alignItems: "center",
	},
	contentContainer:{
		padding: 20
	}

});
