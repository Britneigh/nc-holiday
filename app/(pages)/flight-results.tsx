import React, { useState } from 'react';
import { StyleSheet, View, ScrollView, Text, Button } from 'react-native';
import { useQuery } from '@tanstack/react-query';
import { getAccessToken, getFlightSearchWithDestination } from '../../api';
import { useLocalSearchParams } from 'expo-router';


export default function FlightSearchResults(){
const { selectedDepartureCode, selectedArrivalCode, departureDate, numberOfAdults, returnDate } = useLocalSearchParams();


const adults = Number(numberOfAdults);

  
 const flightsQuery = useQuery({
    queryKey: ['flights', selectedDepartureCode, selectedArrivalCode, departureDate, numberOfAdults, returnDate],
    queryFn: () =>
      getAccessToken().then((token) =>
        getFlightSearchWithDestination(
          token,
          selectedDepartureCode as string,
          selectedArrivalCode as string,
          departureDate as string,
          adults,
          returnDate ? (returnDate as string) : undefined,
        )
      ),
    enabled: !!selectedDepartureCode && !!selectedArrivalCode,
  });

    if (flightsQuery.isLoading) {
    return <Text>Loading</Text>
    };

    if (flightsQuery.isError) {
    const error =flightsQuery.data?.message || 'Failed to fetch flights.';
        return <Text>{error}</Text>;
    };

    return (
    <ScrollView>
    {flightsQuery.data?.data?.map((flight: any, index: number) => (
    <View key={index} style={styles.card}>
    <Text>{`Price: ${flight.price.grandTotal} ${flight.price.currency}`}</Text>
        <Text>{`Seats available: ${flight.numberOfBookableSeats}`}</Text>
        <Text>{`From: ${flight.itineraries[0].segments[0].departure.iataCode}`}</Text>
         <Text>{`Departure time: ${flight.itineraries[0].segments[0].departure.at}`}</Text>
        <Text>{`To: ${flight.itineraries[0].segments[flight.itineraries[0].segments.length -1].arrival.iataCode}`}</Text>
        <Text>{`Arrival time: ${flight.itineraries[0].segments[flight.itineraries[0].segments.length -1].arrival.at}`}</Text>
    </View>
    ))}
    </ScrollView>
    )
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
  },
  card: {
    marginBottom: 12,
    padding: 12,
    borderWidth: 1,
    borderColor: 'black',
    borderRadius: 8,
  },
});

