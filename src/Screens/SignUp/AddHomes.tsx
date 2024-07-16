import { StyleSheet, Text} from "react-native";
import {useContext} from "react";
import {AuthContext} from "../../Contexts/AuthContext";
import SignUpLayout from "../../Components/SignUpLayout";

export default function AddHomes() {
	const authContext = useContext(AuthContext);
	return (
		<SignUpLayout>
			<Text>{authContext.profilePicture}</Text>
		</SignUpLayout>
	);
}

const styles = StyleSheet.create({

});
