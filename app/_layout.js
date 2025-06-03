import { Stack } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import { StyleSheet, Text, View } from 'react-native';
import { useState } from "react";
import { AuthProvider } from "@/context/UserContext";
export default function RootLayout() {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    return (<AuthProvider>  
      <SafeAreaView style={styles.container}>
        <View style={styles.box}>
          <Text>NC Holiday</Text>
        </View>
        <Stack screenOptions={{ headerShown: true }}/>
      </SafeAreaView>
    </AuthProvider>);
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
