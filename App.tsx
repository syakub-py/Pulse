import { StatusBar } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import Setup from "./src/Setup";
import ContextLevelComponent from "./src/ContextLevelComponent";

export default function App() {
	return (
		<>
			<StatusBar
				hidden={false}
				backgroundColor="transparent"
				translucent={true}
				barStyle="dark-content"
			/>
			<ContextLevelComponent>
				<NavigationContainer>
					<Setup/>
				</NavigationContainer>
			</ContextLevelComponent>
		</>
	);
}
