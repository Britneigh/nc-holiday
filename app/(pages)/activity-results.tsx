import React, { useState, useEffect } from "react";
import { StyleSheet, ScrollView, Text } from "react-native";
import { useQuery } from "@tanstack/react-query";
import { getAccessToken, getToursAndActivities } from "@/api"; // update path as needed
import { useLocalSearchParams, useRouter } from "expo-router";
import ActivityCard from "@/components/ActivityCard"; // update path if needed

type Activity = {
  id: string;
  name: string;
  description?: string;
  duration?: string;
  location?: {
    latitude: number;
    longitude: number;
    cityCode: string;
  };
  price?: { amount: number; currency: string } | string;
  category?: string;
  rating?: number;
  images?: string[];
  bookingLink?: string;
  startTimes?: string[];
};

export default function ActivitySearchResults() {
  const router = useRouter();
  const { selectedCityCode, fromDate, toDate, latitude, longitude } = useLocalSearchParams();

  const parseDateParam = (dateParam: string | string[] | undefined): Date | undefined => {
    if (typeof dateParam === "string" && dateParam.length > 0) {
      return new Date(dateParam);
    }
    if (Array.isArray(dateParam) && dateParam.length > 0) {
      return new Date(dateParam[0]);
    }
    return undefined;
  };

  const parseNumberParam = (numParam: string | string[] | undefined): number | undefined => {
    let numString: string | undefined;
    if (typeof numParam === "string") {
      numString = numParam.trim();
    } else if (Array.isArray(numParam) && numParam.length > 0) {
      numString = numParam[0].trim();
    } else {
      return undefined;
    }

    const floatValue = parseFloat(numString);
    return !isNaN(floatValue) ? floatValue : undefined;
  };

  const parsedFromDate = parseDateParam(fromDate);
  const parsedToDate = parseDateParam(toDate);
  const parsedLat = parseNumberParam(latitude);
  const parsedLong = parseNumberParam(longitude);

  const paramsForApiCall = {
    latitude: parsedLat,
    longitude: parsedLong,
    radius: 10,
  };

  const isQueryEnabled = typeof parsedLat === "number" && typeof parsedLong === "number";

  const [searchAttempted, setSearchAttempted] = useState(false);

  useEffect(() => {
    if (isQueryEnabled && !searchAttempted) {
      setSearchAttempted(true);
    }
  }, [isQueryEnabled, searchAttempted]);

  const activitiesQuery = useQuery<{ data: Activity[] }, Error>({
    queryKey: [
      "activities",
      selectedCityCode,
      parsedFromDate?.toISOString(),
      parsedToDate?.toISOString(),
      parsedLat,
      parsedLong,
      paramsForApiCall.radius,
    ],
    queryFn: () =>
      getAccessToken().then((token) =>
        getToursAndActivities(token, parsedLat!, parsedLong!, 10)
      ),
    enabled: isQueryEnabled,
    retry: 1,
    staleTime: 5 * 60 * 1000,
  });

  if (activitiesQuery.isLoading || !searchAttempted) {
    return <Text style={styles.loadingText}>Loading activities...</Text>;
  }

  if (activitiesQuery.isError) {
    return (
      <Text style={styles.errorText}>
        Error loading activities: {activitiesQuery.error.message}
      </Text>
    );
  }

  const activities = activitiesQuery.data?.data ?? [];

  if (activities.length === 0) {
    const cityName = selectedCityCode || "the selected location";
    return (
      <Text style={styles.noResultsText}>
        No activities found for {cityName}. Try different coordinates or dates!
      </Text>
    );
  }

  return (
    <ScrollView style={styles.container}>
      {activities.map((activity) => (
        <ActivityCard
          key={activity.id}
          activity={activity}
          onPress={() => router.push(`/activity-info?id=${activity.id}`)}
        />
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 12,
    backgroundColor: "#eef6f9",
  },
  loadingText: {
    padding: 20,
    textAlign: "center",
    fontSize: 16,
    color: "#3a86ff",
  },
  errorText: {
    color: "#d62828",
    padding: 20,
    textAlign: "center",
    fontSize: 16,
    fontWeight: "bold",
  },
  noResultsText: {
    padding: 20,
    textAlign: "center",
    fontSize: 16,
    color: "#666",
  },
});
