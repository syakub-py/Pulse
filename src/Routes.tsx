import {useContext} from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import {AuthContext} from "./Contexts/AuthContext";
import Login from "./Screens/Login";
import CreateUsernameAndPassword from "./Screens/SignUp/CreateUsernameAndPassword";
import AddHomes from "./Screens/SignUp/AddHomes";
import AddAndConfigureDevices from "./Screens/SignUp/AddAndConfigureDevices";
import Home from "./Screens/Home";
import PulseAI from "./Screens/PulseAI";
import BottomNavigationBar from "./Screens/BottomNavigationBar";

export default function Routes() {
	const authContext = useContext(AuthContext);
	const { Screen } = createNativeStackNavigator<RootStackParamList>();

	if (!authContext.isLoggedIn) {
		return [
			<Screen key = "Login" name="Login" component={Login} />,
			<Screen key = "CreateUsernameAndPassword" name = "CreateUsernameAndPassword" component = {CreateUsernameAndPassword}/>,
			<Screen key = "AddHomes" name = "AddHomes" component={AddHomes} />,
			<Screen key = "AddAndConfigureDevices" name = "AddAndConfigureDevices" component={AddAndConfigureDevices} />
		];
	}

	return [
		<Screen key = "Home" name="Home" component={Home} />,
		<Screen key = "ChatBot" name="ChatBot" component={PulseAI} />,
		<Screen key = "BottomNavBar" name="BottomNavBar" component={BottomNavigationBar} />
	];
}
