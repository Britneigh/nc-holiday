import React, { useState, useEffect } from "react";
import { StyleSheet, View, ScrollView, Text, Image } from "react-native";
import { useQuery } from "@tanstack/react-query";
import {
  getAccessToken,
  getToursAndActivities,
} from "/home/garym350/NORTHCODERS/NC_TRAVEL_PROJECT/nc-holiday/api.js";
import { useLocalSearchParams } from "expo-router";

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
  const { selectedCityCode, fromDate, toDate, latitude, longitude } =
    useLocalSearchParams();

  const parseDateParam = (
    dateParam: string | string[] | undefined
  ): Date | undefined => {
    if (typeof dateParam === "string" && dateParam.length > 0) {
      return new Date(dateParam);
    }
    if (Array.isArray(dateParam) && dateParam.length > 0) {
      return new Date(dateParam[0]);
    }
    return undefined;
  };

  const parseNumberParam = (
    numParam: string | string[] | undefined
  ): number | undefined => {
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

  const isQueryEnabled =
    typeof parsedLat === "number" && typeof parsedLong === "number";

  const [searchAttempted, setSearchAttempted] = useState(false);

  useEffect(() => {
    if (isQueryEnabled && !searchAttempted) {
      setSearchAttempted(true);
    }
  }, [isQueryEnabled, searchAttempted]);

  const activitiesQuery = useQuery<
    { data: Activity[] },
    Error
  >({
    queryKey: [
      "activities",
      selectedCityCode,
      parsedFromDate?.toISOString(),
      parsedToDate?.toISOString(),
      parsedLat,
      parsedLong,
      paramsForApiCall.radius,
    ],
    queryFn: () => {
      return getAccessToken()
        .then((token) => {
          return getToursAndActivities(token, parsedLat!, parsedLong!, 10);
        })
        .catch((error) => {
          return Promise.reject(error);
        });
    },
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
      {activities.map((activity, index) => (
        <View key={activity.id ?? index} style={styles.card}>
          {activity.images && activity.images.length > 0 && (
            <Image
              source={{ uri: activity.images[0] }}
              style={styles.image}
              resizeMode="cover"
            />
          )}
          <Text style={styles.activityName}>{activity.name}</Text>
          {activity.description && (
            <Text style={styles.description} numberOfLines={3}>
              {activity.description}
            </Text>
          )}
          {activity.category && (
            <Text style={styles.category}>Category: {activity.category}</Text>
          )}
          {activity.startTimes && activity.startTimes.length > 0 && (
            <Text style={styles.startTimes}>
              Start Times: {activity.startTimes.join(", ")}
            </Text>
          )}
          {typeof activity.rating === "number" && (
            <Text style={styles.rating}>
              Rating: {activity.rating.toFixed(1)}
            </Text>
          )}
          {activity.price && (
            <Text style={styles.price}>
              Price:{" "}
              {typeof activity.price === "object"
                ? `${activity.price.amount} ${activity.price.currency}`
                : activity.price}
            </Text>
          )}
        </View>
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 12,
    backgroundColor: "#eef6f9", // light blue background
  },
  card: {
    marginBottom: 10,
    padding: 12,
    borderWidth: 1,
    borderColor: "#a1c4d7",
    borderRadius: 8,
    backgroundColor: "#ffffff",
    shadowColor: "#20435c",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.15,
    shadowRadius: 2,
    elevation: 3,
  },
  image: {
    width: "100%",
    height: 120,
    borderRadius: 8,
    marginBottom: 10,
  },
  activityName: {
    fontSize: 17,
    fontWeight: "700",
    marginBottom: 6,
    color: "#1b3a57", // dark blue
  },
  description: {
    fontSize: 14,
    color: "#3a3a3a",
    marginBottom: 6,
  },
  category: {
    fontSize: 13,
    color: "#5a8fbd", // medium blue
    marginBottom: 4,
  },
  startTimes: {
    fontSize: 13,
    color: "#5a8fbd",
    marginBottom: 4,
  },
  rating: {
    fontSize: 13,
    color: "#2a9d8f", // teal green
    marginBottom: 4,
  },
  price: {
    fontSize: 14,
    fontWeight: "600",
    color: "#e76f51", // coral orange
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
