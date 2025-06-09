import { Tabs } from 'expo-router';
import { HolidayDataProvider } from '../../context/HolidayDataContext';

export default function TabLayout() {
  return (
    <HolidayDataProvider>
      <Tabs>
        <Tabs.Screen name='home' options={{ title: 'Home', headerShown: false }} />
        <Tabs.Screen name='explore' options={{ title: 'Explore', headerShown: false }} />
        <Tabs.Screen name='chatbot' options={{ title: 'Chatbot', headerShown: false }} />
      </Tabs>
    </HolidayDataProvider>
  );
}
