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

    return (
        <View style={styles.container}>
        <TouchableOpacity style={styles.touchable} onPress={() => router.push({ pathname: '/activity-info', params: { id: trip.id } })}>
            <Text style={styles.text}>{trip.tripName}</Text>
            <Text style={styles.text}>({trip.location})</Text>
            <Text>Start Date: {trip.startDate.toDate().toLocaleDateString()}</Text>
            <Text>End Date: {trip.endDate.toDate().toLocaleDateString()}</Text>
            <Text>Created at: {trip.createdAt.toDate().toLocaleDateString()}</Text>
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