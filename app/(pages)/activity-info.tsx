import React, { useEffect, useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import { useLocalSearchParams } from "expo-router";
import { Trip } from "@/firestoreService/types";
import { getTripById } from "@/firestoreService/trip/getTripById";

export default function ActivityInfo() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [trip, setTrip] = useState<Trip | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!id) {
      setError("No activity ID provided");
      return;
    }

    setIsLoading(true);
    setError(null);

    getTripById(id)
      .then((fetchedTrip) => {
        setTrip(fetchedTrip);
      })
      .catch(() => {
        setError("Trip not found");
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, [id]);

  // Helper to safely parse Firestore Timestamp or fallback to Date
  const parseDate = (dateField: any): Date | null => {
    if (!dateField) return null;
    if (typeof dateField.toDate === "function") {
      return dateField.toDate();
    }
    const parsed = new Date(dateField);
    return isNaN(parsed.getTime()) ? null : parsed;
  };

  const startDate = trip ? parseDate(trip.startDate) : null;
  const endDate = trip ? parseDate(trip.endDate) : null;

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Activity Info</Text>

      {isLoading && <Text>Loading trip...</Text>}
      {error && <Text style={styles.error}>{error}</Text>}
      {!isLoading && !trip && !error && <Text>No trip data available</Text>}

      {trip && (
        <>
          <Text style={styles.title}>{trip.tripName}</Text>
          <Text style={styles.text}>Trip Location: {trip.location ?? "N/A"}</Text>

          <Text style={styles.text}>
            Start Date: {startDate ? startDate.toLocaleDateString() : "N/A"}
          </Text>
          <Text style={styles.text}>
            End Date: {endDate ? endDate.toLocaleDateString() : "N/A"}
          </Text>

          <Text style={styles.sectionTitle}>Saved Flights:</Text>
          {/* Add rendering for saved flights */}

          <Text style={styles.sectionTitle}>Saved Hotels:</Text>
          {/* Add rendering for saved hotels */}
        </>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    margin: 30,
    alignItems: "center",
    textAlign: "center",
    gap: 10,
  },
  title: {
    fontWeight: "600",
    fontSize: 20,
    marginBottom: 12,
  },
  text: {
    fontSize: 16,
  },
  sectionTitle: {
    marginTop: 30,
    fontWeight: "700",
    fontSize: 18,
  },
  error: {
    color: "red",
    marginBottom: 10,
  },
});
