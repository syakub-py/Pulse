import {Dimensions, FlatList, StyleSheet, Text, View, Pressable, RefreshControl} from "react-native";
import Button from "../Buttons/Button";
import {useNavigation} from "@react-navigation/native";
import {StackNavigationProp} from "@react-navigation/stack";
import { useAppContext } from "@src/Contexts/AppContext";
import {observer} from "mobx-react-lite";
import TodoCard from "../Todo/TodoCard";
import useFetchTodos from "@src/Hooks/useFetchTodos";
import {useState} from "react";

interface Props {
	property: Property
}

function SelectedProperty(props: Props) {
	const { property } = props;
	const navigation = useNavigation<StackNavigationProp<RootStackParamList, "Home">>();
	const appContext = useAppContext();
	const [refreshing, setRefreshing] = useState(false);

	const fetchTodos = useFetchTodos();

	const onRefresh = async () => {
		setRefreshing(true);
		await fetchTodos();
		setRefreshing(false);
	};
	return (
		<View style={styles.houseTileContainer}>
			<Text style={styles.homeName}>{property.Name}</Text>
			<Text style={styles.homeAddress}>{property.Address}</Text>
			<View style={styles.addTodoContainer}>
				<Text style={styles.todoText}>Property todos</Text>
				<Button
					title={"Add"}
					containerStyle={styles.addTodoButton}
					textStyle={styles.addTodoButtonText}
					onPress={() => navigation.navigate("AddATodo")}
					iconName={"add"}
				/>
			</View>
			<FlatList
				data={appContext.SelectedPropertyTodos}
				showsVerticalScrollIndicator={false}
				renderItem={({item, index})=>(
					<Pressable onPress={()=>navigation.navigate("TodoDetails", {selectedTodoIndex:index})}>
						<TodoCard todo={item}/>
					</Pressable>
				)}
				refreshControl={
					<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
				}
				ListFooterComponent={() => (
					<View style={styles.footer}/>
				)}
			/>
		</View>
	);
}

export default observer(SelectedProperty);

const styles = StyleSheet.create({
	homeAddress: {
		fontSize: 15,
		margin: 15,
		color: "white",
	},
	addTodoContainer: {
		flexDirection: "row",
		justifyContent: "space-between",
		alignItems: "center",
	},
	todoText: {
		fontSize: 20,
		fontWeight: "bold",
		marginHorizontal: 15,
		color: "white",
	},
	homeName: {
		fontSize: 25,
		fontWeight: "bold",
		marginHorizontal: 15,
		color: "white",
	},
	addTodoButton: {
		justifyContent: "center",
		alignItems: "center",
		height: 40,
		width: 70,
		opacity: 0.7,
		marginHorizontal: 20,
		borderRadius: 20,
		flexDirection: "row",
	},
	addTodoButtonText: {
		fontSize: 18,
		fontWeight: "bold",
		color: "white",
	},
	houseTileContainer: {
		marginVertical:10,
		width:Dimensions.get("window").width,
		height: "90%",
	},
	footer: {
		marginTop:120
	},
});
