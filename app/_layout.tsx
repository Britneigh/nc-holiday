import { Stack } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import { StyleSheet, Text, View, Pressable } from 'react-native';
import { AuthProvider } from "@/context/UserContext";
import { router } from 'expo-router';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { getAuth } from 'firebase/auth';

console.log('Current user token:', await getAuth().currentUser?.getIdToken());

const queryClient = new QueryClient();
export default function RootLayout() {

  return (
    <QueryClientProvider client={queryClient}>
    <AuthProvider>
      <SafeAreaView style={styles.container}>
        <View style={styles.box}>
          <Text>NC Holiday</Text>
          <Pressable onPress={() => router.push('/settings')}><Text>Settings</Text></Pressable>
        </View>
        <Stack screenOptions={{ headerShown: true }} />
      </SafeAreaView>
      <ReactQueryDevtools />
    </AuthProvider>
    </QueryClientProvider>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  box: {
    height: 50,
    backgroundColor: 'beige',
    justifyContent: 'center',
    alignItems: 'center'
  }
});
