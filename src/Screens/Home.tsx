import Layout from "../Components/Layout";
import DeviceTile from "../Components/DeviceTile";

export default function Home() {
	const fakeDevices: Device[] = [
		{
			Name: "Smart Light Bulb",
			Type: "Light",
			ApiKey: "abc123",
			Status: "On",
			Hid: "001"
		},
		{
			Name: "Smart Thermostat",
			Type: "Thermostat",
			ApiKey: "def456",
			Status: "Off",
			Hid: "002"
		},
		{
			Name: "Smart Lock",
			Type: "Lock",
			ApiKey: "ghi789",
			Status: "Locked",
			Hid: "003"
		},
		{
			Name: "Smart Camera",
			Type: "Camera",
			ApiKey: "jkl012",
			Status: "Online",
			Hid: "004"
		}
	];
	return (
		<Layout>
			<DeviceTile device={fakeDevices[0]}/>
		</Layout>
	);
}

// const styles = StyleSheet.create({
//
// });

