import React, {useContext, useState} from "react";
import { observer } from "mobx-react-lite";
import {View, TextInput, Button, StyleSheet, Text, FlatList} from "react-native";
import Layout from "../Components/Layout";
import {AppContext} from "../Contexts/AppContext";
import Header from "../Components/Header";
import BackButton from "../Components/BackButton";
import _ from "lodash";
import {useNavigation} from "@react-navigation/native";
import {StackNavigationProp} from "@react-navigation/stack";
import LeaseCard from "../Components/Leases/LeaseCard";

function AddALease() {
	const appContext = useContext(AppContext);
	const navigation = useNavigation<StackNavigationProp<RootStackParamList, "AddALease">>();
	const [leaseDetails, setLeaseDetails] = useState<Lease>({
		LeaseId:0,
		StartDate: "",
		EndDate: "",
		MonthlyRent: null,
		PropertyId:!_.isNil(appContext.SelectedProperty)?appContext.SelectedProperty.PropertyId: 0
	});
	const [newLeases, setNewLeases] = useState<Lease[]>([]);

	const handleInputChange = (name:string, value:string | number) => {
		setLeaseDetails({
			...leaseDetails,
			[name]: value,
		});
	};

	const areValidInputs = () => {
		if (!leaseDetails.StartDate) {
			alert("Start date is required");
			return false;
		} else if (!/^\d{4}-\d{2}-\d{2}$/.test(leaseDetails.StartDate)) {
			alert("Invalid date format. Please use YYYY-MM-DD.");
			return false;
		}

		if (!leaseDetails.EndDate) {
			alert("End date is required");
			return false;
		} else if (!/^\d{4}-\d{2}-\d{2}$/.test(leaseDetails.EndDate)) {
			alert("Invalid date format. Please use YYYY-MM-DD.");
			return false;
		}

		if (!leaseDetails.MonthlyRent) {
			alert("Monthly rent is required");
			return false;
		} else if (isNaN(Number(leaseDetails.MonthlyRent))) {
			alert("Monthly rent must be a number");
			return false;
		}
		return true;
	};

	const handleAddLease = async () => {
		try {
			if (_.isNull(appContext.SelectedProperty?.PropertyId)){
				alert("There is no property selected");
				return;
			}

			if (!areValidInputs()) {
				return;
			}

			await appContext.addLease(leaseDetails);
			setNewLeases([...newLeases, leaseDetails]);
			setLeaseDetails({
				LeaseId: 0,
				StartDate: "",
				EndDate: "",
				MonthlyRent: null,
				PropertyId: appContext.SelectedProperty.PropertyId
			});
		} catch (error) {
			console.error(error);
		}
	};

	const handleSubmit = () =>{
		navigation.navigate("AddATenant");
	};

	return (
		<Layout>
			<View style={styles.headerContainer}>
				<BackButton/>
				<Header title={"Add A Lease"} />
			</View>
			<View style={styles.container}>
				<View style={styles.inputContainer}>
					<TextInput
						style={styles.input}
						value={leaseDetails.StartDate.toString()}
						onChangeText={(value) => handleInputChange("StartDate", value)}
						placeholder="Start Date: YYYY-MM-DD"
						placeholderTextColor="white"
					/>
				</View>
				<View style={styles.inputContainer}>
					<Text style={styles.label}>End Date:</Text>
					<TextInput
						style={styles.input}
						value={leaseDetails.EndDate.toString()}
						onChangeText={(value) => handleInputChange("EndDate", value)}
						placeholder="End Date: YYYY-MM-DD"
						placeholderTextColor="white"
					/>
				</View>
				<View style={styles.inputContainer}>
					<Text style={styles.label}>Monthly Rent:</Text>
					<TextInput
						style={styles.input}
						value={leaseDetails.MonthlyRent?.toString() ?? ""}
						onChangeText={(value) => handleInputChange("MonthlyRent", value)}
						keyboardType="numeric"
						placeholder="Monthly Rent"
						placeholderTextColor="white"
					/>
				</View>
				<Button title="Add Lease" onPress={handleAddLease} />
				<FlatList
					data={newLeases}
					renderItem={({item, index})=>(
						<LeaseCard lease={item} key={index} />
					)}/>

				<Button title="Done" onPress={handleSubmit} />
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
	},

});
