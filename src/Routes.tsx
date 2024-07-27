import {useContext} from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import {AuthContext} from "./Contexts/AuthContext";
import Login from "./Screens/Login";
import CreateUsernameAndPassword from "./Screens/SignUp/CreateUsernameAndPassword";
import Home from "./Screens/Home";
import PulseAI from "./Screens/PulseAI";
import BottomNavigationBar from "./Screens/BottomNavigationBar";
import AddAProperty from "./Screens/AddAProperty";
import {auth} from "./Utils/Firebase";
import _ from "lodash";
import Analytics from "./Screens/Analytics";
import AllProperties from "./Screens/AllProperties";
import Loading from "./Screens/Loading";
import Leases from "./Screens/Leases";


export default function Routes() {
	const authContext = useContext(AuthContext);
	const { Screen } = createNativeStackNavigator<RootStackParamList>();

	if (authContext.isLoading) {
		return [
			<Screen key="Loading" name="Loading" component={Loading}/>
		];
	}

	if (!authContext.isLoggedIn || _.isNull(auth.currentUser?.uid)) {
		return [
			<Screen key = "Login" name="Login" component={Login} />,
			<Screen key = "CreateUsernameAndPassword" name = "CreateUsernameAndPassword" component = {CreateUsernameAndPassword}/>,
			<Screen key = "BottomNavBar" name="BottomNavBar" component={BottomNavigationBar} />
		];
	}
	return [
		<Screen key = "BottomNavBar" name="BottomNavBar" component={BottomNavigationBar} />,
		<Screen key = "AddAProperty" name="AddAProperty" component={AddAProperty} />,
		<Screen key = "Home" name="Home" component={Home} />,
		<Screen key = "ChatBot" name="ChatBot" component={PulseAI} />,
		<Screen key = "Analytics" name="Analytics" component={Analytics} />,
		<Screen key = "AllProperties" name="AllProperties" component={AllProperties} />,
		<Screen key = "Leases" name="Leases" component={Leases} />,
	];
}
