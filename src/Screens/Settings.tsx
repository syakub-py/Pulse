import Layout from "../Components/Layout";
import {StyleSheet, ScrollView, View, Image, Text} from "react-native";
import Setting from "../Components/Settings/Setting";
import {useContext} from "react";
import {AuthContext} from "../Contexts/AuthContext";
import {useNavigation} from "@react-navigation/native";
import {StackNavigationProp} from "@react-navigation/stack";
import {observer} from "mobx-react-lite";
import Header from "../Components/Header";
import {AppContext} from "../Contexts/AppContext";


function Settings(){
	const authContext = useContext(AuthContext);
	const appContext = useContext(AppContext);
	const navigation = useNavigation<StackNavigationProp<RootStackParamList, "Settings">>();

	const logout = async () =>{
		await authContext.logout();
		navigation.navigate("Login");
	};

	return (
		<Layout>
			<Header title={"Settings"}/>
			<ScrollView style={styles.container}>
				<View style={styles.userInfoContainer}>
					<Image style={styles.profileImage} source={{uri:authContext.profilePicture}}/>
					<View style={{flexDirection:"column"}}>
						<Text style={styles.usernameText}>{authContext.username}</Text>
						<Text style={styles.propertiesText}>Properties: {appContext.Properties.length}</Text>
					</View>
				</View>
				<Setting title={"Finished Todos"}/>
				<Setting title={"Your Tenants"} onClick={()=>navigation.navigate("AllTenants")}/>
				<Setting title={"Your Properties"} onClick={()=>navigation.navigate("AllProperties")} />
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
	},
	userInfoContainer:{
		flexDirection:"row",
		alignItems:"center",
		width:"100%"
	},
	profileImage:{
		height:150,
		width:150,
		resizeMode:"cover",
		borderRadius:100,
		marginHorizontal:20
	},
	usernameText:{
		color:"white",
		fontSize:20,
		fontWeight:"bold",
	},
	propertiesText:{
		color:"white",
		fontSize:15,
		fontWeight:"600",
	}
});

