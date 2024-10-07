import {PulseApiClient} from "@src/Contexts/PulseApiClientContext";
import {action, makeAutoObservable, runInAction} from "mobx";
import isHTTPError from "@src/Utils/HttpError";
import _ from "lodash";
import {createContext, useContext, useMemo} from "react";
import {storage} from "@src/Utils/Firebase";


class TenantContextClass {
	private pulseApiClient: PulseApiClient;
	public Tenants: User[] = [];

	constructor(pulseApiClient: PulseApiClient) {
		makeAutoObservable(this);
		this.pulseApiClient = pulseApiClient;
	}

	public addUser = action(async (user: User) => {
		try {
			const response = await this.pulseApiClient.userService.addUser(user);
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

	public getTenants = action(async (postgresUserId:number) => {
		const tenantResponse= await this.pulseApiClient.tenantService.getTenants(postgresUserId);
		if (isHTTPError(tenantResponse)){
			alert(tenantResponse.message);
			return;
		}
		this.setTenants(tenantResponse as User[]);
	});

	public setTenants = action((tenants: User[]) => {
		runInAction(() => {
			this.Tenants = tenants;
		});
	});

	public checkTenantCode = action(async (tenantCode: string) => {
		const isCodeValidResponse = await this.pulseApiClient.tenantService.isCodeValid(tenantCode);

		if (isHTTPError(isCodeValidResponse)) {
			alert(isCodeValidResponse.message);
			return;
		}

		if (!isCodeValidResponse.isValid) {
			alert("Invalid code or code expired");
			return;
		}
		return isCodeValidResponse;
	});

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
const TenantContext = createContext<TenantContextClass | null>(null);

export default function UserContextProvider({ children, pulseApiClient }: { children: React.ReactNode, pulseApiClient: PulseApiClient }) {
	const context = useMemo(() => new TenantContextClass(pulseApiClient), [pulseApiClient]);

	return (
		<TenantContext.Provider value={context}>
			{children}
		</TenantContext.Provider>
	);
}

export const useTenantContext = () => useContext(TenantContext);
