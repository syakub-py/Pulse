import {useCallback, useState} from "react";
import { observer } from "mobx-react-lite";
import {View, TextInput, Button, StyleSheet, Text, FlatList} from "react-native";
import Layout from "../Components/Layout";
import Header from "../Components/Header";
import BackButton from "../Components/BackButton";
import _ from "lodash";
import {useNavigation} from "@react-navigation/native";
import {StackNavigationProp} from "@react-navigation/stack";
import LeaseCard from "../Components/Leases/LeaseCard";
import ValidateLeaseInputs from "@src/Utils/ValidateInputs/ValidateLeaseInputs";
import ValidateDateInput from "@src/Utils/ValidateInputs/ValidateDateInput";
import {useLeaseContext} from "@src/Contexts/LeaseContext";
import {usePropertyContext} from "@src/Contexts/PropertyContext";

function AddALease() {
	const leaseContext = useLeaseContext();
	const propertyContext = usePropertyContext();

	const navigation = useNavigation<StackNavigationProp<RootStackParamList, "AddALease">>();
	const [leaseDetails, setLeaseDetails] = useState<Lease>({
		StartDate: "",
		EndDate: "",
		MonthlyRent: null,
		isLeaseExpired: false,
		TenantName: "",
		Terms: "",
	});
	const [newLeases, setNewLeases] = useState<Lease[]>([]);
	const [tenantEmail, setTenantEmail] = useState("");


	const handleInputChange = useCallback((name:string, value:string | number) => {
		setLeaseDetails({
			...leaseDetails,
			[name]: value,
		});
	}, [leaseDetails]);

	const handleAddLease = useCallback(async () => {
	    try {
			if (_.isNull(propertyContext) || _.isNull(leaseContext)) return;
	        if (_.isNil(propertyContext.SelectedProperty?.PropertyId)) {
	            alert("There is no property selected");
	            return;
	        }

	        if (!ValidateLeaseInputs(leaseDetails)) return;
			if (!ValidateDateInput(leaseDetails.EndDate) || !ValidateDateInput(leaseDetails.StartDate)) {
				alert("Dates have to be within a 10 year range of today");
				return;
			}
	        leaseDetails.TenantName = "Wait for tenant information...";

	        const isAddLeaseSuccessful = await leaseContext.addLease(leaseDetails, tenantEmail.toLowerCase(), propertyContext.SelectedProperty);
	        if (!isAddLeaseSuccessful) return;

	        setNewLeases([...newLeases, leaseDetails]);
	        setLeaseDetails({
	            isLeaseExpired: false,
	            TenantName: "",
	            Terms: "",
	            StartDate: "",
	            EndDate: "",
	            MonthlyRent: null,
	        });
	        setTenantEmail("");
	    } catch (error) {
	        console.error("error adding a lease" + error);
	    }
	}, [leaseContext, leaseDetails, tenantEmail, newLeases, setLeaseDetails]);

	const handleSubmit = () =>{
		navigation.navigate("BottomNavBar");
	};

	return (
		<Layout>
			<View style={styles.headerContainer}>
				<BackButton/>
				<Header title={"Add Lease"} />
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

				<View style={styles.inputContainer}>
					<Text style={styles.label}>Monthly Rent:</Text>
					<TextInput
						style={styles.input}
						value={leaseDetails.Terms}
						onChangeText={(value) => handleInputChange("Terms", value)}
						placeholder="Enter The terms of the lease"
						multiline={true}
						placeholderTextColor="white"
					/>
				</View>

				<View style={styles.inputContainer}>
					<Text style={styles.label}>Tenant Email:</Text>
					<TextInput
						style={styles.input}
						value={tenantEmail}
						onChangeText={(value) => setTenantEmail(value)}
						placeholder="Enter tenant's email"
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
