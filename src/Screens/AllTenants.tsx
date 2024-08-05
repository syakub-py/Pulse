import {observer} from "mobx-react-lite";
import Layout from "../Components/Layout";
import {FlatList, View, StyleSheet} from "react-native";
import {useContext} from "react";
import {AppContext} from "../Contexts/AppContext";
import TenantCard from "../Components/AllTenants/TenantCard";
import BackButton from "../Components/BackButton";
import Header from "../Components/Header";

function AllTenants() {
	const appContext = useContext(AppContext);
	return(
		<Layout>
			<View style={styles.header}>
				<BackButton/>
				<Header title={"Your Tenants"} />
			</View>
			<FlatList data={appContext.Tenants}
				renderItem={({item})=>(
					<TenantCard tenant={item} key={item.Name}/>
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
