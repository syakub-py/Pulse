import HomeLayout from "../Components/Home/HomeLayout";
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
		<HomeLayout>
			{
				_.isEmpty(appContext.Homes) ? (
					<NoProperties onClick={()=>navigation.navigate("AddProperties")}/>
				) : (
					<Properties />
				)
			}
		</HomeLayout>
	);
}

export default observer(Home);

