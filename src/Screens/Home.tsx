import HomeLayout from "../Components/Home/HomeLayout";
import {observer} from "mobx-react-lite";
import _ from "lodash";
import Properties from "../Components/Home/Properties";
import {useNavigation} from "@react-navigation/native";
import {StackNavigationProp} from "@react-navigation/stack";
import NoProperties from "../Components/Home/NoProperties";
import {usePropertyContext} from "@src/Contexts/PropertyContext";

function Home() {
	const propertyContext = usePropertyContext();
	const navigation = useNavigation<StackNavigationProp<RootStackParamList, "Home">>();
	if (_.isNull(propertyContext)) return null;
	return (
		<HomeLayout>
			{!_.isEmpty(propertyContext.properties) ? (
				<Properties />
			) : (
				<NoProperties onClick={()=>navigation.navigate("AddAProperty")}/>
			)}
		</HomeLayout>
	);
}

export default observer(Home);

