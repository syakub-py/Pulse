import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Home from "./Home";
import Login from "./Login";
import BottomNavigationBar from "./BottomNavigationBar";
import SignUpStack from "./SignUpStack";
import PulseAI from "./PulseAI";
import {useContext,useMemo} from "react";
import {AuthContext} from "../Contexts/AuthContext";
import {observer} from "mobx-react-lite";

function MainStack() {
	const Stack = createNativeStackNavigator();
	const authContext = useContext(AuthContext);
	const initRouteName = useMemo(()=>{
		if (authContext.isLoggedIn){
			return <Stack.Screen name = "BottomNavBar" component = {BottomNavigationBar}/>;
		}
		return <Stack.Screen name="Login" component={Login} />;
	},[authContext.isLoggedIn]);

	return (
		<Stack.Navigator screenOptions={{ headerShown: false }}>
			{initRouteName}
			<Stack.Screen name="Home" component={Home} />
			<Stack.Screen name="ChatBot" component={PulseAI}/>
			<Stack.Screen name="SignUp" component={SignUpStack} />
		</Stack.Navigator>
	);
}

export default observer(MainStack);
