import Layout from "../Components/Layout";
import {View, StyleSheet} from "react-native";
import Setting from "../Components/Setting";
import {useContext} from "react";
import {AuthContext} from "../Contexts/AuthContext";


export default function Settings(){
	const authContext = useContext(AuthContext);
	return (
		<Layout>
			<View style={styles.container}>
				<Setting title={"Your Account"}/>
				<Setting title={"Connected Accounts"}/>
				<Setting title={"Your home(s)"}/>
				<Setting title={"Logout"} onClick={()=> authContext.logout()}/>
			</View>
		</Layout>
	);
}

const styles = StyleSheet.create({
	container:{
		flexDirection:"column",
	}
});

