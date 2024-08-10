import {observer} from "mobx-react-lite";
import Layout from "../../Components/Layout";
import {Button, TextInput, View, StyleSheet} from "react-native";
import {useState} from "react";
import {useNavigation} from "@react-navigation/native";
import {StackNavigationProp} from "@react-navigation/stack";
import TenantService from "../../Utils/Services/TenantService";


function TenantCode() {
	const [code, setCode] = useState("");
	const navigation = useNavigation<StackNavigationProp<RootStackParamList, "EnterTenantCode">>();

	const handleCodeSubmit = async () => {
		if (code.length === 6) {
			const isColdValid = await TenantService.isCodeValid(code);
			if (!isColdValid) {
				alert("invalid code or code expired");
				return;
			}
			navigation.navigate("AddATenant");
		} else {
			alert("Please make sure the code is six digits");
		}
	};

	return (
		<Layout>
			<View style={styles.container}>
				<TextInput
					style={styles.input}
					onChangeText={setCode}
					value={code}
					keyboardType="numeric"
					maxLength={6}
					placeholder="Enter your 6-digit code"
				/>
				<Button
					title="Submit"
					onPress={handleCodeSubmit}
				/>
			</View>
		</Layout>
	);
}

export default observer(TenantCode);


const styles = StyleSheet.create({
	container: {
		padding: 20
	},
	input: {
		height: 40,
		borderColor: 'gray',
		borderWidth: 1,
		marginBottom: 20,
		paddingHorizontal: 10
	}
});
