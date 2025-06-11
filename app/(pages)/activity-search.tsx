import React, { useState, useEffect } from "react";
import { StyleSheet, Text, Button, ScrollView } from "react-native";
import { router } from "expo-router"; // Import router from expo-router
import { testCityData } from "@/test-data/testCityData"; // Assuming this path is correct
import ActivityCitySearch from "@/components/ActivityCitySearch"; // Assuming this path is correct
import DateActivitySearch from "@/components/DateActivitySearch"; // Assuming this path is correct
import { useQueryClient } from "@tanstack/react-query";
import { useIsFocused } from "@react-navigation/native"; // Assuming useIsFocused comes from react-navigation/native

export default function ActivitySearch() {
  const [citySearchQuery, setCitySearchQuery] = useState("");
  const [selectedCityCode, setSelectedCityCode] = useState("");
  // These states are correctly typed as number | null
  const [selectedCityLong, setSelectedCityLong] = useState<number | null>(null);
  const [selectedCityLat, setSelectedCityLat] = useState<number | null>(null);
  const [radius, setRadius] = useState(5); // Radius usually passed as a number

  // Initialize dates to current date as they are mandatory for search
  const [fromDate, setFromDate] = useState(new Date());
  // setToDate can be null initially, but if used in API call, it must be handled.
  // For the purpose of this example, it's also initialized to current date for consistency
  const [toDate, setToDate] = useState(new Date());

  const queryClient = useQueryClient();
  const isFocused = useIsFocused();

  // Effect to remove cached activities when the screen comes into focus
  useEffect(() => {
    if (isFocused) {
      // Correct syntax for @tanstack/react-query v4/v5
      queryClient.removeQueries({ queryKey: ["activities"] });
    }
  }, [isFocused, queryClient]); // Add queryClient to dependencies

  // Effect to reset search fields on initial mount (or re-mount)
  useEffect(() => {
    setCitySearchQuery("");
    setSelectedCityCode("");
    // We don't reset lat/long here, as they are set by ActivityCitySearch
    // which usually happens when a city is selected.
    // If you want to clear them on initial load, set them to null here.
    // setSelectedCityLat(null);
    // setSelectedCityLong(null);
  }, []); // Empty dependency array ensures this runs only once on mount

  // Calculate today's date for comparison
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  // Prepare fromDay for comparison (copy fromDate to avoid modifying state directly)
  const fromDay = new Date(fromDate);
  fromDay.setHours(0, 0, 0, 0);

  // --- Render Method ---
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text>Where are you heading to?</Text>
      <ActivityCitySearch
        cityData={testCityData}
        citySearchQuery={citySearchQuery}
        selectedCityCode={selectedCityCode}
        setCitySearchQuery={setCitySearchQuery}
        setSelectedCityCode={setSelectedCityCode}
        setSelectedCityLat={setSelectedCityLat}
        setSelectedCityLong={setSelectedCityLong}
      />

      <Text>Select arrival date</Text>
      <DateActivitySearch date={fromDate} setDate={setFromDate} />
      {/* Check if fromDate is in the past */}
      {fromDay < today ? (
        <Text style={styles.warningText}>Selected arrival date is in the past!</Text>
      ) : null}

      <Text>Select return date</Text>
      <DateActivitySearch date={toDate} setDate={setToDate} />
      {/* Check if toDate is before fromDate */}
      {toDate && toDate < fromDate ? (
        <Text style={styles.warningText}>Return date cannot be before arrival date!</Text>
      ) : null}

      <Button
        title="Search for activities"
        // Disable button if return date is before from date, or if essential params are missing
        disabled={
          (toDate && toDate < fromDate) ||
          !selectedCityCode || // Disable if no city code is selected
          selectedCityLat === null || // Disable if latitude is not set
          selectedCityLong === null   // Disable if longitude is not set
        }
        onPress={() => {
          // Construct parameters for expo-router.
          // IMPORTANT: Convert null to undefined for optional number parameters
          // so expo-router doesn't include "null" in the URL string.
          const params: Record<string, string | number | undefined> = {
            selectedCityCode,
            // Convert Date objects to YYYY-MM-DD strings for URL params
            fromDate: fromDate.toISOString().split("T")[0],
            toDate: toDate.toISOString().split("T")[0],
            // Pass actual numbers or undefined (if null)
            latitude: selectedCityLat !== null ? selectedCityLat : undefined,
            longitude: selectedCityLong !== null ? selectedCityLong : undefined,
            radius: radius, // Pass radius as a number
          };

          console.log("ActivitySearch - Lat:", selectedCityLat, "Long:", selectedCityLong);
          console.log("ActivitySearch - Params being pushed:", params);

          router.push({
            pathname: "/activity-results", // Ensure this path matches your file system routing
            params: params,
          });
        }}
      />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1, // Allows content to grow and scroll if needed
    padding: 16,
    backgroundColor: '#f8f8f8', // Light background for search screen
  },
  warningText: {
    color: 'orange',
    fontSize: 14,
    marginTop: 5,
    marginBottom: 10,
    textAlign: 'center',
  },
  // Add any other styles you might need for your components
});