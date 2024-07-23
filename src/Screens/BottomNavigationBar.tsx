import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Ionicons from "react-native-vector-icons/Ionicons";
import Home from "./Home";
import Settings from "./Settings";
import PulseAI from "./PulseAI";
import { StyleSheet } from "react-native";
import { observer } from "mobx-react-lite";

function BottomNavigationBar() {
	const Tab = createBottomTabNavigator();
	return (
		<Tab.Navigator
			initialRouteName={"Home"}
			screenOptions={({ route }) => ({
				tabBarHideOnKeyboard: true,
				headerShown: false,
				tabBarActiveTintColor: "white",
				tabBarShowLabel: false,
				tabBarStyle: styles.tabBarStyle,
				tabBarIcon: ({ focused, color }) => {
					let iconName;
					const rn = route.name;
					if (rn === "Home") {
						iconName = focused ? "apps" : "apps-outline";
					} else if (rn === "Settings") {
						iconName = focused ? "settings" : "settings-outline";
					} else if (rn === "Analytics") {
						iconName = focused ? "stats-chart" : "stats-chart-outline";
					} else if (rn === "AI") {
						iconName = focused ? "sparkles" : "sparkles-outline";
					}
					if (iconName){
						return <Ionicons name={iconName} size={32} color={color} />;
					}
				},
			})}
		>
			<Tab.Screen name={"Home"} component={Home} />
			<Tab.Screen name={"AI"} component={PulseAI} />
			<Tab.Screen name={"Analytics"} component={Settings} />
			<Tab.Screen name={"Settings"} component={Settings} />
		</Tab.Navigator>
	);
}

export default observer(BottomNavigationBar);

const styles = StyleSheet.create({
	tabBarStyle: {
		height: "7%",
		display: "flex",
		backgroundColor: "transparent",
		position: "absolute",
		alignItems: "center",
		justifyContent: "center",
		bottom: "3%",
		left: "5%",
		right: "5%",
		elevation: 0,
		borderTopWidth: 0,
		shadowOpacity: 0,
		shadowOffset: {
			height: 0,
			width: 0
		},
		shadowRadius: 0,
	}
});
