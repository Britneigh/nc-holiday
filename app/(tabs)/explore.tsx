import React from "react";
import { StyleSheet, Text, View, Button } from "react-native";
import { router } from "expo-router";

export default function Explore() {
  return (
    <View style={styles.container}>
      <Text>Explore</Text>
      <Button
        title="Search Flights"
        onPress={() => router.navigate("/flight-search")}
      />
      <Button
        title="Search Hotels"
        onPress={() => router.navigate("/hotel-search")}
      />
      <Button
        title="Search Activities here"
        onPress={() => router.navigate("/activity-search")}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
