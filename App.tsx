import { NavigationContainer } from "@react-navigation/native";
import { AuthContextClass, AuthContext } from "./src/Contexts/AuthContext";
import { AppContextClass, AppContext } from "./src/Contexts/AppContext";
import { useMemo } from "react";
import Setup from "./src/Setup";


export default function App() {
	const appContext = useMemo(() => new AppContextClass(), []);
	const authContext = useMemo(() => new AuthContextClass(), []);
	return (
		<AuthContext.Provider value={authContext}>
			<AppContext.Provider value={appContext}>
				<NavigationContainer>
					<Setup/>
				</NavigationContainer>
			</AppContext.Provider>
		</AuthContext.Provider>

	);
}
