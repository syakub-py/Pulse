import {observer} from "mobx-react-lite";
import Layout from "../../Components/Layout";
import {Button, TextInput, View, StyleSheet, Pressable, Text} from "react-native";
import {useCallback, useEffect, useState} from "react";
import {useNavigation} from "@react-navigation/native";
import {StackNavigationProp} from "@react-navigation/stack";
import Header from "../../Components/Header";
import BackButton from "../../Components/BackButton";
import {useAuthContext} from "@src/Contexts/AuthContext";
import isHTTPError from "@src/Utils/HttpError";
import { useApiClientContext } from "../../Contexts/PulseApiClientContext";


function TenantCode() {
	const [code, setCode] = useState("");
	const navigation = useNavigation<StackNavigationProp<RootStackParamList, "EnterTenantCode">>();
	const authContext = useAuthContext();
	const apiClientContext = useApiClientContext();

	const handleCodeSubmit = useCallback(async () => {
		if (code.length !== 6) {
			alert("Please make sure the code is six digits");
			return;
		}

		const isCodeValidResponse = await apiClientContext.tenantService.isCodeValid(code);

		if (isHTTPError(isCodeValidResponse)) {
			alert(isCodeValidResponse.message);
			return;
		}

		if (!isCodeValidResponse.isValid) {
			alert("Invalid code or code expired");
			return;
		}

		authContext.setLeaseId(isCodeValidResponse.lease_id);
		navigation.navigate("AddAUser");
	}, [code, apiClientContext.tenantService, authContext, navigation]);

	return (
		<Layout>
			<View style={styles.headerContainer}>
				<BackButton/>
				<Header title={"Enter Your Code"}/>
			</View>
			<View style={styles.container}>
				<TextInput
					style={styles.input}
					onChangeText={setCode}
					value={code}
					keyboardType="numeric"
					maxLength={6}
					placeholderTextColor="white"
					placeholder="Enter your 6-digit code"
				/>
				<Pressable onPress={()=>navigation.navigate("AddAUser")}>
					<Text style={styles.text}>Not a Tenant? Click here to skip</Text>
				</Pressable>
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
		borderColor: "gray",
		borderWidth: 1,
		marginBottom: 20,
		paddingHorizontal: 10,
		color: "white"
	},
	text:{
		color: "white",
		fontSize: 20,
	},
	headerContainer:{
		alignItems:"center",
		flexDirection: "row",
	}
});
