import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, Button, Pressable, ScrollView } from 'react-native';
import { router } from 'expo-router';
import TripCard from '@/components/TripCard';
import { getTrips } from '../../firestoreService/trip/getTrips';
import { Trip } from '../../firestoreService/types';



export default function Trips() {
    const [displayFutureTripsStyle, setDisplayFutureTripsStyle] = useState(true)
    const [trips, setTrips] = useState<Trip[]>([]);
    const [isLoading, setIsLoading] = useState(true);

  const fetchTrips = () => {
    setIsLoading(true)
    getTrips()
    .then((fetchedTrips) => {
    if (fetchedTrips) {
        setIsLoading(false)
        setTrips(fetchedTrips.filter(trip => trip.startDate.toDate() > today).sort((a, b) => a.startDate.toDate().getTime() - b.startDate.toDate().getTime()));
    }
    })
  }

const displayFutureTrips = () => {
    setDisplayFutureTripsStyle(true)
    setTrips(trips.filter(trip => trip.startDate.toDate() > today).sort((a, b) => a.startDate.toDate().getTime() - b.startDate.toDate().getTime()))
}

const displayPastTrips = () => {
    setDisplayFutureTripsStyle(false)
    setTrips(trips.filter(trip => trip.endDate.toDate() < today).sort((a, b) => b.endDate.toDate().getTime() - a.endDate.toDate().getTime()))
}

useEffect(() => {
fetchTrips()

}, [displayFutureTrips, displayPastTrips]); 

const today = new Date()

    return (
        <>
            <View style={styles.tripsDisplaysContainer}>
                <Pressable
                    onPress={displayFutureTrips}
                    style={[styles.optionalChoiceContainer, displayFutureTripsStyle && styles.optionalChoiceContainerSelected]}>
                    <Text style={[styles.optionalChoice, displayFutureTripsStyle && styles.optionalChoiceSelected]}>Future Trips</Text>
                </Pressable>
                <Pressable
                    onPress={displayPastTrips}
                    style={[styles.optionalChoiceContainer, !displayFutureTripsStyle && styles.optionalChoiceContainerSelected]}>
                    <Text style={[styles.optionalChoice, !displayFutureTripsStyle && styles.optionalChoiceSelected]}>Past Trips</Text>
                </Pressable>
                <Pressable
                    onPress={() => router.push('/trip-add')}
                    style={styles.optionalChoiceContainer}>
                    <Text style={styles.optionalChoice}>Add New Trip</Text>
                </Pressable>
            </View >
            <ScrollView style={styles.scrollContainer}>
                {/* <View style={styles.container}>
                    <Text style={styles.header}>Trips</Text>
                </View> */}
                {trips.map((trip) => (
                    <TripCard key={trip.id} trip={trip} refreshTrips={fetchTrips} />
                      ))}
            </ScrollView>
        </>
    );
}

const styles = StyleSheet.create({
    scrollContainer: {
        flex: 1,
        backgroundColor: '#ffffff',

    },
    container: {
        justifyContent: 'center',
        alignItems: 'center'
    },
    header: {
        fontSize: 24,
        fontWeight: '600',
        color: '#333',
        textAlign: 'center',
        marginBottom: 30
    },
    tripsDisplaysContainer: {
        flexDirection: 'row',
        backgroundColor: '#ffffff',
        justifyContent: 'center',
        alignItems: 'center',
        padding: 5
    },
    optionalChoiceContainer: {
        borderRadius: 30,
        backgroundColor: '#269fc12e',
        padding: 10,
        margin: 5,
        justifyContent: 'center',
        alignItems: 'center'
    },
    optionalChoice: {
        fontSize: 16,
        color: '#2891D9',
        fontWeight: '500',

    },
    optionalChoiceContainerSelected: {
        borderRadius: 30,
        backgroundColor: '#2891D9',
        padding: 10,
        margin: 5,
        justifyContent: 'center',
        alignItems: 'center'
    },
    optionalChoiceSelected: {
        fontSize: 16,
        color: 'white',
        fontWeight: '500',
    }
});