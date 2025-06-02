import { Stack } from "expo-router";
import {SafeAreaView} from "react-native-safe-area-context";
import { StyleSheet, Text, View} from 'react-native';
import { AuthContext } from "../context/AuthContext";
import { useContext, useState } from "react";

export default function RootLayout() {
    const [isLoggedIn, setIsLoggedIn] = useState(true);

  return (
    <AuthContext.Provider value={{isLoggedIn}}>  
    <SafeAreaView style={styles.container}>
      <View style={styles.box}>
        <Text>NC Holiday</Text>
      </View>
  <Stack screenOptions={{ headerShown: true }} />
  </SafeAreaView>
  </AuthContext.Provider>
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
