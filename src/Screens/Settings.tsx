import Layout from "../Components/Layout";
import {StyleSheet, ScrollView} from "react-native";
import Setting from "../Components/Settings/Setting";
import {useContext} from "react";
import {AuthContext} from "../Contexts/AuthContext";
import {useNavigation} from "@react-navigation/native";
import {StackNavigationProp} from "@react-navigation/stack";
import {observer} from "mobx-react-lite";
import Header from "../Components/Header";


function Settings(){
	const authContext = useContext(AuthContext);
	const navigation = useNavigation<StackNavigationProp<RootStackParamList, "Settings">>();

	const logout = async () =>{
		await authContext.logout();
		navigation.navigate("Login");
	};

	return (
		<Layout>
			<Header title={"Settings"}/>
			<ScrollView style={styles.container}>
				<Setting title={"Your Account"}/>
				<Setting title={"Connected Accounts"}/>
				<Setting title={"Your home(s)"} onClick={()=>navigation.navigate("AllProperties")} />
				<Setting title={"Logout"} onClick={()=> logout()}/>
			</ScrollView>
		</Layout>
	);
}

export default observer(Settings);

const styles = StyleSheet.create({
	container:{
		flexDirection:"column",
		backgroundColor:"transparent",
	}
});

