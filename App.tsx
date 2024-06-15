import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import Stack from './src/Screens/Stack';
import { AuthContextClass, AuthContext } from './src/Contexts/AuthContext';
import { AppContextClass, AppContext } from './src/Contexts/AppContext';
import { useMemo } from 'react';

export default function App () {
	const appContext = useMemo(() => new AppContextClass(), [])
  const authContext = useMemo(() => new AuthContextClass(), [])
  return (
		<AuthContext.Provider value={authContext}>
			<AppContext.Provider value={appContext}>
				<NavigationContainer>
					<Stack />
				</NavigationContainer>
			</AppContext.Provider>
		</AuthContext.Provider>

	)
}
