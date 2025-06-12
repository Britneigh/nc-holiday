import React, { useState, useEffect } from "react";
import { StyleSheet, Text, Button, ScrollView, View } from "react-native";
import { router } from "expo-router";
import { testCityData } from "@/test-data/testCityData";
import ActivityCitySearch from "@/components/ActivityCitySearch";
import DateActivitySearch from "@/components/DateActivitySearch";
import { useQueryClient } from "@tanstack/react-query";
import { useIsFocused } from "@react-navigation/native";
import { useTheme } from '../ThemeContext';

export default function ActivitySearch() {
  const { mode }: any = useTheme();
  const [citySearchQuery, setCitySearchQuery] = useState("");
  const [selectedCityCode, setSelectedCityCode] = useState("");

  const [selectedCityLong, setSelectedCityLong] = useState<number | null>(null);
  const [selectedCityLat, setSelectedCityLat] = useState<number | null>(null);
  const [radius, setRadius] = useState(5);

  const [fromDate, setFromDate] = useState(new Date());

  const [toDate, setToDate] = useState(new Date());

  const queryClient = useQueryClient();
  const isFocused = useIsFocused();


  useEffect(() => {
    if (isFocused) {

      queryClient.removeQueries({ queryKey: ["activities"] });
    }
  }, [isFocused, queryClient]);


  useEffect(() => {
    setCitySearchQuery("");
    setSelectedCityCode("");

  }, []);


  const today = new Date();
  today.setHours(0, 0, 0, 0);


  const fromDay = new Date(fromDate);
  fromDay.setHours(0, 0, 0, 0);


  return (
    <ScrollView contentContainerStyle={[styles.container, { backgroundColor: mode.background }]}>

      <Text style={[styles.label, { color: mode.text }]}>Where are you visiting?</Text>

      <ActivityCitySearch
        cityData={testCityData}
        citySearchQuery={citySearchQuery}
        selectedCityCode={selectedCityCode}
        setCitySearchQuery={setCitySearchQuery}
        setSelectedCityCode={setSelectedCityCode}
        setSelectedCityLat={setSelectedCityLat}
        setSelectedCityLong={setSelectedCityLong}
      />

      <View style={styles.searchComponent}>
        <Text style={[styles.label, { color: mode.text }]}>Select date range (start)</Text>
        <DateActivitySearch date={fromDate} setDate={setFromDate} />
      </View>


      {fromDay < today ? (
        <Text style={styles.error}>Selected arrival date is in the past!</Text>
      ) : null}

      <View style={styles.searchComponent}>
        <Text style={[styles.label, { color: mode.text }]}>Select date range (end)</Text>
        <DateActivitySearch date={toDate} setDate={setToDate} />
      </View>

      {toDate && toDate < fromDate ? (
        <Text style={styles.error}>Return date cannot be before arrival date!</Text>
      ) : null}

      <View style={styles.buttonContainer}>
        <Button
          title="Search for activities"

          disabled={
            (toDate && toDate < fromDate) ||
            !selectedCityCode ||
            selectedCityLat === null ||
            selectedCityLong === null
          }
          onPress={() => {

            const params: Record<string, string | number | undefined> = {
              selectedCityCode,

              fromDate: fromDate.toISOString().split("T")[0],
              toDate: toDate.toISOString().split("T")[0],

              latitude: selectedCityLat !== null ? selectedCityLat : undefined,
              longitude: selectedCityLong !== null ? selectedCityLong : undefined,
              radius: radius,
            };

            router.push({
              pathname: "/activity-results",
              params: params,
            });
          }}
        />

      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 16,
    backgroundColor: '#FFF'
  },
  searchComponent: {
    marginTop: 10,
    marginBottom: 15
  },
  label: {
    fontSize: 16,
    fontWeight: '600',
    marginTop: 10,
    marginBottom: 8,
    color: '#333',
  },
  error: {
    fontSize: 12,
    fontWeight: '400',
    margin: 5,
    marginLeft: 20,
    color: 'red',
  },
  buttonContainer: {
    marginBottom: 40
  },
  input: {
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 8,
    marginTop: 5,
    padding: 10,
    fontSize: 16,
    backgroundColor: '#fff',
  },

});