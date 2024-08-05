import { StatusBar } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import Setup from "./src/Setup";
import AppContextProvider from "./src/Contexts/AppContext";
import AuthContextProvider from "./src/Contexts/AuthContext";

export default function App() {
	return (
		<>
			<StatusBar
				hidden={false}
				backgroundColor="transparent"
				translucent={true}
				barStyle="dark-content"
			/>
			<AuthContextProvider>
				<AppContextProvider>
					<NavigationContainer>
						<Setup/>
					</NavigationContainer>
				</AppContextProvider>
			</AuthContextProvider>
		</>
	);
}
