import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Home from "./Home";
import Login from "./Login";
import BottomNavigationBar from "./BottomNavigationBar";
import SignUpStack from "./SignUpStack";

export default function MainStack() {
	const Stack = createNativeStackNavigator();

	return (
		<Stack.Navigator initialRouteName="Login" screenOptions={{ headerShown: false }}>
			<Stack.Screen name = "BottomNavBar" component = {BottomNavigationBar}/>
			<Stack.Screen name="Home" component={Home} />
			<Stack.Screen name="Login" component={Login} />
			<Stack.Screen name="SignUp" component={SignUpStack} />
		</Stack.Navigator>
	);
}
