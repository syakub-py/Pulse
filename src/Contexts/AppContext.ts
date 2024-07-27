import {createContext} from "react";
import {action, makeAutoObservable, runInAction} from "mobx";
import {auth} from "../Utils/Firebase";
import {IMessage} from "react-native-gifted-chat";
import DataService from "../Utils/DataService";
import {toNumber} from "lodash";

export class AppContextClass {
	public Properties:Property[] = [];
	public Messages:IMessage[] = [];
	public SelectedProperty:Property | null = null;
	public Leases: Lease[] = [
		{
			LeaseId: "lease1",
			StartDate: new Date("2023-01-01"),
			EndDate: new Date("2024-01-01"),
			MonthlyRent: 1200,
			Tenants: [
				{ TenantId: "t1", Name: "John Doe" },
				{ TenantId: "t2", Name: "Jane Smith" }
			],
			IsActive: function (): boolean {
				const today = new Date();
				return today >= this.StartDate && today <= this.EndDate;
			}
		},
		{
			LeaseId: "lease2",
			StartDate: new Date("2023-06-01"),
			EndDate: new Date("2024-06-01"),
			MonthlyRent: 1500,
			Tenants: [
				{ TenantId: "t3", Name: "Alice Johnson" },
				{ TenantId: "t4", Name: "Bob Brown" }
			],
			IsActive: function (): boolean {
				const today = new Date();
				return today >= this.StartDate && today <= this.EndDate;
			}
		},
		{
			LeaseId: "lease3",
			StartDate: new Date("2023-03-01"),
			EndDate: new Date("2024-03-01"),
			MonthlyRent: 1300,
			Tenants: [
				{ TenantId: "t5", Name: "Charlie Davis" },
				{ TenantId: "t6", Name: "Diana Evans" }
			],
			IsActive: function (): boolean {
				const today = new Date();
				return today >= this.StartDate && today <= this.EndDate;
			}
		}
	];

	constructor() {
		makeAutoObservable(this);
	}

	public setSelectedProperty = action((SelectedProperty: Property) =>{
		this.SelectedProperty = SelectedProperty;
	});

	public addProperty = action(async (property: Property) => {
		try {
			if (auth.currentUser?.uid){
				property.PropertyId = await DataService.addProperty(auth.currentUser?.uid, property);
				runInAction(() => {
					this.Properties.push(property);
				});
			}
		} catch (error) {
			console.error("Error adding property:", error);
			alert("An error occurred. Try again later.");
		}
	});

	public deleteHome = action(async (propertyId: number)=> {
		await DataService.deleteProperty(propertyId);
		runInAction(() => {
			this.Properties = this.Properties.filter((h) => toNumber(h.PropertyId) !== propertyId);
		});
	});
}

export const AppContext = createContext(new AppContextClass());
