import {observer} from "mobx-react-lite";
import Routes from "./Routes";
import { createNativeStackNavigator} from "@react-navigation/native-stack"

function MainStack() {
	const StackNavigator = createNativeStackNavigator<RootStackParamList>()

	return (
		<StackNavigator.Navigator
			screenOptions = {{
				headerShown:false,
				animation: "none"
			}}
		>
			{Routes()}
		</StackNavigator.Navigator>
	);
}

export default observer(MainStack);
