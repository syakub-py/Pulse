import AppContextProvider from "./Contexts/AppContext";
import AuthContextProvider from "./Contexts/AuthContext";
import PulseApiClientProvider from "./Contexts/PulseApiClientContext";

export default function ContextLevelComponent ({ children } : { children: React.ReactNode }) {
	return (
		<AuthContextProvider>
			<AppContextProvider>
				<PulseApiClientProvider>
					{children}
				</PulseApiClientProvider>
			</AppContextProvider>
		</AuthContextProvider>
	);
}
