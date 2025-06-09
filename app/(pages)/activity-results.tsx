import React, { useState, useEffect } from 'react';
import { StyleSheet, View, ScrollView, Text, Button } from 'react-native';
import { useQuery } from '@tanstack/react-query';
import { getAccessToken, getToursAndActivities } from '../../api';
import { useLocalSearchParams } from 'expo-router';
import { addFlight } from '@/firestoreService/flight/addFlight';
import { Picker } from '@react-native-picker/picker';
import { getTrips } from '@/firestoreService/trip/getTrips';
import { Trip } from '../../firestoreService/types';



export default function ActivitySearchResults(){
const { selectedCityCode, fromDate, toDate } = useLocalSearchParams();
const [isLoading, setIsLoading] = useState<boolean>(false);
// const [trips, setTrips] = useState<Trip[]>([]);
// const [selectedTripId, setSelectedTripId] = useState<string | null>(null);


//  useEffect(() => {
//   getTrips().then((data) => {
//     if (data) setTrips(data);
//   });
// }, []);

// function getFlightDuration(departureTime: string, arrivalTime: string): string {
//   const departure = new Date(departureTime);
//   const arrival = new Date(arrivalTime);

//   const diffMs = arrival.getTime() - departure.getTime();

//   const diffMins = Math.floor(diffMs / (1000 * 60));
//   const hours = Math.floor(diffMins / 60);
//   const minutes = diffMins % 60;

//   const hourText = hours === 1 ? '1 hr' : hours > 1 ? `${hours} hrs` : '';
//   const minuteText = minutes === 1 ? '1 min' : minutes > 1 ? `${minutes} mins` : '';

//   return [hourText, minuteText].filter(Boolean).join(' ');
// }




 const activitiesQuery = useQuery({
    queryKey: ['activities', selectedCityCode, fromDate, toDate],
    queryFn: () =>
      getAccessToken().then((token) =>
        getToursAndActivities(
          token,
          selectedCityCode as string,
          fromDate as string,
          toDate ? (toDate as string) : undefined,
        )
      ),
    // enabled: !!selectedCityCode && !!selectedArrivalCode,
  });

    if (activitiesQuery.isLoading) {
    return <Text>Loading</Text>
    };

    if (activitiesQuery.isError) {
    const error =activitiesQuery.data?.message || 'Failed to fetch flights.';
        return <Text>{error}</Text>;
    };

    const airlines = activitiesQuery.data?.dictionaries?.carriers || {};
  
    return (
    <ScrollView>
    {activitiesQuery.data?.data?.map((flight: any, index: number) => {
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

        {/*function saveFlight(flight: any){
            if (!selectedTripId) {
            alert("Please select a trip first.");
            return;
          }

          const flightDetails = {
            price: flight.price.grandTotal,
            seatsAvailable: flight.numberOfBookableSeats,
            departureDate: formattedDepartureDate,
            arrivalDate: formattedArrivalDate,
            departureTime: formattedDepartureTime,
            arrivalTime: formattedArrivalTime,
            totalDuration: duration,
            from: flight.itineraries[0].segments[0].departure.iataCode,
            to: flight.itineraries[0].segments[flight.itineraries[0].segments.length -1].arrival.iataCode,
            airline: airline,
          }

          setIsLoading(true);
          addFlight(selectedTripId, flightDetails)
          .then(() => {
            alert("Flight saved successfully.");
          })
          .catch((err) => {
            alert("Error saving flight.");
          })
          .finally(() => setIsLoading(false));
        } */}
      
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
        <View style={{ margin: 16 }}>
  <Text>Select a Trip to Save Flights To:</Text>
  <Picker
    selectedValue={selectedTripId}
    onValueChange={(itemValue) => setSelectedTripId(itemValue)}
  >
    <Picker.Item label="-- Select Trip --" value={null} />
    {trips.map((trip) => (
      <Picker.Item key={trip.id} label={trip.tripName} value={trip.id} />
    ))}
  </Picker>
</View>
        <Button title="Save to Trips" onPress={() => saveFlight(flight)}></Button>
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

