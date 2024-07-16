import { NavigationContainer } from "@react-navigation/native";
import MainStack from "./src/Screens/MainStack";
import { AuthContextClass, AuthContext } from "./src/Contexts/AuthContext";
import { AppContextClass, AppContext } from "./src/Contexts/AppContext";
import { useMemo } from "react";


export default function App() {
	const appContext = useMemo(() => new AppContextClass(), []);
	const authContext = useMemo(() => new AuthContextClass(), []);
	return (
		<AuthContext.Provider value={authContext}>
			<AppContext.Provider value={appContext}>
				<NavigationContainer>
					<MainStack />
				</NavigationContainer>
			</AppContext.Provider>
		</AuthContext.Provider>

	);
}
