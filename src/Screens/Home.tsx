import HomeLayout from "../Components/Home/HomeLayout";
import {observer} from "mobx-react-lite";
import _ from "lodash";
import Properties from "../Components/Home/Properties";
import {useNavigation} from "@react-navigation/native";
import {StackNavigationProp} from "@react-navigation/stack";
import NoProperties from "../Components/Home/NoProperties";
import { useAppContext } from "../Contexts/AppContext";

function Home() {
	const appContext = useAppContext();
	const navigation = useNavigation<StackNavigationProp<RootStackParamList, "Home">>();

	return (
		<HomeLayout>
			{!_.isEmpty(appContext.Properties) ? (
				<Properties />
			) : (
				<NoProperties onClick={()=>navigation.navigate("AddAProperty")}/>
			)}
		</HomeLayout>
	);
}

export default observer(Home);

