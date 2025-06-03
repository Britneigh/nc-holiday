import { Text, View } from "react-native";
import { Redirect } from "expo-router";
import { useAuth } from "../context/UserContext";

export default function Index() {
  const { currentUser, isLoading } = useAuth();

  if (isLoading) {
    return (
      <View
        style={{
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Text>Loading...</Text>
      </View>
    );
  }

  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      {currentUser ? <Redirect href="/home" /> : <Redirect href="/login" />}
    </View>
  );
}

