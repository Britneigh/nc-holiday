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
  
      {fromDay < today ? (
        <Text style={styles.warningText}>Selected arrival date is in the past!</Text>
      ) : null}

      <Text>Select return date</Text>
      <DateActivitySearch date={toDate} setDate={setToDate} />
 
      {toDate && toDate < fromDate ? (
        <Text style={styles.warningText}>Return date cannot be before arrival date!</Text>
      ) : null}

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

          console.log("ActivitySearch - Lat:", selectedCityLat, "Long:", selectedCityLong);
          console.log("ActivitySearch - Params being pushed:", params);

          router.push({
            pathname: "/activity-results", 
            params: params,
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
    backgroundColor: '#f8f8f8', 
  },
  warningText: {
    color: 'orange',
    fontSize: 14,
    marginTop: 5,
    marginBottom: 10,
    textAlign: 'center',
  },
  
});