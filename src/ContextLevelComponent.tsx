import AppContextProvider from "./Contexts/AppContext";
import AuthContextProvider from "./Contexts/AuthContext";
import PulseApiClientProvider, { useApiClientContext } from "./Contexts/PulseApiClientContext";
import PropertyContextProvider from "@src/Contexts/PropertyContext";
import UserContextProvider from "@src/Contexts/UserContext";
import LeaseContextProvider from "@src/Contexts/LeaseContext";
import TodoContextProvider from "@src/Contexts/TodoContext";
import AnalyticContextProvider from "@src/Contexts/AnalyticContext";
import ChatContextProvider from "@src/Contexts/ChatContext";

export default function ContextLevelComponent ({ children } : { children: React.ReactNode }) {
	const pulseApiClient = useApiClientContext();

	return (
		<AuthContextProvider>
			<PulseApiClientProvider>
				<PropertyContextProvider pulseApiClient = {pulseApiClient}>
					<UserContextProvider>
						<LeaseContextProvider>
							<TodoContextProvider>
								<AnalyticContextProvider>
									<ChatContextProvider>
										<AppContextProvider>
											{children}
										</AppContextProvider>
									</ChatContextProvider>
								</AnalyticContextProvider>
							</TodoContextProvider>
						</LeaseContextProvider>
					</UserContextProvider>
				</PropertyContextProvider>
			</PulseApiClientProvider>
		</AuthContextProvider>
	);
}
