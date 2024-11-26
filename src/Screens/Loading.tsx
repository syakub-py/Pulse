import {observer} from "mobx-react-lite";
import Layout from "../Components/GlobalComponents/Layout";
import {ActivityIndicator, StyleSheet} from "react-native";

function Loading(){
	return(
		<Layout>
			<ActivityIndicator
				size="large"
				color="white"
				style={styles.container}
			/>
		</Layout>
	);
}

export default observer(Loading);

const styles = StyleSheet.create({
	container:{
		position: "absolute",
		top: 0,
		bottom: 0,
		left: 0,
		right: 0,
		justifyContent: "center",
		alignItems: "center",
	}
});
