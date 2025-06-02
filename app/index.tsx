import { Text, View } from "react-native";
import { Redirect } from "expo-router";
import { AuthContext } from "../context/AuthContext";
import { useContext } from "react";

export default function Index() {
  const { isLoggedIn } = useContext(AuthContext);
  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      {isLoggedIn ? <Redirect href="/home" /> : <Redirect href="/login"/>}
    </View>
  );
}

