import {observer} from "mobx-react-lite";
import Layout from "../Components/GlobalComponents/Layout";
import {FlatList, View, StyleSheet} from "react-native";
import TenantCard from "../Components/AllTenants/TenantCard";
import BackButton from "../Components/GlobalComponents/BackButton";
import Header from "../Components/GlobalComponents/Header";
import {useTenantContext} from "@src/Contexts/TenantContext";
import _ from "lodash";

function AllTenants() {
	const userContext = useTenantContext();
	if (_.isNull(userContext)) return null;
	return(
		<Layout>
			<View style={styles.header}>
				<BackButton/>
				<Header title={"Your Tenants"} />
			</View>
			<FlatList data={userContext.tenants}
				renderItem={({item})=>(
					<TenantCard tenant={item} key={item.firebaseUserId}/>
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
