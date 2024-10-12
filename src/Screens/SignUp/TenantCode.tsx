import {observer} from "mobx-react-lite";
import Layout from "../../Components/GlobalComponents/Layout";
import {Button, TextInput, View, StyleSheet, Pressable, Text} from "react-native";
import {useCallback, useState} from "react";
import {useNavigation} from "@react-navigation/native";
import {StackNavigationProp} from "@react-navigation/stack";
import Header from "../../Components/GlobalComponents/Header";
import BackButton from "../../Components/GlobalComponents/BackButton";
import {useAuthContext} from "@src/Contexts/AuthContext";
import {useTenantContext} from "@src/Contexts/TenantContext";
import _ from "lodash";



function TenantCode() {
	const [code, setCode] = useState("");
	const navigation = useNavigation<StackNavigationProp<RootStackParamList, "EnterTenantCode">>();
	const authContext = useAuthContext();
	const tenantContext = useTenantContext();
	const handleCodeSubmit = useCallback(async () => {
		if (_.isNull(tenantContext)) return;
		if (code.length !== 6) {
			alert("Please make sure the code is six digits");
			return;
		}
		const tenantCodeResponse = await tenantContext.checkTenantCode(code);
		if (_.isUndefined(tenantCodeResponse)) return;
		authContext.setLeaseId(tenantCodeResponse.lease_id);
		navigation.navigate("AddAUser");

	}, [tenantContext, code, authContext, navigation]);

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
