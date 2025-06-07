import React from 'react';
import { StyleSheet, View, ScrollView, Text, Button } from 'react-native';
import { useQuery } from '@tanstack/react-query';
import { getAccessToken, getFlightSearchWithDestination } from '../../api';
import { useLocalSearchParams } from 'expo-router';


export default function FlightSearchResults(){
const { selectedDepartureCode, selectedArrivalCode, departureDate, numberOfAdults, returnDate } = useLocalSearchParams();


const adults = Number(numberOfAdults);

              
function getFlightDuration(departureTime: string, arrivalTime: string): string {
  const departure = new Date(departureTime);
  const arrival = new Date(arrivalTime);

  const diffMs = arrival.getTime() - departure.getTime();

  const diffMins = Math.floor(diffMs / (1000 * 60));
  const hours = Math.floor(diffMins / 60);
  const minutes = diffMins % 60;

  const hourText = hours === 1 ? '1 hr' : hours > 1 ? `${hours} hrs` : '';
  const minuteText = minutes === 1 ? '1 min' : minutes > 1 ? `${minutes} mins` : '';

  return [hourText, minuteText].filter(Boolean).join(' ');
}

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

    const airlines = flightsQuery.data?.dictionaries?.carriers || {};
  
    return (
    <ScrollView>
    {flightsQuery.data?.data?.map((flight: any, index: number) => {
        let carrierCode = flight.validatingAirlineCodes?.[0];
        let airline = airlines[carrierCode] || carrierCode;
        const departureDateTime = new Date(flight.itineraries[0].segments[0].departure.at);
        const formattedDepartureDate = departureDateTime.toLocaleDateString('en-GB', {
          day: 'numeric',
          month: 'long',
        });
        const formattedDepartureTime = flight.itineraries[0].segments[0].departure.at.slice(11, -3);
        const arrivalDateTime = new Date(flight.itineraries[0].segments[0].arrival.at);

        const formattedArrivalDate = arrivalDateTime.toLocaleDateString('en-GB', {
          day: 'numeric',
          month: 'long',
        });
        const formattedArrivalTime = flight.itineraries[0].segments[0].arrival.at.slice(11, -3);

        const departure = flight.itineraries[0].segments[0].departure.at;
        const arrival = flight.itineraries[0].segments[0].arrival.at;

        const duration = getFlightDuration(departure, arrival);

      
      return (
      <View key={index} style={styles.card}>
        <Text>{`Price: ${flight.price.grandTotal} ${flight.price.currency}`}</Text>
        <Text>{`Seats available: ${flight.numberOfBookableSeats}`}</Text>
        <Text>{`Departure time: ${formattedDepartureTime}, ${formattedDepartureDate}`}</Text>
        <Text>{`Arrival time: ${formattedArrivalTime}, ${formattedArrivalDate}`}</Text>
        <Text>{`Total duration: ${duration}`}</Text>
        <Text>{`From: ${flight.itineraries[0].segments[0].departure.iataCode}`}</Text>
        <Text>{`To: ${flight.itineraries[0].segments[flight.itineraries[0].segments.length -1].arrival.iataCode}`}</Text>
        <Text>{`Airline: ${airline}`}</Text>
      </View>
    )
    })}
    </ScrollView>
    );
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

