declare global {
    interface Property {
        PropertyId: number,
        Name:string,
        Address: string;
        PropertyType: string;
        isRental:boolean;
        Leases?:Lease[]
    }

    interface Tenant {
        TenantId: string;
        Name: string;
    }

    interface Lease {
        LeaseId: string;
        Tenants: Tenant[];
        StartDate: Date;
        EndDate: Date;
        MonthlyRent: number;
        IsActive: () => boolean;
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
    }
}

export { };
