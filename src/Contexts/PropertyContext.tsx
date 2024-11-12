import {action, makeAutoObservable, runInAction} from "mobx";
import {auth} from "@src/Utils/FirebaseConfig";
import isHTTPError from "@src/Utils/HttpError";
import _, {toNumber} from "lodash";
import {createContext, useContext, useMemo} from "react";
import {PulseApiClient} from "@src/Contexts/PulseApiClientContext";


class PropertyContextClass {
	public properties: Property[] = [];
	public selectedProperty: Property | null = null;
	private pulseApiClient: PulseApiClient;

	constructor(pulseApiClient: PulseApiClient) {
		makeAutoObservable(this);
		this.pulseApiClient = pulseApiClient;
	}

	public setSelectedProperty = action((SelectedProperty: Property) => {
		runInAction(() => {
			this.selectedProperty = SelectedProperty;
		});
	});

	public setProperties = action((Properties: Property[]) => {
		runInAction(() => {
			this.properties = Properties;
		});
	});

	public getProperty = action(async (postgresUserId:number) => {
		const properties = await this.pulseApiClient.propertyService.getProperty(postgresUserId);
		if (isHTTPError(properties)) {
			alert(properties.message);
			return;
		}
		if (_.isNull(properties)) this.setProperties([]);
		this.setProperties(properties as Property[]);
	});

	public addProperty = action(async (postgresUserId:number, property: Property) => {
		try {
			if (!auth.currentUser?.uid) return false;
			const response = await this.pulseApiClient.propertyService.addProperty(postgresUserId, auth.currentUser.uid, property);
			if (isHTTPError(response)) {
				alert(response.message);
				return false;
			}
			property.PropertyId = response;

			runInAction(() => {
				if (_.isUndefined(this.properties)) {
					this.properties = [];
				}
				this.properties.push(property);
			});
			return true;
		} catch (e) {
			alert(e);
			return false;
		}
	});

	public deleteProperty = action(async (propertyId: number) => {
		try {
			const response = await this.pulseApiClient.propertyService.deleteProperty(propertyId);
			if (isHTTPError(response)) {
				alert(response.message);
				return false;
			}
			runInAction(() => {
				this.properties = this.properties.filter((h) => toNumber(h.PropertyId) !== propertyId);
				if (!_.isEmpty(this.properties)) {
					this.selectedProperty = this.properties[this.properties.length - 1];
					return true;
				}
				this.selectedProperty = null;
			});
			return true;
		} catch (e) {
			alert(e);
			return false;
		}
	});

	public clearContext = action( () => {
		runInAction(() => {
			this.properties = [];
			this.selectedProperty = null;
		});
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
