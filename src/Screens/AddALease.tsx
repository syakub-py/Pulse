import React, {useContext, useState} from "react";
import { observer } from "mobx-react-lite";
import { View, TextInput, Button, StyleSheet, Text } from "react-native";
import Layout from "../Components/Layout";
import {AppContext} from "../Contexts/AppContext";
import Header from "../Components/Header";
import BackButton from "../Components/BackButton";
import _ from "lodash";

function AddALease() {
	const appContext = useContext(AppContext);

	const [leaseDetails, setLeaseDetails] = useState<Lease>({
		StartDate: "",
		EndDate: "",
		MonthlyRent: null,
		PropertyId:appContext.SelectedProperty?.PropertyId
	});


	const handleInputChange = (name:string, value:string | number) => {
		setLeaseDetails({
			...leaseDetails,
			[name]: value,
		});
	};

	const handleSubmit = async () => {
		try {
			const LeaseId = await appContext.addLease(leaseDetails);
			if (!_.isUndefined(LeaseId)){
				handleInputChange("LeaseId", LeaseId);
			}
		} catch (error) {
			console.error(error);
		}
	};

	return (
		<Layout>
			<View style={styles.headerContainer}>
				<BackButton/>
				<Header title={"Add A Lease"} />
			</View>
			<View style={styles.container}>
				<View style={styles.inputContainer}>
					<Text style={styles.label}>Start Date:</Text>
					<TextInput
						style={styles.input}
						value={leaseDetails.StartDate.toString()}
						onChangeText={(value) => handleInputChange("StartDate", value)}
						placeholder="YYYY-MM-DD"
					/>
				</View>
				<View style={styles.inputContainer}>
					<Text style={styles.label}>End Date:</Text>
					<TextInput
						style={styles.input}
						value={leaseDetails.EndDate.toString()}
						onChangeText={(value) => handleInputChange("EndDate", value)}
						placeholder="YYYY-MM-DD"
					/>
				</View>
				<View style={styles.inputContainer}>
					<Text style={styles.label}>Monthly Rent:</Text>
					<TextInput
						style={styles.input}
						value={leaseDetails.MonthlyRent?.toString() ?? ""}
						onChangeText={(value) => handleInputChange("MonthlyRent", value)}
						keyboardType="numeric"
						placeholder="Enter Monthly Rent"
					/>
				</View>
				<Button title="Add Lease" onPress={handleSubmit} />
			</View>
		</Layout>
	);
}

export default observer(AddALease);

const styles = StyleSheet.create({
	container: {
		padding: 20,
	},
	inputContainer: {
		marginBottom: 15,
	},
	label: {
		marginBottom: 5,
		fontSize: 16,
	},
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
	}
});
