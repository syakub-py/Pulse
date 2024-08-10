declare global {
    interface Property {
        PropertyId: number,
        Name:string,
        Address: string;
        PropertyType: string;
        isRental:boolean;
    }

    interface Lease {
        LeaseId: number;
        TenantName?: string;
        StartDate: string;
        EndDate: string;
        MonthlyRent: number | null;
        PropertyId: number;
        Terms:string;
        isExpired: boolean;
    }

    interface PasswordRequirement{
        label:string,
        fulfilled:boolean
    }

    interface ChatMessage {
        _id:number;
        text: string;
        createdAt: string;
        user:string;
    }

    interface Tenant{
        TenantId?:number;
        LeaseId?: number;
        UserId: string;
        Name:string;
        PhoneNumber:string;
        Email:string;
        AnnualIncome:number;
        DateOfBirth:string;
        DocumentProvidedUrl:string;
        SocialSecurity:string;
        CoSigner?:string;
    }

    type RootStackParamList = {
        "BottomNavBar": undefined
        "Home": undefined
        "Login": undefined
        "Settings":undefined
        "ChatBot": undefined
        "CreateUsernameAndPassword": undefined
        "AddAProperty": undefined
        "AddAndConfigureDevices": undefined,
        "Analytics": undefined,
        "AllProperties": undefined,
        "Loading": undefined,
        "Leases": undefined,
        "AddALease":undefined,
        "AddATenant": undefined,
        "AllTenants": undefined,
        "EnterTenantCode": undefined,
    }
}

export { };
