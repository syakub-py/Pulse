import { createNativeStackNavigator } from "@react-navigation/native-stack";
import CreateUsernameAndPassword from "./SignUp/CreateUsernameAndPassword";
import AddHomes from "./SignUp/AddHomes";
import AddAndConfigureDevices from "./SignUp/AddAndConfigureDevices";
import MainStack from "./MainStack";
export default function SignUpStack() {
	const Stack = createNativeStackNavigator();
	return (
		<Stack.Navigator screenOptions={{ headerShown: false }}>
			<Stack.Screen name = "CreateUsernameAndPassword" component = {CreateUsernameAndPassword}/>
			<Stack.Screen name = "AddHomes" component={AddHomes} />
			<Stack.Screen name = "AddAndConfigureDevices" component={AddAndConfigureDevices} />
			<Stack.Screen name = "MainStack" component={MainStack} />
		</Stack.Navigator>
	);
}
