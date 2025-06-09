import React, { useState, useEffect } from "react";
import { StyleSheet, Text, ScrollView } from "react-native";
import { router } from "expo-router";
import { testCityData } from "@/test-data/testCityData";
import ActivityCitySearch from "@/components/ActivityCitySearch";
import { useQueryClient } from "@tanstack/react-query";
import { useIsFocused } from "@react-navigation/native";

export default function ActivitySearch() {
  const [citySearchQuery, setCitySearchQuery] = useState("");
  const [selectedCityCode, setSelectedCityCode] = useState("");

  const [cityLat, setCityLat] = useState<number | null>(null);
  const [cityLong, setCityLong] = useState<number | null>(null);

  const [fromDate, setFromDate] = useState(new Date());
  const [toDate, setToDate] = useState<Date | null>(null);
  // const [numberOfAdults, setNumberOfAdults] = useState(1);

  const queryClient = useQueryClient();
  const isFocused = useIsFocused();

  useEffect(() => {
    if (isFocused) {
      queryClient.removeQueries("activities");
    }
  }, [isFocused]);

  useEffect(() => {
    setCitySearchQuery("");
    setSelectedCityCode("");
    setCityLat(null);
    setCityLong(null);
    // setFromDate(null);
    // setToDate(null);
  }, []);

  const placeholderData = [{ key: "dummyData" }];

  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const arrivalDay = new Date(fromDate);
  arrivalDay.setHours(0, 0, 0, 0);

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text>Where are you heading to?</Text>
      <ActivityCitySearch
        cityData={testCityData}
        citySearchQuery={citySearchQuery}
        selectedCityCode={selectedCityCode}
        setCitySearchQuery={setCitySearchQuery}
        setSelectedCityCode={setSelectedCityCode}
        cityLat={cityLat}
        setCityLat={setCityLat}
        cityLong={cityLong}
        setCityLong={setCityLong}
      />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 16,
  },
});
