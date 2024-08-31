import { createContext, useContext, useMemo } from "react";
import PulseHttpClient from "../Classes/PulseHTTPClient";
import AnalyticsService from "../Services/AnalyticsService";
import ChatService from "../Services/ChatService";
import LeaseService from "../Services/LeaseService";
import PulseAiChatService from "../Services/PulseAiChatService";
import TenantService from "../Services/TenantService";
import TodoService from "../Services/TodoService";
import TransactionService from "../Services/TransactionService";
import UserService from "../Services/UserService";
import PropertyService from "../Services/PropertyService";

class PulseApiClient {
	public httpClient: PulseHttpClient = new PulseHttpClient();
	public analyticsDataService: AnalyticsService = new AnalyticsService(this.httpClient);
	public chatService: ChatService = new ChatService(this.httpClient);
	public leaseService: LeaseService = new LeaseService(this.httpClient);
	public propertyService: PropertyService = new PropertyService(this.httpClient);
	public pulseAiChatService: PulseAiChatService = new PulseAiChatService(this.httpClient);
	public tenantService: TenantService = new TenantService(this.httpClient);
	public todoService: TodoService = new TodoService(this.httpClient);
	public transactionService: TransactionService = new TransactionService(this.httpClient);
	public userService: UserService = new UserService(this.httpClient);

	constructor() {
	}

	private initializeServices() {
		this.httpClient = new PulseHttpClient();
		this.analyticsDataService = new AnalyticsService(this.httpClient);
		this.chatService = new ChatService(this.httpClient);
		this.leaseService = new LeaseService(this.httpClient);
		this.propertyService = new PropertyService(this.httpClient);
		this.pulseAiChatService = new PulseAiChatService(this.httpClient);
		this.tenantService = new TenantService(this.httpClient);
		this.todoService = new TodoService(this.httpClient);
		this.transactionService = new TransactionService(this.httpClient);
		this.userService = new UserService(this.httpClient);
	}

	public logout() {
		this.initializeServices();
	}
}

const PulseApiClientContext = createContext(new PulseApiClient());

export default function PulseApiClientProvider ({ children }: { children: React.ReactNode }) {
	const apiClientClass = useMemo(() => new PulseApiClient(), []);

	return (
		<PulseApiClientContext.Provider value={apiClientClass}>
			{children}
		</PulseApiClientContext.Provider>
	);
}

export const useApiClientContext = () => useContext(PulseApiClientContext);
