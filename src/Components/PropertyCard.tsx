import {observer} from "mobx-react-lite";
import {Text, View, StyleSheet} from "react-native";


interface Props{
	property:Property;
}

function PropertyCard(props: Props) {
	const { property } = props;
	return (
		<View style={styles.container}>
			<Text style={styles.name}>{property.Name}</Text>
			<Text style={styles.propertyType}>{property.PropertyType}</Text>
			<Text style={styles.address}>{property.Address}</Text>
		</View>
	);
}

export default observer(PropertyCard);

const styles = StyleSheet.create({
	container: {
		backgroundColor: "#333",
		padding: 20,
		borderRadius: 10,
		margin: 10,
	},
	name: {
		fontSize: 24,
		color: "#fff",
		fontWeight: "bold",
	},
	propertyType: {
		fontSize: 18,
		color: "#ccc",
		marginBottom: 10,
	},
	address: {
		fontSize: 18,
		color: "#ccc",
	},
});

