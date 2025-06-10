import { Tabs } from 'expo-router';
// import { Ionicons } from '@expo/vector-icons';

export default function TabLayout() {
    return (
        <Tabs >
            <Tabs.Screen name='home' options={{ title: 'Home', headerShown: false }} />
            <Tabs.Screen name='explore' options={{ title: 'Explore', headerShown: false }} />
            <Tabs.Screen name='trips' options={{ title: 'Trips', headerShown: false }} />
            <Tabs.Screen name='chatbot' options={{ title: 'Chatbot', headerShown: false }} />
        </Tabs>
    );
}

