import Layout from "../Components/Layout";
import {StyleSheet, ScrollView, View, Image, Text, Pressable} from "react-native";
import Setting from "../Components/Settings/Setting";
import {useNavigation} from "@react-navigation/native";
import {StackNavigationProp} from "@react-navigation/stack";
import {observer} from "mobx-react-lite";
import Header from "../Components/Header";
import { useAuthContext } from "../Contexts/AuthContext";
import { useAppContext } from "../Contexts/AppContext";
import Ionicons from "react-native-vector-icons/Ionicons";

function Settings(){
	const authContext = useAuthContext();
	const appContext = useAppContext();
	const navigation = useNavigation<StackNavigationProp<RootStackParamList, "Settings">>();

	const logout = async () =>{
		try{
			await authContext.logout();
			appContext.logout();
		}catch(e){
			alert("there was an error logging out");
			return;
		}
		navigation.navigate("Login");
	};

	return (
		<Layout>
			<View style={styles.headerContainer}>
				<Header title={"Settings"}/>
				<Pressable onPress={()=>logout()}>
					<Ionicons name={"log-out-outline"} color={"white"} size={30} />
				</Pressable>
			</View>
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
				<Setting title={"Change username or password"} onClick={()=>console.log("clicked")} />

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
	},
	headerContainer:{
		flexDirection:"row",
		alignItems:"center",
		justifyContent:"space-between"
	}
});

