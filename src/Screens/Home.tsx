import { StyleSheet, Text, View } from 'react-native';
import { useContext } from 'react';
import { AuthContext } from '../Contexts/AuthContext';

export default function Home () {
	const authContext = useContext(AuthContext)
  return (
		<View >
			<Text>Welcome {authContext.username}</Text>
		</View>
	)
}
