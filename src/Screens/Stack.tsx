import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Home from "./Home";
import Login from "./Login";

export default function Stack () {
	const Stack = createNativeStackNavigator();
	return (
		<Stack.Navigator initialRouteName='Login' screenOptions={{ headerShown: false }}>
			<Stack.Screen name='Home' component={Home} />
			<Stack.Screen name='Login' component={Login} />
		</Stack.Navigator>
	);
}
