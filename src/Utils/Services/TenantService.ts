import http from "../HttpCommon";

export default new class TenantService {

	async addTenant(LeaseId:number, tenantDetails:Tenant ){
		const response = await http.post(`/addTenant/${LeaseId}`, tenantDetails);
		return response.data.tenant_id;
	}
	async getTenants(userId:string):Promise<Tenant[]> {
		const response = await http.get(`/getTenants/${userId}`);
		return JSON.parse(response.data) as Tenant[];
	}
}();
