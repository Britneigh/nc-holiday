import React from 'react';
import { StyleSheet, Text, TouchableOpacity, Button, View, Image, Alert, ImageBackground } from 'react-native';
import { router } from 'expo-router';
import { deleteTrip } from '@/firestoreService/trip/deleteTrip';

export default function TripCard({trip, refreshTrips}: any) {

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
        <TouchableOpacity style={styles.container} onPress={() => router.push({ pathname: '/trip-info', params: { id: trip.id } })}>

            <View style={styles.card}>

                <View style={styles.flightCardHeader}>
                    <Text style={styles.label}>{trip.tripName}</Text>
                </View>

                <View style={styles.cardDataContainer}>
                    {/* conditional logic to only display image when image  */}
                    <Image
                        style={styles.cardImg}
                    // source={{
                    //     uri: '',
                    // }}
                    />
                    <View style={styles.cardData}>
                        <Text>{trip.location}</Text>
                        <Text>Start Date: {trip.startDate.toDate().toLocaleDateString()}</Text>
                        <Text>End Date: {trip.endDate.toDate().toLocaleDateString()}</Text>
                        <Text>Created at: {trip.createdAt.toDate().toLocaleDateString()}</Text>
                        <Button title="Delete" onPress={() => deleteImage(trip.id)}></Button>
                        {/*Trip's first uploaded image Background here, trip.image[0] */}
                    </View>

                </View>


            </View>


        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    container: {
        flexGrow: 1,
        padding: 16,
        backgroundColor: '#FFF'
    },
    card: {
        backgroundColor: '#ffffff',
        borderRadius: 12,
        minHeight: 180,
        padding: 0,
        marginBottom: 10,
        borderColor: '#ccc',
        borderWidth: 1,
        shadowColor: '#000',
        shadowOpacity: 0.05,
        shadowRadius: 4,
        shadowOffset: { width: 0, height: 2 },
        elevation: 2,
    },
    flightCardHeader: {
        backgroundColor: '#269FC10D',
        borderTopLeftRadius: 12,
        borderTopRightRadius: 12
    },
    cardDataContainer: {
        padding: 16,
        flexDirection: 'row',
        alignItems: 'center'
    },
    cardData: {
        marginLeft: 20
    },
    label: {
        fontSize: 16,
        fontWeight: '600',
        margin: 8,
        color: '#2891D9',
    },
    cardImg: {
        width: 100,
        height: 100,
        borderColor: '#ccc',
        borderWidth: 1,
    }
});