import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Login from "./Screens/Login";
import CreateUsernameAndPassword from "./Screens/SignUp/CreateUsernameAndPassword";
import Home from "./Screens/Home";
import PulseAI from "./Screens/ChatBox";
import BottomNavigationBar from "./Screens/BottomNavigationBar";
import AddAProperty from "./Screens/AddAProperty";
import {auth} from "./Utils/FirebaseConfig";
import _ from "lodash";
import Analytics from "./Screens/Analytics";
import AllProperties from "./Screens/AllProperties";
import Loading from "./Screens/Loading";
import Leases from "./Screens/Leases";
import AddALease from "./Screens/AddALease";
import AddATenant from "./Screens/SignUp/AddAUser";
import AllTenants from "./Screens/AllTenants";
import { useAuthContext } from "./Contexts/AuthContext";
import TenantCode from "./Screens/SignUp/TenantCode";
import AddATodo from "./Screens/AddATodo";
import TodoDetails from "./Screens/TodoDetails";
import AddATransaction from "@src/Screens/AddATransaction";
import Chats from "@src/Screens/Chats";


export default function Routes() {
	const authContext = useAuthContext();
	const { Screen } = createNativeStackNavigator<RootStackParamList>();

	if (authContext.isAuthInLoadingState) {
		return [
			<Screen key="Loading" name="Loading" component={Loading}/>
		];
	}

	if (!authContext.isLoggedIn || _.isNull(auth.currentUser?.uid)) {
		return [
			<Screen key = "Login" name="Login" component={Login} />,
			<Screen key = "CreateUsernameAndPassword" name = "CreateUsernameAndPassword" component = {CreateUsernameAndPassword}/>,
			<Screen key = "BottomNavBar" name="BottomNavBar" component={BottomNavigationBar} />,
		];
	}

	return [
		<Screen key = "BottomNavBar" name="BottomNavBar" component={BottomNavigationBar} />,
		<Screen key = "AddAProperty" name="AddAProperty" component={AddAProperty} />,
		<Screen key = "Home" name="Home" component={Home} />,
		<Screen key = "ChatBox" name="ChatBox" component={PulseAI} />,
		<Screen key = "Analytics" name="Analytics" component={Analytics} />,
		<Screen key = "AllProperties" name="AllProperties" component={AllProperties} />,
		<Screen key = "Leases" name="Leases" component={Leases} />,
		<Screen key = "AddALease" name="AddALease" component={AddALease} />,
		<Screen key = "AllTenants" name="AllTenants" component={AllTenants} />,
		<Screen key = "AddATodo" name="AddATodo" component={AddATodo} />,
		<Screen key = "TodoDetails" name="TodoDetails" component={TodoDetails} />,
		<Screen key = "EnterTenantCode" name = "EnterTenantCode" component = {TenantCode}/>,
		<Screen key = "AddAUser" name="AddAUser" component={AddATenant} />,
		<Screen key = "AddATransaction" name="AddATransaction" component={AddATransaction} />,
		<Screen key = "Chats" name="Chats" component={Chats} />,
	];
}
