declare global {
    interface Property {
        PropertyId: number,
        Name:string,
        Address: string;
        PropertyType: string;
        Calendar?: string;
        ConnectedDevices?: Device[];
        isRental:boolean;
    }

    interface Device {
        DeviceID: number;
        Name: string;
        Type: string;
        ApiKey: string;
        Location:string;
        Status: string;
    }

    interface WeatherResponse {
        coord: {
            lon: number;
            lat: number;
        };
        weather: {
            id: number;
            main: string;
            description: string;
            icon: string;
        }[];
        base: string;
        main: {
            temp: number;
            feels_like: number;
            temp_min: number;
            temp_max: number;
            pressure: number;
            humidity: number;
        };
        visibility: number;
        wind: {
            speed: number;
            deg: number;
            gust: number;
        };
        clouds: {
            all: number;
        };
        dt: number;
        sys: {
            type: number;
            id: number;
            country: string;
            sunrise: number;
            sunset: number;
        };
        timezone: number;
        id: number;
        name: string;
        cod: number;
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
        "AddProperties": undefined
        "AddAndConfigureDevices": undefined,
        "Analytics": undefined,
    }
}

export { };
