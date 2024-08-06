import {observer} from "mobx-react-lite";
import Layout from "../Components/Layout";
import {FlatList, View, StyleSheet} from "react-native";
import TenantCard from "../Components/AllTenants/TenantCard";
import BackButton from "../Components/BackButton";
import Header from "../Components/Header";
import { useAppContext } from "../Contexts/AppContext";

function AllTenants() {
	const appContext = useAppContext();

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
