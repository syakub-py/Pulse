import {observer} from "mobx-react-lite";
import Layout from "../../Components/Layout";
import {Button, TextInput, View, StyleSheet, Pressable, Text} from "react-native";
import {useCallback, useEffect, useState} from "react";
import {useNavigation} from "@react-navigation/native";
import {StackNavigationProp} from "@react-navigation/stack";
import TenantService from "../../Utils/Services/TenantService";
import Header from "../../Components/Header";
import BackButton from "../../Components/BackButton";
import {useAuthContext} from "../../Contexts/AuthContext";

function TenantCode() {
	const [code, setCode] = useState("");
	const navigation = useNavigation<StackNavigationProp<RootStackParamList, "EnterTenantCode">>();
	const authContext = useAuthContext();

	useEffect(() => {
		authContext.isLoading = false;
	}, []);


	const handleCodeSubmit = useCallback(async () => {
		if (code.length !== 6) {
			alert("Please make sure the code is six digits");
			return;
		}
		const isCodeValidResponse = await TenantService.isCodeValid(code);
		authContext.setLeaseId(isCodeValidResponse.lease_id);
		if (!isCodeValidResponse.isValid) {
			alert("Invalid code or code expired");
			return;
		}
		navigation.navigate("AddATenant");
	}, [authContext, code, navigation]);

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
				<Pressable onPress={()=>navigation.navigate("Login")}>
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
