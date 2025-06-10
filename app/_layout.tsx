import { Stack } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import { StyleSheet, Text, View, Pressable } from 'react-native';
import { AuthProvider } from "@/context/UserContext";
import { router } from 'expo-router';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import Header from "@/components/Header";
// import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { getAuth } from 'firebase/auth';

console.log('Current user token:', await getAuth().currentUser?.getIdToken());


const queryClient = new QueryClient();
export default function RootLayout() {

  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <SafeAreaView style={styles.container}>
          <Header />
          <Stack screenOptions={{ headerShown: false }} />
        </SafeAreaView>
        {/* <ReactQueryDevtools /> */}
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
