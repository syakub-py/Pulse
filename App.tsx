import { NavigationContainer } from "@react-navigation/native";
import { AuthContextClass, AuthContext } from "./src/Contexts/AuthContext";
import { AppContextClass, AppContext } from "./src/Contexts/AppContext";
import { useMemo } from "react";
import Setup from "./src/Setup";
import { StatusBar } from "react-native";


export default function App() {
	const appContext = useMemo(() => new AppContextClass(), []);
	const authContext = useMemo(() => new AuthContextClass(), []);
	
	return (
		<>
			<StatusBar
				hidden={false}
				backgroundColor="transparent"
				translucent={true}
				barStyle="dark-content"
			/>
			<AuthContext.Provider value={authContext}>
				<AppContext.Provider value={appContext}>
					<NavigationContainer>
						<Setup/>
					</NavigationContainer>
				</AppContext.Provider>
			</AuthContext.Provider>
		</>
	);
}
