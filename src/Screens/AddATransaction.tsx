import {observer} from "mobx-react-lite";
import Layout from "@src/Components/Layout";
import Header from "@src/Components/Header";
import BackButton from "@src/Components/BackButton";
import {useAppContext} from "@src/Contexts/AppContext";
import {useCallback, useState} from "react";
import {useAuthContext} from "@src/Contexts/AuthContext";

function AddATransaction() {
	const appContext = useAppContext();
	const authContext = useAuthContext();
	const [transaction, setTransaction] = useState<PropertyTransaction>({
		amount: 0,
		description: "",
		incomeOrExpense: "",
		transactionType: "",

	});
	const handleSubmit = useCallback(async () => {
		transaction.propertyId = appContext.SelectedProperty?.PropertyId;
		transaction.userId = authContext.uid;
		await appContext.addTransaction(transaction);
	},[]);

	return (
		<Layout>
			<Header title={"Add Transaction"} />
			<BackButton/>


		</Layout>
	);
}

export default observer(AddATransaction);
