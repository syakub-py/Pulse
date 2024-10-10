import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Ionicons from "react-native-vector-icons/Ionicons";
import Home from "./Home";
import Settings from "./Settings";
import { StyleSheet } from "react-native";
import { observer } from "mobx-react-lite";
import Analytics from "./Analytics";
import Leases from "./Leases";
import YourLease from "./YourLease";
import _ from "lodash";
import Chats from "@src/Screens/Chats";
import {usePropertyContext} from "@src/Contexts/PropertyContext";

function BottomNavigationBar() {
	const Tab = createBottomTabNavigator();
	const propertyContext = usePropertyContext();
	if (_.isNull(propertyContext)) return null;
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
						iconName = focused ? "list" : "list-outline";
					} else if (rn === "Settings") {
						iconName = focused ? "settings" : "settings-outline";
					} else if (rn === "Analytics") {
						iconName = focused ? "stats-chart" : "stats-chart-outline";
					} else if (rn === "Chat") {
						iconName = focused ? "chatbox-ellipses" : "chatbox-ellipses-outline";
					}else if (rn === "Lease") {
						iconName = focused ? "albums" : "albums-outline";
					} else if (rn === "Your Lease") {
						iconName = focused ? "document" : "document-outline";
					}
					if (iconName){
						return <Ionicons name={iconName} size={32} color={color}/>;
					}
				},
			})}>
			<Tab.Screen name={"Home"} component={Home} />
			{
				(!propertyContext.selectedProperty?.isCurrentUserTenant && !_.isNull(propertyContext.selectedProperty) && propertyContext.selectedProperty.isRental) ? (
					<Tab.Screen name={"Lease"} component={Leases} />
				) : (propertyContext.selectedProperty?.isRental) ? (
					<Tab.Screen name={"Your Lease"} component={YourLease} />
				) : null
			}
			<Tab.Screen name={"Chat"} component={Chats} />
			{
				(!propertyContext.selectedProperty?.isCurrentUserTenant && !_.isNull(propertyContext.selectedProperty) && propertyContext.selectedProperty.isRental) ? (
					<Tab.Screen name={"Analytics"} component={Analytics} />
				):null
			}
			<Tab.Screen name={"Settings"} component={Settings} />
		</Tab.Navigator>
	);
}

export default observer(BottomNavigationBar);

const styles = StyleSheet.create({
	tabBarStyle: {
		height: "7%",
		width: "100%",
		backgroundColor: "black",
		alignItems: "center",
		justifyContent: "center",
		elevation: 0,
		borderTopWidth: 0,
	}
});
