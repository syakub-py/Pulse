import {observer} from "mobx-react-lite";
import Layout from "../Components/Layout";
import Header from "../Components/Header";
import {Button, ScrollView} from "react-native";
import {useNavigation} from "@react-navigation/native";
import {StackNavigationProp} from "@react-navigation/stack";
import {useContext, useState} from "react";
import _ from "lodash";
import {AppContext} from "../Contexts/AppContext";


function AddATenant() {
	const navigation = useNavigation<StackNavigationProp<RootStackParamList, "AddATenant">>();
	const appContext = useContext(AppContext);
	const [TenantDetails, setTenantDetails] = useState<Tenant>({
		Name:"",
		AnnualIncome:0,
		PhoneNumber:"",
		DateOfBirth:""
	});

	const handleInputChange = (name:string, value:string | number) => {
		setTenantDetails({
			...TenantDetails,
			[name]: value,
		});
	};

	const handleAddTenant = async () => {
		try {
			const TenantId = await appContext.addTenant(TenantDetails);
			if (!_.isUndefined(TenantId)){
				handleInputChange("TenantId", TenantId);
				await appContext.setTenants(TenantDetails);
				setTenantDetails({
					Name:"",
					AnnualIncome:0,
					PhoneNumber:"",
					DateOfBirth:""
				});
			}
		} catch (error) {
			console.error(error);
		}
	};


	const handleSubmit = async () => {
		navigation.navigate("BottomNavBar");
	};

	return(
		<Layout>
			<Header title={"Add Your tenants"}/>
			<ScrollView>
				<Button title={"Done"} onPress={handleSubmit}/>
			</ScrollView>
		</Layout>
	);
}



export default observer(AddATenant);

