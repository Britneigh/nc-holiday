import React, { useState, useEffect } from "react";
import { StyleSheet, Text, Button, ScrollView } from "react-native";
import { router } from "expo-router";
import { testCityData } from "@/test-data/testCityData";
import ActivityCitySearch from "@/components/ActivityCitySearch";
import DateActivitySearch from "@/components/DateActivitySearch";
import { useQueryClient } from "@tanstack/react-query";
import { useIsFocused } from "@react-navigation/native";

export default function ActivitySearch() {
  const [citySearchQuery, setCitySearchQuery] = useState("");
  const [selectedCityCode, setSelectedCityCode] = useState("");
  const [selectedCityLong, setSelectedCityLong] = useState()
  const [selectedCityLat, setSelectedCityLat] = useState()

  const [fromDate, setFromDate] = useState(new Date());
  const [toDate, setToDate] = useState<Date | null>(null);

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
    //   setFromDate(null);
    //   setToDate(null);
  }, []);

  const placeholderData = [{ key: "dummyData" }];

  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const fromDay = new Date(fromDate);
  fromDay.setHours(0, 0, 0, 0);
  const toDay = new Date(fromDate);
  toDay.setHours(0, 0, 0, 0);

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text>Where are you heading to?</Text>
      <ActivityCitySearch
        cityData={testCityData}
        citySearchQuery={citySearchQuery}
        selectedCityCode={selectedCityCode}
        setCitySearchQuery={setCitySearchQuery}
        setSelectedCityCode={setSelectedCityCode}
      />

      <Text>Select arrival date</Text>
      <DateActivitySearch date={fromDate} setDate={setFromDate} />
      {fromDay < today ? (
        <Text>Selected departure date is in the past!</Text>
      ) : null}
      <Text>Select return date</Text>
      <DateActivitySearch date={fromDate} setDate={setFromDate} />
      {toDate && toDate < fromDate ? (
        <Text>From date is before to date!</Text>
      ) : null}

      <Button
        title="Search for activities"
        disabled={toDate && toDate < fromDate ? true : false}
        onPress={() => {
          const params: any = {
            selectedCityCode,
            fromDate: fromDate.toISOString().split("T")[0],
          };
          if (toDate) {
            params.toDate = toDate.toISOString().split("T")[0];
          }
          router.push({
            pathname: "/activity-results",
            params,
          });
        }}
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
