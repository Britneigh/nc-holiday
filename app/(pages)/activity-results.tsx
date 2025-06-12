import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  View,
  ScrollView,
  Text,
  ActivityIndicator,
} from "react-native";
import { useQuery } from "@tanstack/react-query";
import { getAccessToken, getToursAndActivities } from "@/api";
import { useLocalSearchParams } from "expo-router";
import ActivityCard from "@/components/ActivityCard";
import AddPlanToTrip from "@/components/AddPlanToTrip";
import { testCityData } from "@/test-data/testCityData";

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
    return (
      <View style={styles.loadingAndErrorContainer}>
        <Text style={styles.loadingMessage}>Searching for activities...</Text>
        <ActivityIndicator />
      </View>
    );
  }

  if (activitiesQuery.isError) {
    return (
      <View style={styles.loadingAndErrorContainer}>
        <Text style={styles.errorText}>
          Error loading activities: {activitiesQuery.error.message}
        </Text>
      </View>
    );
  }

  const activities = activitiesQuery.data?.data ?? [];

  if (activities.length === 0) {
    const cityName = selectedCityCode || "the selected location";
    return (
      <View style={styles.loadingAndErrorContainer}>
        <Text style={styles.noResultsText}>
          No activities found for {cityName}. Try different coordinates or dates!
        </Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <ScrollView>
        <View>
          {activities.map((activity, index) => {
            const match = testCityData.find(
              (obj) =>
                obj.latitude === activity.location?.latitude &&
                obj.longitude === activity.location?.longitude
            );
            const cityName = match ? match.city : "Unknown";

            return (
              <View key={activity.id} style={styles.cardWrapper}>
                <ActivityCard activity={activity} />
                <AddPlanToTrip
                  typeOfPlan="activity"
                  planData={{
                    location: cityName,
                    startTime: '',
                    endTime: '',
                    description: activity.description,
                    cost: typeof activity.price === "object" && activity.price?.amount
                      ? Number(activity.price.amount)
                      : undefined,
                    bookingLink: activity.bookingLink,
                    isBooked: false,
                    pictures: ''
                  }}
                />
              </View>
            );
          })}
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
    flex: 1,
    backgroundColor: "#FFF",
  },
  cardWrapper: {
    marginBottom: 12,
  },
  loadingAndErrorContainer: {
    padding: 16,
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#ffffff",
  },
  loadingMessage: {
    paddingBottom: 30,
  },
  errorText: {
    fontSize: 12,
    fontWeight: "400",
    marginTop: 8,
    color: "red",
  },
  noResultsText: {
    padding: 20,
    textAlign: "center",
    fontSize: 16,
    color: "#666",
  },
});
