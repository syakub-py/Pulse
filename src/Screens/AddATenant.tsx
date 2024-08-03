import { observer } from "mobx-react-lite";
import Layout from "../Components/Layout";
import Header from "../Components/Header";
import { Button, View, TextInput, Text, StyleSheet } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { useContext, useState } from "react";
import _ from "lodash";
import { AppContext } from "../Contexts/AppContext";

function AddATenant() {
	const navigation = useNavigation<StackNavigationProp<RootStackParamList, "AddATenant">>();
	const appContext = useContext(AppContext);
	const [leaseIndex, setLeaseIndex] = useState(0);
	const LeaseId = !_.isUndefined(appContext.SelectedPropertyLeases[leaseIndex]) ? appContext.SelectedPropertyLeases[leaseIndex].LeaseId : undefined;

	const [tenantDetails, setTenantDetails] = useState<Tenant>({
		Name: "",
		AnnualIncome: 0,
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

	const handleAddTenant = async () => {
		try {
			if (leaseIndex >= appContext.SelectedPropertyLeases.length) {
				navigation.navigate("BottomNavBar");
				return;
			}

			if (_.isUndefined(LeaseId)) {
				alert("There is no lease id");
				return;
			}

			await appContext.addTenant(LeaseId, { ...tenantDetails, LeaseId: LeaseId });
			setLeaseIndex(leaseIndex + 1);

		} catch (error) {
			console.error(error);
		}
	};

	return (
		<Layout>
			<Header title={"Add Your tenants for this property"} />
			<View style={{ padding: 20 }}>
				<Text>
					Adding tenant for Lease {leaseIndex + 1} of {appContext.SelectedPropertyLeases.length}
				</Text>
				<Text>Name:</Text>
				<TextInput
					placeholder="John Doe"
					value={tenantDetails.Name}
					onChangeText={(text) => handleInputChange("Name", text)}
					style={styles.input}
				/>

				<Text>Annual Income:</Text>
				<TextInput
					placeholder="50000"
					value={tenantDetails.AnnualIncome.toString()}
					onChangeText={(text) => handleInputChange("AnnualIncome", parseInt(text))}
					style={styles.input}
					keyboardType="numeric"
				/>

				<Text>Phone Number:</Text>
				<TextInput
					placeholder="123-456-7890"
					value={tenantDetails.PhoneNumber}
					onChangeText={(text) => handleInputChange("PhoneNumber", text)}
					style={styles.input}
					keyboardType="phone-pad"
				/>

				<Text>Date of Birth:</Text>
				<TextInput
					placeholder="MM/DD/YYYY"
					value={tenantDetails.DateOfBirth}
					onChangeText={(text) => handleInputChange("DateOfBirth", text)}
					style={styles.input}
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
		color: "white",
	},
});
