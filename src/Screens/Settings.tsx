import Layout from "../Components/Layout";
import {View, StyleSheet} from "react-native";
import Setting from "../Components/Setting";


export default function Settings(){

	return (
		<Layout>
			<View style={styles.container}>
				<Setting title={"Your Account"}/>
				<Setting title={"Connected Accounts"}/>
				<Setting title={"Your home(s)"}/>
			</View>
		</Layout>
	);
}

const styles = StyleSheet.create({
	container:{
		flexDirection:"column",
	}
});

