import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, Image, ScrollView, Pressable } from 'react-native';
import { useLocalSearchParams } from 'expo-router';
import { Trip } from '@/firestoreService/types';
import { getTripById } from '@/firestoreService/trip/getTripById';
import { getAccomsByTrip, getFlightsByTrip, getActivitiesByTrip, deleteFlight, deleteAccom, deleteActivity } from '@/firestoreService';
import { AccomData, FlightData, ActivityData } from '@/firestoreService/types';
import { Timestamp } from "firebase/firestore";
import GoBackHeader from '@/components/GoBackHeader';
import DeletePressable from '@/components/DeletePressable';
import { useTheme } from '../ThemeContext';

export default function TripInfo() {

  type ReturnFlight = {
    flightCode: string;
    departureTime: Timestamp;
    arrivalTime: Timestamp;
    departureLocation: string;
    arrivalLocation: string;
    airline: string;
    cost: number;
    stops: string[];
  };

  const { mode }: any = useTheme();
  const { id } = useLocalSearchParams<{ id: string }>();
  const [isLoading, setIsLoading] = useState(false);
  const [trip, setTrip] = useState<Trip | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [hotels, setHotels] = useState<AccomData[]>([]);
  const [flights, setFlights] = useState<FlightData[]>([]);
  const [returnFlights, setReturnFlights] = useState<ReturnFlight[]>([]);
  const [activities, setActivities] = useState<ActivityData[]>([]);
  const [expandedActivities, setExpandedActivities] = useState<Set<number>>(new Set());
  const [totalPrice, setTotalPrice] = useState<string>('0.00');

  useEffect(() => {
    setIsLoading(true);

    getTripById(id)
      .then((fetchedTrip) => {
        if (!fetchedTrip) throw new Error("Trip not found");
        setTrip(fetchedTrip);
        return getAccomsByTrip(id);
      })
      .then((res) => {
        setHotels(res || []);
        return getFlightsByTrip(id);
      })
      .then((res) => {
        setFlights(res || []);
        return getActivitiesByTrip(id);
      })
      .then((res) => {
        setActivities(res || []);
      })
      .catch((error) => {
        console.error(error);
        setError("Trip not found or failed to load data");
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, [id]);

  useEffect(() => {
    const totalPriceOfFlights = Number(flights?.reduce((sum: number, flight: any) => sum + (flight.cost || 0), 0))
    const totalPriceOfHotels = Number(hotels?.reduce((sum: number, hotel: any) => sum + (hotel.cost || 0), 0))
    const totalPriceOfActivities = Number(activities?.reduce((sum: number, activity: any) => sum + (activity.price || 0), 0))
    setTotalPrice((totalPriceOfFlights + totalPriceOfHotels + totalPriceOfActivities).toFixed(2))
  }, [flights, hotels, activities])

  useEffect(() => {
    const extractedReturnFlights = flights
      .filter(flight => flight.isReturnFlight && flight.returnFlightDetails)

    setReturnFlights(extractedReturnFlights);
  }, [flights]);


  const toggleActivityDescription = (index: number) => {
    const newSet = new Set(expandedActivities);
    newSet.has(index) ? newSet.delete(index) : newSet.add(index);
    setExpandedActivities(newSet);
  };

  const handleFlightDelete = (flightId: string) => {
    deleteFlight(flightId)
      .then(() => {
        console.log("flight successfully deleted")
        return getFlightsByTrip(id)
      })
      .then((res) => {
        setFlights(res || [])
      })
      .catch((err) => {
        console.log("Error", err)
      })
  }

  const handleAccomDelete = (hotelId: string) => {
    deleteAccom(hotelId)
      .then(() => {
        console.log("hotel successfully deleted")
        return getAccomsByTrip(id)
      })
      .then((res) => {
        setHotels(res || [])
      })
      .catch((err) => {
        console.log("Error", err)
      })
  }

  const handleActivityDelete = (activityId: string) => {
    deleteActivity(activityId)
      .then(() => {
        console.log("activity successfully deleted")
        return getActivitiesByTrip(id)
      })
      .then((res) => {
        setActivities(res || [])
      })
      .catch((err) => {
        console.log("Error", err)
      })
  }

  return (
    <View style={[styles.backgroundContainer, { backgroundColor: mode.background }]}>
      <GoBackHeader />
      <ScrollView contentContainerStyle={[styles.container, { backgroundColor: mode.background }]}>
        {isLoading && <Text style={{ color: mode.text }}>Loading trip...</Text>}
        {error && <Text style={styles.error}>{error}</Text>}
        {!trip && <Text style={{ color: mode.text }}>No trip data available</Text>}

        {trip?.pictures ? (
          <Image style={styles.cardImg} source={{ uri: trip.pictures[0] }} />
        ) : null}
        <Text style={[styles.header, { color: mode.text }]}>{trip?.tripName}</Text>
        <Text style={[{ color: mode.text }, styles.text]}>{trip?.location}</Text>
        <Text style={[{ color: mode.text }, styles.dateText]}>Start Date: {trip?.startDate.toDate().toLocaleDateString()}</Text>
        <Text style={[{ color: mode.text }, styles.dateText]}>End Date: {trip?.endDate.toDate().toLocaleDateString()}</Text>
        <Text style={[{ color: mode.text }, styles.priceText]}>Total Cost: {totalPrice}</Text>

        <Text style={[styles.sections, { color: mode.text }]}>Swipe To See Saved Flights:</Text>
        <ScrollView horizontal={true}>
          {flights?.map((flight: any, index: number) => {
            return (
              <View key={index} style={styles.card}>
                <View style={styles.hotelCardHeader}>
                  {flight.isReturnFlight &&
                    (<Text style={styles.label}>Return (outbound)</Text>)}
                  <Text style={styles.label}>{flight.airline} -<Text style={styles.label}> {flight.flightCode}</Text></Text>
                </View>
                <View style={styles.cardData}>
                  <Text style={styles.cardText}>
                    Departure Time: {flight.departureTime?.toDate?.().toLocaleString() || 'N/A'}
                  </Text>
                  <Text style={styles.cardText}>
                    Arrival Time: {flight.arrivalTime?.toDate?.().toLocaleString() || 'N/A'}
                  </Text>
                  <Text style={styles.cardText}>Departure Location: {flight.departureLocation}</Text>
                  <Text style={styles.cardText}>Arrival Location: {flight.arrivalLocation}</Text>
                  <Text style={styles.cardText}>Stops: {flight.stops}</Text>
                  <Text style={styles.price}>Total: {flight.cost}</Text>
                  <View style={styles.pressableContainer}>
                    <DeletePressable onPressFunc={() => handleFlightDelete(flight.id)}></DeletePressable>
                  </View>
                </View>
              </View>
            )

          })}

          {returnFlights.map((flight, index) => {
            return (
              <View key={index} style={styles.card}>
                <View style={styles.hotelCardHeader}>
                  <Text style={styles.label}>Return (return)</Text>
                  <Text style={styles.label}>{flight.airline} -<Text style={styles.label}> {flight.flightCode}</Text></Text>
                </View>
                <View style={styles.cardData}>
                  <Text style={styles.cardText}>
                    Departure Time: {flight.departureTime instanceof Timestamp ? flight.departureTime.toDate().toLocaleString() : 'N/A'
                    }
                  </Text>
                  <Text style={styles.cardText}>
                    Arrival Time: {flight.arrivalTime?.toDate?.().toLocaleString() || 'N/A'}
                  </Text>
                  <Text style={styles.cardText}>Departure Location: {flight.departureLocation}</Text>
                  <Text style={styles.cardText}>Arrival Location: {flight.arrivalLocation}</Text>
                  <Text style={styles.cardText}>Stops: {flight.stops}</Text>
                  <Text style={styles.price}>Total: {flight.cost}</Text>
                  <View style={styles.pressableContainer}>
                    <DeletePressable onPressFunc={() => handleFlightDelete(flight.id)}></DeletePressable>
                  </View>
                </View>
              </View>
            )

          })}



        </ScrollView>


        <Text style={[styles.sections, { color: mode.text }]}>Swipe To See Saved Hotels:</Text>
        <ScrollView horizontal={true}>
          {hotels.map((hotel: any, index: number) => (
            <View key={index} style={styles.card}>
              <View style={styles.hotelCardHeader}>
                <Text style={styles.label}>{hotel.name}</Text>
              </View>
              <View style={styles.cardData}>
                <Text style={styles.cardText}>Location: {hotel.location}</Text>
                <Text style={styles.cardText}>Check-in: {hotel.startDate}</Text>
                <Text style={styles.cardText}>Check-out: {hotel.endDate}</Text>
                <Text style={styles.price}>Total: {hotel.cost}</Text>
                <View style={styles.pressableContainer}>
                  <DeletePressable onPressFunc={() => handleAccomDelete(hotel.id)}></DeletePressable>
                </View>
              </View>
            </View>
          ))}
        </ScrollView>

        <Text style={[styles.sections, { color: mode.text }]}>Swipe To See Saved Activities:</Text>
        <ScrollView horizontal={true}>
          {activities.map((activity: any, index: number) => (
            <View key={index} style={styles.card}>
              <Pressable onPress={() => toggleActivityDescription(index)}>
                <View style={styles.hotelCardHeader}>
                  <Text style={styles.label}>Click to expand</Text>
                </View>
                <View style={styles.cardData}>
                  <Text style={styles.cardText}>
                    Location: {activity.location?.cityCode || 'Unknown'}
                  </Text>
                  <Text style={styles.price}>Total: {activity.cost}</Text>
                </View>
              </Pressable>
              {expandedActivities.has(index) && (
                <View style={styles.cardData}>
                  <Text>{activity.description?.replace(/<[^>]*>/g, '') || 'No description available.'}</Text>
                  <Text>Booking Link: {activity.bookingLink}</Text>
                  <View style={styles.pressableContainer}>
                    <DeletePressable onPressFunc={() => handleActivityDelete(activity.id)}></DeletePressable>
                  </View>
                </View>
              )}
            </View>
          ))}
        </ScrollView>
        {/* </>
        )} */}
      </ScrollView>
    </View >
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#ffffff',
    alignItems: 'center',
    paddingBottom: 30,
  },
  backgroundContainer: {
    backgroundColor: '#fff',
    flexGrow: 1,
  },
  header: {
    fontSize: 24,
    fontWeight: '600',
    color: '#333',
    textAlign: 'center',
    marginBottom: 30,
  },
  cardImg: {
    width: 150,
    height: 150,
    borderColor: '#ccc',
    borderWidth: 1,
    marginBottom: 30,
  },
  error: {
    fontSize: 12,
    fontWeight: "400",
    marginTop: 8,
    color: "red",
  },
  sections: {
    marginTop: 30,
  },
  text: {
    fontWeight: '600',
    fontSize: 18,
    color: '#2891D9',
    padding: 10,
    paddingBottom: 20,
  },
  dateText: {
    padding: 2,
    color: 'grey'
  },
  priceText: {
    padding: 10,
    paddingTop: 20,
    fontSize: 16,
    fontWeight: 600,
    color: '#2891D9',
  },
  card: {
    backgroundColor: '#ffffff',
    borderRadius: 12,
    padding: 0,
    margin: 10,
    borderColor: '#ccc',
    borderWidth: 1,
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowRadius: 4,
    shadowOffset: { width: 0, height: 2 },
    elevation: 2,
    width: 300,
  },
  hotelCardHeader: {
    backgroundColor: '#269fc12e',
    borderTopLeftRadius: 12,
    borderTopRightRadius: 12,
  },
  cardData: {
    padding: 16,
  },
  label: {
    fontSize: 16,
    fontWeight: '600',
    margin: 8,
    color: '#2891D9',
  },
  cardText: {
    fontSize: 14,
    color: '#333',
    marginBottom: 4,
  },
  price: {
    fontSize: 16,
    color: '#2891D9',
    fontWeight: 'bold',
    marginTop: 10,
  },
  pressableContainer: {
    alignItems: 'flex-end'
  }
});
