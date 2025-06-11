import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  View,
  ScrollView,
  Text,
  ActivityIndicator,
} from "react-native";
import { getAccessToken, getHotelList, getHotelSearch } from "../../api";
import { useLocalSearchParams } from "expo-router";
import GoBackHeader from "@/components/GoBackHeader";

export default function HotelSearchResults() {
  const [hotelData, setHotelData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [noData, setNoData] = useState(false);

  const {
    selectedLocationCode,
    rating,
    radius,
    selectedAmenities,
    checkInDate,
    checkOutDate,
    numberOfAdults,
  } = useLocalSearchParams();

  useEffect(() => {
    let accessToken: any = null;
    setIsLoading(true);

    getAccessToken()
      .then((token) => {
        accessToken = token;
        return getHotelList(
          accessToken,
          selectedLocationCode,
          rating,
          radius,
          selectedAmenities
        );
      })
      .then((response) => {
        return getHotelSearch(
          accessToken,
          checkInDate as string,
          checkOutDate as string,
          numberOfAdults,
          response
        );
      })
      .then((response) => {
        if (response.data.length > 0) {
          setHotelData(response.data);
        } else if (response.data.length === 0) {
          setNoData(true);
        }
        setIsLoading(false);
      })
      .catch((error) => {
        setIsError(true);
        setIsLoading(false);
      });
  }, []);

  if (isLoading) {
    return (
      <>
        <GoBackHeader />
        <View style={styles.loadingAndErrorContainer}>
          <Text style={styles.loadingMessage}>Searching for hotels...</Text>
          <ActivityIndicator />
        </View>
      </>
    );
  }

  if (isError) {
    return (
      <>
        <GoBackHeader />
        <View style={styles.loadingAndErrorContainer}>
          <Text style={styles.error}>Failed to fetch hotel data</Text>
        </View>
      </>
    );
  }

  if (noData) {
    return (
      <>
        <GoBackHeader />
        <View style={styles.loadingAndErrorContainer}>
          <Text style={styles.error}>
            No results found for chosen location and dates
          </Text>
        </View>
      </>
    );
  }

  return (
    <View style={styles.container}>
      <GoBackHeader />
      <ScrollView>
        <View>
          {hotelData.map((hotelObj, index) => (
            <View key={index} style={styles.card}>
              <View style={styles.hotelCardHeader}>
                <Text style={styles.label}>{`${hotelObj.hotel.name}`}</Text>
              </View>
              <View style={styles.cardData}>
                <Text
                  style={styles.cardText}
                >{`Location: ${hotelObj.hotel.cityCode}`}</Text>
                <Text
                  style={styles.cardText}
                >{`Check-in: ${hotelObj.offers[0].checkInDate}`}</Text>
                <Text
                  style={styles.cardText}
                >{`Check-out: ${hotelObj.offers[0].checkOutDate}`}</Text>
                <Text
                  style={styles.price}
                >{`Total: ${hotelObj.offers[0].price.total} ${hotelObj.offers[0].price.currency}`}</Text>
              </View>
            </View>
          ))}
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
  error: {
    fontSize: 12,
    fontWeight: "400",
    marginTop: 8,
    color: "red",
  },
  card: {
    backgroundColor: "#ffffff",
    borderRadius: 12,
    padding: 0,
    marginTop: 10,
    marginBottom: 5,
    borderColor: "#ccc",
    borderWidth: 1,
    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowRadius: 4,
    shadowOffset: { width: 0, height: 2 },
    elevation: 2,
  },
  hotelCardHeader: {
    backgroundColor: "#269fc12e",
    borderTopLeftRadius: 12,
    borderTopRightRadius: 12,
  },
  cardData: {
    padding: 16,
  },
  label: {
    fontSize: 16,
    fontWeight: "600",
    margin: 8,
    color: "#2891D9",
  },
  cardText: {
    fontSize: 14,
    color: "#333",
    marginBottom: 4,
  },
  price: {
    fontSize: 16,
    color: "#2891D9",
    fontWeight: "bold",
    marginTop: 10,
  },
});
