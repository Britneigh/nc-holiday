import { Stack } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import { StyleSheet, Text, View, Pressable } from 'react-native';
import { AuthProvider } from "@/context/UserContext";
import { router } from 'expo-router';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import Header from "@/components/Header";
import { getAuth } from 'firebase/auth';
import { ThemeProvider } from './ThemeContext';

async function logCurrentUserToken() {
  const auth = getAuth();
  const user = auth.currentUser;

  if (user) {
    const token = await user.getIdToken();
    console.log('Current user token:', token);
  } else {
    console.log('No user is signed in.');
  }
}

logCurrentUserToken();

const queryClient = new QueryClient();
export default function RootLayout() {

  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <ThemeProvider>
          <SafeAreaView style={styles.container}>
            <Header />
            <Stack screenOptions={{ headerShown: false }} />
          </SafeAreaView>
        </ThemeProvider>
      </AuthProvider>
    </QueryClientProvider>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fffff'
  },
  box: {
    height: 50,
    backgroundColor: 'beige',
    justifyContent: 'center',
    alignItems: 'center'
  }
});
