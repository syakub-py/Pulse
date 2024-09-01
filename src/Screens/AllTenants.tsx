import {observer} from "mobx-react-lite";
import Layout from "../Components/Layout";
import {FlatList, View, StyleSheet} from "react-native";
import TenantCard from "../Components/AllTenants/TenantCard";
import BackButton from "../Components/BackButton";
import Header from "../Components/Header";
import {useUserContext} from "@src/Contexts/UserContext";
import _ from "lodash";

function AllTenants() {
	const userContext = useUserContext();
	if (_.isNull(userContext)) return null;
	return(
		<Layout>
			<View style={styles.header}>
				<BackButton/>
				<Header title={"Your Tenants"} />
			</View>
			<FlatList data={userContext.Tenants}
				renderItem={({item})=>(
					<TenantCard tenant={item} key={item.UserId}/>
				)}/>
		</Layout>
	);
}

export default observer(AllTenants);

const styles = StyleSheet.create({
	header:{
		flexDirection: "row",
		alignItems: "center",
	}
});
