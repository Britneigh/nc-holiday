import React, { useState, useEffect } from "react";
import { StyleSheet, Button, Text, ScrollView, View } from "react-native";
import { router } from "expo-router";
import { useTheme } from '../ThemeContext';

import HotelLocationSearch from "@/components/HotelLocationSearch";
import HotelRatingSearch from "@/components/HotelRatingSearch";
import HotelRadiusSearch from "@/components/HotelRadiusSearch";
import HotelAmeneties from "@/components/HotelAmenities";
import DateFlightSearch from "@/components/DateFlightSearch";
import NumberOfAdultsSearch from "@/components/NumberOfAdultsSearch";

export default function hotelSearch() {
  const { mode }: any = useTheme();
  const [selectedLocationCode, setSelectedLocationCode] = useState("");
  const [radius, setRadius] = useState(20);
  const [rating, setRating] = useState([3]);
  const [selectedAmenities, setSelectedAmenities] = useState<string[]>([]);
  const [checkInDate, setCheckInDate] = useState(new Date());
  const [checkOutDate, setCheckOutDate] = useState(new Date());
  const [numberOfAdults, setNumberOfAdults] = useState(1);

  const placeholderData = [{ key: "dummyData" }];

  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const checkInDay = new Date(checkInDate);
  checkInDay.setHours(0, 0, 0, 0);

  return (
    <>
      <ScrollView style={[styles.container, { backgroundColor: mode.background }]}>
        <View style={styles.searchComponent}>
          <Text style={[styles.label, { color: mode.text }]}>Select location</Text>

          <HotelLocationSearch
            selectedLocationCode={selectedLocationCode}
            setSelectedLocationCode={setSelectedLocationCode}
          />

        </View>
        <View style={styles.searchComponent}>
          <Text style={[styles.label, { color: mode.text }]}>Select check-in date</Text>
          <DateFlightSearch date={checkInDate} setDate={setCheckInDate} />
          {checkInDay < today ? (
            <Text style={styles.error}>
              Selected check-in date is in the past!
            </Text>
          ) : null}
        </View>
        <View style={styles.searchComponent}>
          <Text style={[styles.label, { color: mode.text }]}>Select check-out date</Text>
          <DateFlightSearch date={checkOutDate} setDate={setCheckOutDate} />
          {checkOutDate < checkInDate ? (
            <Text style={styles.error}>
              Check-out date is before check-in date!
            </Text>
          ) : null}
        </View>
        <View style={styles.searchComponent}>
          <Text style={[styles.label, { color: mode.text }]}>Select rating</Text>
          <HotelRatingSearch rating={rating} setRating={setRating} />
        </View>
        <View style={styles.searchComponent}>
          <Text style={[styles.label, { color: mode.text }]}>Select number of adult guests</Text>
          <NumberOfAdultsSearch
            numberOfAdults={numberOfAdults}
            setNumberOfAdults={setNumberOfAdults}
          />
        </View>
        <View style={styles.searchComponent}>
          <Text style={[styles.label, { color: mode.text }]}>Select amenities</Text>
          <HotelAmeneties
            selectedAmenities={selectedAmenities}
            setSelectedAmenities={setSelectedAmenities}
          />
        </View>
        <View style={styles.buttonContainer}>
          <Button
            title="Search for hotels"
            disabled={
              !selectedLocationCode || checkInDate > checkOutDate ? true : false
            }
            onPress={() => {
              const params: any = {
                selectedLocationCode,
                rating,
                radius,
                selectedAmenities,
                checkInDate: checkInDate.toISOString().split("T")[0],
                checkOutDate: checkOutDate.toISOString().split("T")[0],
                numberOfAdults,
              };
              router.push({
                pathname: "/hotel-results",
                params,
              });
            }}
          />
        </View>
      </ScrollView>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 16,
    backgroundColor: "#FFF",
  },
  label: {
    fontSize: 16,
    fontWeight: "600",
    marginBottom: 8,
    color: "#333",
  },
  searchComponent: {
    marginTop: 10,
    marginBottom: 15,
  },
  error: {
    fontSize: 12,
    fontWeight: "400",
    margin: 5,
    marginLeft: 20,
    color: "red",
  },
  buttonContainer: {
    marginBottom: 40,
  },
  toggleContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-start",
    padding: 20,
  },
  toggle: {
    marginRight: 20,
  },
});
