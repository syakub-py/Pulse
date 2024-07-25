import {observer} from "mobx-react-lite";
import Layout from "../Components/Layout";
import {ScrollView, TextInput, StyleSheet, Button} from "react-native";
import {useContext, useState} from "react";
import {AppContext} from "../Contexts/AppContext";
import Header from "../Components/Header";


function AddProperties(){
	const [property, setProperty] = useState<Property>({
		PropertyId: 0,
		Name: "",
		Address: "",
		PropertyType: "",
		isRental:false,
	});
	const appContext = useContext(AppContext);

	const handleInputChange = (field: keyof Property, value: string | string[] | boolean) => {
		setProperty(prev => ({ ...prev, [field]: value }));
	};

	const handleSubmit = async (): Promise<void> => {
		await appContext.addProperty(property);
	};

	return (
		<Layout>
			<Header title={"Add Properties"}/>
			<ScrollView style={styles.container}>
				<TextInput
					style={styles.input}
					placeholder="Name"
					value={property.Name}
					onChangeText={(value) => handleInputChange("Name", value)}
				/>
				<TextInput
					style={styles.input}
					placeholder="Address"
					value={property.Address}
					onChangeText={(value) => handleInputChange("Address", value)}
				/>
				<TextInput
					style={styles.input}
					placeholder="Property Type"
					value={property.PropertyType}
					onChangeText={(value) => handleInputChange("PropertyType", value)}
				/>
				<Button title={"Is Rental?"} onPress={()=>handleInputChange("isRental", !property.isRental)}/>
				<Button title='Add This Property' onPress={handleSubmit} />
			</ScrollView>
		</Layout>
	);
}

const styles = StyleSheet.create({
	container: {
		padding: 20,
	},
	input: {
		height: 40,
		backgroundColor:"lightgray",
		marginBottom: 10,
		paddingHorizontal: 10,
		borderRadius: 5,
		opacity:0.7,
	},
	multilineInput: {
		height: 100,
		textAlignVertical: "top",
	},
});

export default observer(AddProperties);
