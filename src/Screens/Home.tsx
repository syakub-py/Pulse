import Layout from "../Components/Layout";
import React, {useContext} from "react";
import {AppContext} from "../Contexts/AppContext";
import {observer} from "mobx-react-lite";
import _ from "lodash";
import Properties from "../Components/Home/Properties";
import {useNavigation} from "@react-navigation/native";
import {StackNavigationProp} from "@react-navigation/stack";
import NoProperties from "../Components/Home/NoProperties";

function Home() {
	const appContext = useContext(AppContext);
	const navigation = useNavigation<StackNavigationProp<RootStackParamList, "Home">>();
	return (
		<Layout>
			{
				_.isEmpty(appContext.Homes) ? (
					<NoProperties onClick={()=>navigation.navigate("AddProperties")}/>
				) : (
					<Properties />
				)
			}
		</Layout>
	);
}

export default observer(Home);

