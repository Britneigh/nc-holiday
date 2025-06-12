import { Tabs } from 'expo-router';
import { useTheme } from '../ThemeContext';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faHouse, faMagnifyingGlass, faPlane, faUser } from '@fortawesome/free-solid-svg-icons';

export default function TabLayout() {
    const { mode }: any = useTheme();
    return (
        <Tabs screenOptions={({ route }) => ({
            tabBarStyle: {
                backgroundColor: mode.background,
            },
            tabBarActiveTintColor: mode.text,
            tabBarInactiveTintColor: '#999',
            headerStyle: {
                backgroundColor: mode.background,
            },
            headerTitleStyle: {
                color: mode.text,
            },
            tabBarIcon: ({ color, size }) => {
                let iconName

                if (route.name === 'home') {
                    iconName = faHouse
                } else if (route.name === 'explore') {
                    iconName = faMagnifyingGlass
                } else if (route.name === 'trips') {
                    iconName = faPlane
                } else if (route.name === 'chatbot') {
                    iconName = faUser
                }

                return <FontAwesomeIcon icon={iconName} size={size} color={color} />

            }
        })}
        >
            <Tabs.Screen name='home' options={{ title: 'Home', headerShown: false }} />
            <Tabs.Screen name='explore' options={{ title: 'Explore', headerShown: false }} />
            <Tabs.Screen name='trips' options={{ title: 'Trips', headerShown: false }} />
            <Tabs.Screen name='chatbot' options={{ title: 'Chatbot', headerShown: false }} />
        </Tabs>
    );
}

