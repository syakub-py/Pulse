import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Home from "./Home";
import Login from "./Login";
import BottomNavigationBar from "./BottomNavigationBar";

export default function Stack() {
	const Stack = createNativeStackNavigator();
	return (
		<Stack.Navigator initialRouteName="Login" screenOptions={{ headerShown: false }}>
			<Stack.Screen name = "BottomNavBar" component = {BottomNavigationBar}/>
			<Stack.Screen name="Home" component={Home} />
			<Stack.Screen name="Login" component={Login} />
		</Stack.Navigator>
	);
}
