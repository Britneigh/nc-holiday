import { View } from "react-native";
import { Redirect } from "expo-router";
import { useAuth } from "../context/UserContext";

export default function Index() {
  const {currentUser} = useAuth();
  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      {currentUser === null ? <Redirect href="/login" /> : <Redirect href="/home" />}
    </View>
  );
}

