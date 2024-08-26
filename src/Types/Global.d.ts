declare global {
    interface Property {
        PropertyId?: number,
        Name:string,
        Address: string;
        PropertyType: string;
        isRental:boolean;
        PurchasePrice:string,
        Taxes:string,
        MortgagePayment:string,
        OperatingExpenses:string,
        isCurrentUserTenant?:boolean;
    }

    interface Lease {
        LeaseId?: number;
        TenantName: string;
        StartDate: string;
        EndDate: string;
        MonthlyRent: number | null;
        Terms:string;
        isLeaseExpired: boolean;
        isTenantCodeExpired?: boolean;
    }

    interface HTTPError{
        message:string,
        status_code:number,
    }

    interface User {
        id?:number;
        LeaseId: number | null;
        UserId: string;
        Name:string;
        PhoneNumber:string;
        Email:string;
        AnnualIncome:number;
        DateOfBirth:string;
        DocumentType:string;
        DocumentProvidedUrl:string;
        SocialSecurity:string;
    }

    interface Todo{
        id?:number,
        PropertyId:number | undefined,
        Title:string,
        Status:string,
        Priority:string,
        Description:string,
        AddedBy:string,
        RecommendedProfessional?:string,
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

    interface CodeValidationResponse {
        isValid: boolean;
        lease_id: number;
    }

    interface GoogleMapsPlaceResponse{
        name:string,
        vicinity:string,
        rating:number
    }

    interface ExpenseAnalytic {
        name: string;
        expenseAmount: number;
        color: string;
        legendFontColor: string;
        legendFontSize: number;
    }

    interface PropertyTransaction {
        id?:number
        userId?:string
        propertyId?:number;
        amount: number
        description: string
        transactionType: string
        incomeOrExpense:string
        date:string
    }

    type RootStackParamList = {
        "BottomNavBar": undefined
        "Home": undefined
        "Login": undefined
        "Settings":undefined
        "Loading": undefined,
        "Leases": undefined,
        "ChatBot": undefined
        "CreateUsernameAndPassword": undefined
        "AddAProperty": undefined
        "Analytics": undefined,
        "AllProperties": undefined,
        "AllTenants": undefined,
        "AddATodo": undefined,
        "AddALease":undefined,
        "AddAUser": undefined,
        "AddATransaction": undefined,
        "EnterTenantCode": undefined,
        "TodoDetails": { selectedTodoIndex:number },
    }
}

export { };
