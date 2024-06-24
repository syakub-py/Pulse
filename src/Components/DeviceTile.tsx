import Thermostat from "./Devices/Thermostat";
import Light from "./Devices/Light";
import Lock from "./Devices/Lock";
import Camera from "./Devices/Camera";

interface Props{
	device:Device
}

export default function DeviceTile(props:Props){
	const {device} = props;
	if (device.Type == "Thermostat") {
		return <Thermostat thermostat={device}/>;
	}else if (device.Type == "Light"){
		return <Light light={device}/>;
	}else if (device.Type == "Lock") {
		return <Lock lock={device}/>;
	}else if (device.Type == "Camera") {
		return <Camera camera={device}/>;
	}
}


