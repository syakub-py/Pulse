import { createContext, useContext, useMemo } from "react";
import { action, makeAutoObservable, runInAction } from "mobx";
import { auth, storage } from "../Utils/Firebase";
import { IMessage } from "react-native-gifted-chat";
import PropertyService from "../Utils/Services/PropertyService";
import LeaseService from "../Utils/Services/LeaseService";
import _, {toNumber} from "lodash";
import TodoService from "../Utils/Services/TodoService";
import UserService from "@src/Utils/Services/UserService";
import isHTTPError from "@src/Utils/HttpError";
import TransactionService from "@src/Utils/Services/TransactionService";


class AppContextClass {
	public Properties: Property[] = [];
	public Chats:string[] = [];
	public PulseAiMessages: IMessage[] = [];
	public SelectedPropertyLeases: Lease[] = [];
	public SelectedPropertyTodos: Todo[] = [];
	public Tenants: User[] = [];
	public ExpenseAnalyticData:ExpenseAnalytic[] = [];
	public IncomeAnalyticData:IncomeAnalytic | null = null;
	public Transactions: PropertyTransaction[] = [];
	public SelectedProperty: Property | null = null;
	public SelectedTodo: Todo | null = null;


	constructor() {
		makeAutoObservable(this);
	}

	public setSelectedProperty = action((SelectedProperty: Property) => {
		runInAction(() => {
			this.SelectedProperty = SelectedProperty;
		});
	});

	public setProperties = action((Properties: Property[]) => {
		runInAction(() => {
			this.Properties = Properties;
		});
	});

	public addProperty = action(async (property: Property) => {
		try {
			if (!auth.currentUser?.uid) return false;
			const response = await PropertyService.addProperty(auth.currentUser.uid, property);
			if (isHTTPError(response)) {
				alert(response.message);
				return false;
			}
			property.PropertyId = response;
			runInAction(() => {
				this.Properties.push(property);
			});
			return true;
		} catch (e) {
			alert(e);
			return false;
		}

	});

	public deleteProperty = action(async (propertyId: number) => {
		try {
			const response = await PropertyService.deleteProperty(propertyId);
			if (isHTTPError(response)) {
				alert(response.message);
				return false;
			}
			runInAction(() => {
				this.SelectedPropertyLeases = [];
				this.Properties = this.Properties.filter((h) => toNumber(h.PropertyId) !== propertyId);
				if (!_.isEmpty(this.Properties)) {
					this.SelectedProperty = this.Properties[this.Properties.length - 1];
					return true;
				}
				this.SelectedProperty = null;

			});
			return true;
		} catch (e) {
			alert(e);
			return false;
		}
	});

	public setPropertyLeases = action((leases: Lease[]) => {
		runInAction(() => {
			this.SelectedPropertyLeases = leases;
		});
	});

	public addLease = action(async (lease: Lease, tenantEmail: string) => {
		try {
			if (_.isNull(this.SelectedProperty) || _.isUndefined(this.SelectedProperty.PropertyId)) return false;
			const response = await LeaseService.addLease(this.SelectedProperty.PropertyId, lease);
			if (isHTTPError(response)) {
				alert(response.message);
				lease.LeaseId = 0;
				return false;
			}
			lease.LeaseId = response;
			const sendEmailResponse = await UserService.sendSignUpEmail(lease.LeaseId, tenantEmail);
			if (isHTTPError(sendEmailResponse)) {
				alert(sendEmailResponse.message);
				return false;
			}
			runInAction(() => {
				this.SelectedPropertyLeases.push(lease);
			});
			alert("Sent invite to " + tenantEmail.toLowerCase());
			lease.LeaseId = 0;
			return true;
		} catch (e) {
			alert(e);
			return false;
		}

	});

	public deleteLease = action(async (leaseId: number) => {
		try {
			const response = await LeaseService.deleteLease(leaseId);
			if (!_.isUndefined(response) && isHTTPError(response)) {
				alert(response.message);
				return;
			}
			runInAction(() => {
				this.SelectedPropertyLeases = this.SelectedPropertyLeases.filter((l) => toNumber(l.LeaseId) !== leaseId);
				this.Tenants = this.Tenants.filter((t) => t.LeaseId !== leaseId);
			});
		} catch (e) {
			alert(e);
			console.error("Error deleting lease: " + e);
		}
	});

