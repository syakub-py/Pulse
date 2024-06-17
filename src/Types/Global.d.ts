declare global {
    interface Home {
        Uid: string;
        Hid: string;
        Address: string;
        Calendar: string;
        Description: string;
        ImageUrls?: string[];
        ConnectedDevices: Device[];
    }

    interface Device {
        Name: string;
        Type: string;
        ApiKey: string;
        Status: string;
        Hid: string;
    }
}

export { };
