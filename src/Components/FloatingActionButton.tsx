import {TouchableOpacity, StyleProp, ViewStyle} from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";
import {observer} from "mobx-react-lite";

interface Props{
	onPress:()=>void,
	icon:string,
	styles:StyleProp<ViewStyle>,
}

const FloatingActionButton = (props:Props) => {
	const {onPress, icon, styles} = props;
	return (
		<TouchableOpacity onPress={onPress} style={styles}>
			<Ionicons name={icon} size={30} color="white" />
		</TouchableOpacity>
	);
};


export default observer(FloatingActionButton);
