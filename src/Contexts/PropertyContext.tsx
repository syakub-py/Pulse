import {action, makeAutoObservable, runInAction} from "mobx";
import {auth} from "@src/Utils/Firebase";
import isHTTPError from "@src/Utils/HttpError";
import _, {toNumber} from "lodash";
import {createContext, useContext, useMemo} from "react";
import {PulseApiClient} from "@src/Contexts/PulseApiClientContext";


class PropertyContextClass {
	public Properties: Property[] = [];
	public SelectedProperty: Property | null = null;
	private pulseApiClient: PulseApiClient;

	constructor(pulseApiClient: PulseApiClient) {
		makeAutoObservable(this);
		this.pulseApiClient = pulseApiClient;
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
			const response = await this.pulseApiClient.propertyService.addProperty(auth.currentUser.uid, property);
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

	public deleteProperty = action(async (propertyId: number, SelectedPropertyLeases:Lease[]) => {
		try {
			const response = await this.pulseApiClient.propertyService.deleteProperty(propertyId);
			if (isHTTPError(response)) {
				alert(response.message);
				return false;
			}
			runInAction(() => {
				SelectedPropertyLeases = [];
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
}


const PropertyContext = createContext<PropertyContextClass | null>(null);

export default function PropertyContextProvider({ children, pulseApiClient }: { children: React.ReactNode, pulseApiClient: PulseApiClient }) {
	const context = useMemo(() => new PropertyContextClass(pulseApiClient), [pulseApiClient]);
	return (
		<PropertyContext.Provider value={context}>
			{children}
		</PropertyContext.Provider>
	);
}

export const usePropertyContext = () => useContext(PropertyContext);