	public addUser = action(async (user: User) => {
		try {
			const response = await UserService.addUser(user);
			if (isHTTPError(response)) {
				alert(response.message);
				return false;
			}
			user.id = response;
			if (_.isNull(user.LeaseId)) return true;
			runInAction(() => {
				this.Tenants.push(user);
			});
			return true;
		} catch (e) {
			alert(e);
			return false;
		}
	});

	public setTenants = action((tenants: User[]) => {
		runInAction(() => {
			this.Tenants = tenants;
		});
	});

	public setSelectedPropertyTodos = action((todos: Todo[]) => {
		runInAction(() => {
			this.SelectedPropertyTodos = todos;
		});
	});

	public addTodo = action(async (todo: Todo) => {
		try {
			const response = await TodoService.addTodo(todo);
			if (isHTTPError(response)) {
				alert(response.message);
				return false;
			}
			todo.id = response;
			runInAction(() => {
				this.SelectedPropertyTodos.push(todo);
			});
			return true;
		} catch (e) {
			alert(e);
			return false;
		}

	});

	public deleteTodo = action(async (todoId: number) => {
		const response = await TodoService.deleteTodo(todoId);
		if (isHTTPError(response)) {
			alert(response.message);
			return;
		}

		runInAction(() => {
			this.SelectedPropertyTodos = this.SelectedPropertyTodos.filter((todo) => todo.id !== todoId);
		});
	});

	public setSelectedPropertyTodo = action((todo: Todo) => {
		runInAction(() => {
			this.SelectedTodo = todo;
		});
	});

	public getRecommendations = action(async (todoId: number) => {
		try {
			if (_.isNil(this.SelectedProperty)) return [];
			const response = await TodoService.getRecommendations(todoId, this.SelectedProperty.Address);
			if (isHTTPError(response)) {
				alert(response.message);
				return [];
			}
			return response;
		} catch (error) {
			console.error("Error fetching recommendations:", error);
			return [];
		}
	});

	public setPulseAiMessages = action((messages: IMessage[]) => {
		runInAction(() => {
			this.PulseAiMessages = messages.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
		});
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
			const addTransactionResponse = await TransactionService.addTransaction(transaction);
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

	public handleDeleteAccount = action(async (username: string, uid:string) => {
		try {
			const response = await UserService.deleteUser(uid);
			if (isHTTPError(response)) return false;
			const paths = [
				`/DocumentPictures/${username}`,
				`/ProfilePictures/${username}`
			];
			for (const path of paths) {
				const folderRef = storage.ref(path);
				const listResult = await folderRef.listAll();
				const deletePromises = listResult.items.map(fileRef => fileRef.delete());
				await Promise.all(deletePromises);
			}
			if (_.isEmpty(this.Properties)) return;
			for (const property of this.Properties) {
				if (_.isUndefined(property.PropertyId)) return;
				await this.deleteProperty(property.PropertyId);
			}
			if (_.isNull(auth.currentUser)) return false;
			await auth.currentUser.delete();
			return true;
		} catch (error) {
			console.error("Error deleting account folders:", error);
		}
	});

	public logout() {
		this.Properties = [];
		this.PulseAiMessages = [];
		this.SelectedProperty = null;
		this.SelectedPropertyLeases = [];
		this.Tenants = [];
	}

	public uploadPicture = async (profilePicturePath: string, path: string) => {
		if (_.isEmpty(profilePicturePath)) {
			return "";
		}
		try {
			const filename = profilePicturePath.split("/").pop();
			const response = await fetch(profilePicturePath);
			const blob = await response.blob();
			const storageRef = storage.ref().child(path + `${filename}`);
			await storageRef.put(blob);
			return await storageRef.getDownloadURL();
		} catch (error) {
			console.error("error uploading picture: " + error);
			return "";
		}
	};


}

const AppContext = createContext(new AppContextClass());

export default function AppContextProvider({ children }: { children: React.ReactNode }) {
	const appContext = useMemo(() => new AppContextClass(), []);

	return (
		<AppContext.Provider value={appContext}>
			{children}
		</AppContext.Provider>
	);
}

export const useAppContext = () => useContext(AppContext);
