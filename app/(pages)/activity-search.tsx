import React from "react";
import { StyleSheet, View, ScrollView, Text } from "react-native";
import { useQuery } from "@tanstack/react-query";
import { getAccessToken, getToursAndActivities } from "../../api"
import { useLocalSearchParams } from "expo-router";

export default function ActivitySearchResults() {
  const { selectedCityCode, fromDate, toDate, lat, long } =
  useLocalSearchParams();
    useLocalSearchParams();

  const activitiesQuery = useQuery({
    queryKey: ["activities", selectedCityCode, fromDate, toDate, lat, long],
    queryFn: () => {
      return getAccessToken()
        .then((token) => {
          console.log("TOKEN RECEIVED");
          return getToursAndActivities(
            {
              cityCode: selectedCityCode as string,
              fromDate: fromDate as string,
              toDate: toDate as string | undefined,
              latitude: lat as string | undefined,
              longitude: long as string | undefined,
            },
            token
          );
        })
        .catch((error) => {
          console.log("Error in queryFn:", error);
          throw error; // important: rethrow so React Query knows it's an error
        });
    },
    enabled: !!selectedCityCode && !!fromDate,
  });

  if (activitiesQuery.isLoading) {
    return <Text>Loading...</Text>;
  }

  if (activitiesQuery.isError) {
    return <Text>Error: {(activitiesQuery.error as Error).message}</Text>;
  }

  return (
    <ScrollView style={styles.container}>
      {activitiesQuery.data?.map((activity: any, index: number) => (
        <View key={index} style={styles.card}>
          <Text>{activity.name}</Text>
          {/* Render other activity details here */}
        </View>
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
  },
  card: {
    marginBottom: 12,
    padding: 12,
    borderWidth: 1,
    borderColor: "black",
    borderRadius: 8,
  },
});
