import { Tabs } from 'expo-router';
import { useTheme } from '../ThemeContext';

export default function TabLayout() {
    const { mode }: any = useTheme();

    return (
        <Tabs screenOptions={{
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
      }}>
            <Tabs.Screen name='home' options={{ title: 'Home', headerShown: false }} />
            <Tabs.Screen name='explore' options={{ title: 'Explore', headerShown: false }} />
            <Tabs.Screen name='trips' options={{ title: 'Trips', headerShown: false }} />
            <Tabs.Screen name='chatbot' options={{ title: 'Chatbot', headerShown: false }} />
        </Tabs>
    );
}

