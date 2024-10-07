import {createContext, useContext, useMemo} from "react";
import {PulseApiClient} from "@src/Contexts/PulseApiClientContext";
import {action, makeAutoObservable, runInAction} from "mobx";
import isHTTPError from "@src/Utils/HttpError";


class AnalyticContextClass {
	public ExpenseAnalyticData:ExpenseAnalytic[] = [];
	public IncomeAnalyticData:IncomeAnalytic | null = null;
	public Transactions: PropertyTransaction[] = [];

	constructor(private readonly pulseApiClient: PulseApiClient) {
		makeAutoObservable(this);
	}

	public getAnalytics = action(async (propertyId:number) => {
		const expenseAnalyticResponse = await this.pulseApiClient.analyticsDataService.getExpenseAnalytics(propertyId);
		const incomeAnalyticResponse = await this.pulseApiClient.analyticsDataService.getIncomeAnalytics(propertyId);
		if (isHTTPError(expenseAnalyticResponse)) {
			alert(expenseAnalyticResponse.message);
			return;
		}
		this.setExpenseAnalyticData(expenseAnalyticResponse as ExpenseAnalytic[]);

		if (isHTTPError(incomeAnalyticResponse)) {
			alert(incomeAnalyticResponse.message);
			return;
		}
		this.setIncomeAnalyticData(incomeAnalyticResponse as IncomeAnalytic);
	});

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

	public clearContext = action(()=>{
		runInAction(() => {
			this.ExpenseAnalyticData = [];
			this.IncomeAnalyticData = null;
			this.Transactions = [];
		});
	});
}

const AnalyticContext = createContext<null | AnalyticContextClass>(null);

export default function AnalyticContextProvider({ children, pulseApiClient }: { children: React.ReactNode, pulseApiClient: PulseApiClient }) {
	const context = useMemo(() => new AnalyticContextClass(pulseApiClient), [pulseApiClient]);

	return (
		<AnalyticContext.Provider value={context}>
			{children}
		</AnalyticContext.Provider>
	);
}

export const useAnalyticContext = () => useContext(AnalyticContext);
