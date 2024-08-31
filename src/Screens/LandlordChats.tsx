import {observer} from "mobx-react-lite";
import {useAppContext} from "@src/Contexts/AppContext";
import Layout from "@src/Components/Layout";
import Header from "@src/Components/Header";

function LandlordChats(){
	const appContext = useAppContext();
	return(
		<Layout>
			<Header title={"Chats"}/>

		</Layout>
	);
}


export default observer(LandlordChats);
