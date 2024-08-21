import Layout from "../Components/Layout";
import {ActivityIndicator, Button, StyleSheet, TextInput, View} from "react-native";
import {observer} from "mobx-react-lite";
import Header from "../Components/Header";
import React, {useEffect, useState} from "react";
import {useAuthContext} from "../Contexts/AuthContext";
import DropdownPicker, {ItemType} from "react-native-dropdown-picker";
import BackButton from "../Components/BackButton";
import { useAppContext } from "../Contexts/AppContext";
import {useNavigation} from "@react-navigation/native";
import {StackNavigationProp} from "@react-navigation/stack";


function AddATodo(){
	const authContext = useAuthContext();
	const appContext = useAppContext();
	const navigation = useNavigation<StackNavigationProp<RootStackParamList, "AddATodo">>();
	const [open, setOpen] = useState(false);
	const priorities: ItemType<string>[] = [
		{ label: "Low", value: "Low" },
		{ label: "Medium", value: "Medium" },
		{ label: "High", value: "High" },
		{ label: "Emergency", value: "Emergency" },
	];
	const [selectedPriority, setSelectedPriority] = useState(priorities[0].value as string);
	const [isLoading, setIsLoading] = useState(false);
	const [todoDetails, setTodoDetails] = useState<Todo>({
		PropertyId:appContext.SelectedProperty?.PropertyId,
		Title:"",
		Description:"",
		Priority:selectedPriority,
		Status:"Not Seen",
		AddedBy: authContext.username,
	});
	useEffect(() => {
		setTodoDetails((prev) => ({ ...prev, Priority: selectedPriority }));
	}, [selectedPriority]);

	const handleInputChange = (field: keyof Todo, value: string | string[] | boolean | number) => {
		setTodoDetails((prev) => ({ ...prev, [field]: value }));
	};
	const handleSubmit = async (): Promise<void> => {
		setIsLoading(true);
		const isAddTodoSuccessful = await appContext.addTodo(todoDetails);

		if (!isAddTodoSuccessful) return;
		setIsLoading(false);
		navigation.navigate("BottomNavBar");
		setTodoDetails({
			PropertyId:appContext.SelectedProperty?.PropertyId,
			Title:"",
			Description:"",
			Priority:selectedPriority,
			Status:"Not Seen",
			AddedBy: authContext.username,
		});

	};

	return(
		<Layout>
			<View style={styles.header}>
				<BackButton/>
				<Header title={"Add a Todo"}/>
			</View>
			<TextInput
				style={styles.input}
				placeholder="Title"
				placeholderTextColor="white"
				value={todoDetails.Title}
				onChangeText={(value) => handleInputChange("Title", value)}
			/>
			<TextInput
				style={[styles.input, styles.multilineInput]}
				placeholder="Descripton"
				placeholderTextColor="white"
				value={todoDetails.Description}
				multiline={true}
				onChangeText={(value) => handleInputChange("Description", value)}
			/>
			<DropdownPicker
				open={open}
				value={selectedPriority}
				items={priorities}
				setOpen={setOpen}
				setValue={setSelectedPriority}
				placeholder="Set a Priorty"
				{...styles}
			/>
			{
				(isLoading)?(
					<ActivityIndicator size="small" color="white"/>
				):(
					<Button title="Add Todo" onPress={handleSubmit} />
				)
			}

		</Layout>
	);
}


export default observer(AddATodo);

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
