import {createContext, useContext, useMemo} from "react";
import {PulseApiClient, useApiClientContext} from "@src/Contexts/PulseApiClientContext";
import {action, makeAutoObservable, runInAction} from "mobx";
import isHTTPError from "@src/Utils/HttpError";


class AnalyticContextClass {
	public ExpenseAnalyticData:ExpenseAnalytic[] = [];
	public IncomeAnalyticData:IncomeAnalytic | null = null;
	public Transactions: PropertyTransaction[] = [];

	constructor(private readonly pulseApiClient: PulseApiClient) {
		makeAutoObservable(this);
	}

	public setExpenseAnalyticData = action((expenseAnalytics: ExpenseAnalytic[]) => {
		runInAction(()=>{
			this.ExpenseAnalyticData = expenseAnalytics;
		});
	});

	public setIncomeAnalyticData = action((incomeAnalytics: IncomeAnalytic) => {
		runInAction(() => {
			this.IncomeAnalyticData = incomeAnalytics;
		});
	});

	public setTransactions = action((transactions: PropertyTransaction[]) => {
		runInAction(() => {
			this.Transactions = transactions;
		});
	});

	public addTransaction = action(async (transaction: PropertyTransaction) => {
		try{
			const addTransactionResponse = await this.pulseApiClient.transactionService.addTransaction(transaction);
			if (isHTTPError(addTransactionResponse)){
				alert(addTransactionResponse.message);
				return;
			}
			transaction.id = addTransactionResponse;
			runInAction(() => {
				this.Transactions.push(transaction);
			});
			return;
		}catch (e){
			console.error("Error adding transaction:", e);
			return;
		}

	});
}

const AnalyticContext = createContext<null | AnalyticContextClass>(null);

export default function AnalyticContextProvider({ children }: { children: React.ReactNode }) {
	const pulseApiClient = useApiClientContext();

	const context = useMemo(() => new AnalyticContextClass(pulseApiClient), [pulseApiClient]);

	return (
		<AnalyticContext.Provider value={context}>
			{children}
		</AnalyticContext.Provider>
	);
}

export const useAnalyticContext = () => useContext(AnalyticContext);
