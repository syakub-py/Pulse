import {observer} from "mobx-react-lite";
import Layout from "@src/Components/Layout";
import Header from "@src/Components/Header";
import BackButton from "@src/Components/BackButton";
import {useAppContext} from "@src/Contexts/AppContext";
import React, {useCallback, useState} from "react";
import {useAuthContext} from "@src/Contexts/AuthContext";
import {View, StyleSheet, TextInput, ActivityIndicator, Button, Dimensions} from "react-native";
import DropdownPicker, {ItemType} from "react-native-dropdown-picker";
import {useNavigation} from "@react-navigation/native";
import {StackNavigationProp} from "@react-navigation/stack";
import ValidateDateInput from "@src/Utils/ValidateInputs/ValidateDateInput";

function AddATransaction() {
	const appContext = useAppContext();
	const authContext = useAuthContext();
	const navigation = useNavigation<StackNavigationProp<RootStackParamList, "AddATransaction">>();
	const [transactionDetails, setTransactionDetails] = useState<PropertyTransaction>({
		amount: 0,
		description: "",
		incomeOrExpense: "",
		transactionType: "",
		date:""
	});

	const transactionTypes: ItemType<string>[] = [
		{ label: "Insurance", value: "insurance" },
		{ label: "Maintenance", value: "maintenance" },
		{ label: "Repairs", value: "repairs" },
		{ label: "Utilities", value: "utilities" },
		{ label: "HOA Fees", value: "hoa_fees" },
		{ label: "Management Fees", value: "management_fees" },
		{ label: "Legal Fees", value: "legal_fees" },
		{ label: "Landscaping", value: "landscaping" },
		{ label: "Pest Control", value: "pest_control" },
		{ label: "Cleaning", value: "cleaning" },
		{ label: "Security", value: "security" },
		{ label: "Advertising", value: "advertising" },
		{ label: "Supplies", value: "supplies" },
		{ label: "Capital Improvements", value: "capital_improvements" },
	];

	const [transactionType, setTransactionType] = useState(transactionTypes[0].value as string);
	const [incomeOrExpense, setIncomeOrExpense] = useState("income");
	const [isLoading, setIsLoading] = useState(false);
	const [openIncomeExpense, setOpenIncomeExpense] = useState(false);
	const [openTransactionType, setOpenTransactionType] = useState(false);

	const handleSubmit = useCallback(async () => {
		setIsLoading(true);
		try {
			if (!ValidateDateInput(transactionDetails.date)) {
				alert("Invalid Date");
				return;
			}
			transactionDetails.propertyId = appContext.SelectedProperty?.PropertyId;
			transactionDetails.userId = authContext.uid;
			transactionDetails.incomeOrExpense = incomeOrExpense;
			transactionDetails.transactionType = transactionType;
			await appContext.addTransaction(transactionDetails);
			navigation.goBack();
		} catch (error) {
			console.error("Failed to add transaction:", error);
		} finally {
			setIsLoading(false);
		}
	}, [transactionDetails, appContext, authContext.uid, incomeOrExpense, transactionType, navigation]);

	const handleInputChange = (field: keyof PropertyTransaction, value: string | number) => {
		setTransactionDetails((prev) => ({ ...prev, [field]: value }));
	};

	return (
		<Layout>
			<View style={styles.header}>
				<BackButton />
				<Header title={"Add Transaction"} />
			</View>
			<TextInput
				style={styles.input}
				placeholder="Date (YYYY-MM-DD)"
				placeholderTextColor="white"
				value={transactionDetails.date}
				multiline={true}
				onChangeText={(value) => handleInputChange("date", value)}
			/>
			<TextInput
				style={[styles.input, styles.multilineInput]}
				placeholder="Description"
				placeholderTextColor="white"
				value={transactionDetails.description}
				multiline={true}
				onChangeText={(value) => handleInputChange("description", value)}
			/>
			<TextInput
				style={styles.input}
				placeholder="Amount"
				placeholderTextColor="white"
				value={transactionDetails.amount.toString()}
				onChangeText={(value) => handleInputChange("amount", parseFloat(value) || 0)}
				keyboardType="numeric"
			/>
			<DropdownPicker
				open={openIncomeExpense}
				value={incomeOrExpense}
				items={[
					{ label: "Income", value: "income" },
					{ label: "Expense", value: "expense" },
				]}
				setOpen={setOpenIncomeExpense}
				setValue={setIncomeOrExpense}
				style={styles.dropdownStyle}
				textStyle={styles.textStyle}
				placeholder="Income or Expense"
				listItemContainerStyle={styles.listItemContainerStyle}
				dropDownContainerStyle={styles.dropdownStyle}
			/>
			<DropdownPicker
				open={openTransactionType}
				value={transactionType}
				items={transactionTypes}
				setOpen={setOpenTransactionType}
				setValue={setTransactionType}
				style={styles.dropdownStyle}
				textStyle={styles.textStyle}
				placeholder="Transaction Type"
				listItemContainerStyle={styles.listItemContainerStyle}
				dropDownContainerStyle={styles.dropdownStyle}
			/>
			{isLoading ? (
				<ActivityIndicator size="small" color="white" />
			) : (
				<Button title="Add Transaction" onPress={handleSubmit} />
			)}
		</Layout>
	);
}

export default observer(AddATransaction);

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
		marginBottom: 10,
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
