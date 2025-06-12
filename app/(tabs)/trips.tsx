import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, Button, Pressable, ScrollView } from 'react-native';
import { router } from 'expo-router';
import TripCard from '@/components/TripCard';
import { getTrips } from '../../firestoreService/trip/getTrips';
import { Trip } from '../../firestoreService/types';
import { useTheme } from '../ThemeContext';

export default function Trips() {
    const { mode }: any = useTheme();
    const [displayUpcomingTripsStyle, setDisplayUpcomingTripsStyle] = useState(true)
    const [allTrips, setAllTrips] = useState<Trip[]>([]);
    const [trips, setTrips] = useState<Trip[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const fetchTrips = () => {
        setIsLoading(true)
        getTrips()
            .then((fetchedTrips) => {
                if (fetchedTrips) {
                    const upcomingTrips = fetchedTrips.filter(trip => trip.endDate.toDate() >= today);
                    setAllTrips(fetchedTrips);
                    setTrips(upcomingTrips.sort((a, b) => a.startDate.toDate().getTime() - b.startDate.toDate().getTime()));
                    setIsLoading(false);
                }
            })
    }

    const displayUpcomingTrips = () => {
        setDisplayUpcomingTripsStyle(true)
        setTrips(allTrips
            .filter(trip => trip.endDate.toDate() >= today)
            .sort((a, b) => a.startDate.toDate().getTime() - b.startDate.toDate().getTime()))
    }

    const displayPastTrips = () => {
        setDisplayUpcomingTripsStyle(false)
        setTrips(allTrips
            .filter(trip => trip.endDate.toDate() < today)
            .sort((a, b) => b.endDate.toDate().getTime() - a.endDate.toDate().getTime()))
    }

    useEffect(() => {
        fetchTrips()

    }, []);


    return (
        <>
            <View style={[styles.tripsDisplaysContainer, { backgroundColor: mode.background }]}>
                <Pressable
                    onPress={displayUpcomingTrips}
                    style={[styles.optionalChoiceContainer, displayUpcomingTripsStyle && styles.optionalChoiceContainerSelected]}>
                    <Text style={[styles.optionalChoice, displayUpcomingTripsStyle && styles.optionalChoiceSelected]}>Upcoming Trips</Text>
                </Pressable>
                <Pressable
                    onPress={displayPastTrips}
                    style={[styles.optionalChoiceContainer, !displayUpcomingTripsStyle && styles.optionalChoiceContainerSelected]}>
                    <Text style={[styles.optionalChoice, !displayUpcomingTripsStyle && styles.optionalChoiceSelected]}>Past Trips</Text>
                </Pressable>
                <Pressable
                    onPress={() => router.push('/trip-add')}
                    style={styles.optionalChoiceContainer}>
                    <Text style={styles.optionalChoice}>Add New Trip</Text>
                </Pressable>
            </View >
            <ScrollView style={[styles.scrollContainer, { backgroundColor: mode.background }]}>
                {trips.map((trip) => (
                    <TripCard key={trip.id} trip={trip} refreshTrips={fetchTrips} setDisplayUpcomingTripsStyle={setDisplayUpcomingTripsStyle} />
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