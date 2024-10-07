import Layout from "../Components/GlobalComponents/Layout";
import {StyleSheet, ScrollView, View, Image, Text, Pressable} from "react-native";
import Setting from "../Components/Settings/Setting";
import {useNavigation} from "@react-navigation/native";
import {StackNavigationProp} from "@react-navigation/stack";
import {observer} from "mobx-react-lite";
import Header from "../Components/GlobalComponents/Header";
import { useAuthContext } from "../Contexts/AuthContext";
import { useAppContext } from "../Contexts/AppContext";
import Ionicons from "react-native-vector-icons/Ionicons";
import {useCallback} from "react";
import {useAnalyticContext} from "@src/Contexts/AnalyticContext";
import {useChatContext} from "@src/Contexts/ChatContext";
import {useLeaseContext} from "@src/Contexts/LeaseContext";
import {usePropertyContext} from "@src/Contexts/PropertyContext";
import {useTenantContext} from "@src/Contexts/TenantContext";
import {useTodoContext} from "@src/Contexts/TodoContext";
import _ from "lodash";

function Settings(){
	const authContext = useAuthContext();
	const analyticContext = useAnalyticContext();
	const chatContext = useChatContext();
	const leaseContext = useLeaseContext();
	const propertyContext = usePropertyContext();
	const tenantContext = useTenantContext();
	const todoContext = useTodoContext();

	const navigation = useNavigation<StackNavigationProp<RootStackParamList, "Settings">>();

	const logout = useCallback(async () => {
		try {
			if(_.isNull(analyticContext) || _.isNull(tenantContext) || _.isNull(chatContext) || _.isNull(leaseContext) || _.isNull(propertyContext) || _.isNull(todoContext)) {
				return;
			}
			tenantContext.clearContext();
			chatContext.clearContext();
			analyticContext.clearContext();
			propertyContext.clearContext();
			leaseContext.clearContext();
			todoContext.clearContext();
			await authContext.clearContextAndFirebaseLogout();
		} catch (e) {
			alert("There was an error logging out");
			return;
		}
		navigation.navigate("Login");
	}, [analyticContext, authContext, chatContext, leaseContext, navigation, propertyContext, tenantContext, todoContext]);

	return (
		<Layout>
			<View style={styles.headerContainer}>
				<Header title={"Settings"}/>
				<Pressable onPress={logout}>
					<Ionicons name={"log-out-outline"} color={"white"} size={30} />
				</Pressable>
			</View>
			<ScrollView style={styles.container}>
				<View style={styles.userInfoContainer}>
					<Image style={styles.profileImage} source={{uri:authContext.profilePicture}}/>
					<View style={{flexDirection:"column"}}>
						<Text style={styles.usernameText}>{authContext.username}</Text>
						{/*<Text style={styles.propertiesText}>Properties: {appContext.Properties.length}</Text>*/}
					</View>
				</View>
				<Setting title={"Finished Todos"}/>
				<Setting title={"Your Tenants"} onClick={()=>navigation.navigate("AllTenants")}/>
				<Setting title={"Your Properties"} onClick={()=>navigation.navigate("AllProperties")} />
				<Setting title={"Change username or password"} onClick={()=>console.log("clicked")} />
				{/*<Setting title={"Delete Your account"} onClick={handleDeleteAccount} />*/}
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

