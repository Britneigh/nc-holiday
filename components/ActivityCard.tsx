import React from 'react';
import { StyleSheet, Text, TouchableOpacity, Button, View, Alert, ImageBackground } from 'react-native';
import { router } from 'expo-router';
import { deleteTrip } from '@/firestoreService/trip/deleteTrip';

export default function ActivityCard({trip, refreshTrips}: any) {

const deleteImage = (tripId: string) => {
    deleteTrip(tripId)
    .then(() => {
        refreshTrips(); 
    })
    .catch((error) => {
        Alert.alert("There was an error deleting your trip. Please try again.")
        throw error;
    })
}

const startDate = trip.startDate.toDate().toLocaleDateString();
const endDate = trip.endDate.toDate().toLocaleDateString();
const createdAt = trip.createdAt.toDate().toLocaleDateString();

    return (
        <View style={styles.container}>
        <TouchableOpacity style={styles.touchable} onPress={() => router.push({ pathname: '/trip-info', params: { id: trip.id } })}>
            <Text style={styles.text}>{trip.tripName}</Text>
            <Text style={styles.text}>({trip.location})</Text>
            <Text>Start Date: {startDate}</Text>
            <Text>End Date: {endDate}</Text>
            <Text>Created at: {createdAt}</Text>
            <Button title="Delete" onPress={() => deleteImage(trip.id)}></Button>
            {/*Trip's first uploaded image Background here, trip.image[0] */}
        </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        height: 150,
        borderColor: 'red',
        borderWidth: 2,
        marginTop: 10,
        marginBottom: 10,
        justifyContent: 'center',
        alignItems: 'center',
        textAlign: 'center',
        margin: 20,
        padding: 20,
    },
    touchable: {
        justifyContent: 'center',
        alignItems: 'center',
        textAlign: 'center', 
        gap: 10,
    },
    text: {
        fontWeight: 600,
    }
});