
declare global {

    interface HTTPError{
        message:string,
        status_code:number,
    }

    interface PasswordRequirement{
        label:string,
        fulfilled:(password:string) => boolean
    }

    type RootStackParamList = {
        "BottomNavBar": undefined,
        "Home": undefined,
        "Login": undefined,
        "Settings":undefined,
        "Loading": undefined,
        "Leases": undefined,
        "ChatBox": { selectedChat:Chat },
        "Chats":undefined,
        "CreateUsernameAndPassword": undefined,
        "AddAProperty": undefined,
        "Analytics": undefined,
        "AllProperties": undefined,
        "AllTenants": undefined,
        "AddATodo": undefined,
        "AddALease":undefined,
        "AddAUser": undefined,
        "AddATransaction": undefined,
        "EnterTenantCode": undefined,
        "TodoDetails": { selectedTodoIndex:number }
    }
}

export { };
