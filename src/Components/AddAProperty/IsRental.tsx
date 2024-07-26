import {observer} from "mobx-react-lite";
import {TextInput, View, StyleSheet} from "react-native";
import _, {toNumber} from "lodash";

interface Props{
	property:Property;
	handleInputChange:(field: keyof Property, value: string | string[] | boolean | number) => void;
}


function IsRental(props:Props){
	const {property, handleInputChange} = props;
	if (!property.Rent) {
		property.Rent = 0;
	}
	if (!property.numOfTenants) {
		property.numOfTenants = 0;
	}

	return(
		<View>
			<TextInput
				value={(property.Rent ?? 0).toString()}
				onChangeText={(value) => handleInputChange("Rent", toNumber(value))}
				style={styles.input}
			/>

			<TextInput
				value={(property.numOfTenants ?? 0).toString()}
				onChangeText={(value) => handleInputChange("numOfTenants", toNumber(value))}
				style={styles.input}
			/>

		</View>
	);
}

export default observer(IsRental);

const styles = StyleSheet.create({
	input: {
		height: 40,
		backgroundColor: "#333",
		marginBottom: 10,
		paddingHorizontal: 10,
		borderRadius: 5,
		opacity: 0.7,
		color: "white",
	},

});
