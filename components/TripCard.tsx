import React from 'react';
import { StyleSheet, Text, TouchableOpacity, Button, View, Image, Alert, Pressable } from 'react-native';
import { router } from 'expo-router';
import { deleteTrip } from '@/firestoreService/trip/deleteTrip';
import { useTheme } from '../app/ThemeContext';

export default function TripCard({ trip, refreshTrips, setDisplayUpcomingTripsStyle }: any) {
    const { mode }: any = useTheme();

    const deleteImage = (tripId: string) => {
        deleteTrip(tripId)
            .then(() => {
                refreshTrips();
                setDisplayUpcomingTripsStyle(true);
            })
            .catch(() => {
                Alert.alert("There was an error deleting your trip. Please try again.");
            });
    };

    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const start = trip.startDate.toDate();
    start.setHours(0, 0, 0, 0);
    const end = trip.endDate.toDate();
    end.setHours(0, 0, 0, 0);

    const isCurrentTrip = start <= today && end >= today;

    return (
        <TouchableOpacity
            style={[styles.container, { backgroundColor: mode.background }]}
            onPress={() => router.push({ pathname: '/trip-info', params: { id: trip.id } })}
        >
            <View style={isCurrentTrip ? styles.currentTripWrapper : styles.tripWrapper}>
                <View style={styles.card}>
                    <View style={styles.flightCardHeader}>
                        {isCurrentTrip && (<Text style={styles.currentTripBadge}>Current Trip</Text>)}
                        <Text style={styles.label}>{trip.tripName}</Text>
                    </View>

                    <View style={styles.cardDataContainer}>
                        {/* need to check if there is the ability to currently add pictures */}
                        {trip.pictures ?
                            (<Image
                                style={styles.cardImg}
                                source={{
                                    uri: trip.pictures[0],
                                }}
                            />)
                            : null}

                        {/* <Image
                            style={styles.cardImg}
                            source={{
                                uri: 'trip.pictures',
                            }}
                        /> */}

                        <View style={styles.cardData}>
                            <Text style={styles.cardLocation}>{trip.location}</Text>
                            <Text style={styles.cardDate}>Start Date: {trip.startDate.toDate().toLocaleDateString()}</Text>
                            <Text style={styles.cardDate}>End Date: {trip.endDate.toDate().toLocaleDateString()}</Text>
                            <Text style={styles.cardDate}>Created at: {trip.createdAt.toDate().toLocaleDateString()}</Text>
                            {/* <Button title="Delete" onPress={() => deleteImage(trip.id)} /> */}
                            <View style={styles.pressablePositioning}>
                                <Pressable
                                    onPress={() => deleteImage(trip.id)}>
                                    <View style={styles.deleteContainer}>
                                        <Text style={styles.deleteX} >×</Text>
                                    </View>
                                </Pressable>
                            </View>
                        </View>
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
        backgroundColor: '#FFF',
    },
    currentTripWrapper: {
        // marginTop: 4,
        // marginBottom: 5,
        padding: 1,
        backgroundColor: '#fbe99f30',
        borderRadius: 20,
        borderColor: '#fbe99f10',
        borderWidth: 1,
        shadowColor: '#000',
        shadowOpacity: 0.04,
        shadowRadius: 5,
        shadowOffset: { width: 0, height: 1 },
        elevation: 1,
    },
    tripWrapper: {
        padding: 2,
    },
    card: {
        backgroundColor: '#ffffff',
        borderRadius: 12,
        minHeight: 180,
        padding: 0,
        margin: 5,
        borderColor: '#ccc',
        borderWidth: 1,
        shadowColor: '#000',
        shadowOpacity: 0.05,
        shadowRadius: 4,
        shadowOffset: { width: 0, height: 2 },
        elevation: 2,
    },
    cardLocation: {
        fontSize: 18,
        fontWeight: 600,
        marginTop: 10,
        marginBottom: 10
    },
    cardDate: {
        fontSize: 12,
        color: '#2891D9',
        marginLeft: 15
    },
    flightCardHeader: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#269FC10D',
        borderTopLeftRadius: 12,
        borderTopRightRadius: 12,
        padding: 8,
    },
    cardDataContainer: {
        padding: 16,
        flexDirection: 'row',
        alignItems: 'center',
    },
    cardData: {
        marginLeft: 20,
        width: '62%'
    },
    label: {
        fontSize: 16,
        fontWeight: '600',
        color: '#2891D9',
    },
    currentTripBadge: {
        marginRight: 10,
        // backgroundColor: '#2891D9',
        backgroundColor: '#fbe99f',
        color: '846c5b',
        paddingVertical: 5,
        paddingHorizontal: 10,
        borderRadius: 12,
        alignSelf: 'flex-start',
        fontSize: 12,
        fontWeight: '600',
    },
    cardImg: {
        width: '30%',
        aspectRatio: 1,
        borderColor: '#ccc',
        borderWidth: 1,
        borderRadius: 8,
    },
    pressablePositioning: {
        justifyContent: 'flex-end',
        alignItems: 'flex-end'
    },
    deleteX: {
        fontSize: 16,
        color: '846c5b'
    },
    deleteContainer: {
        backgroundColor: '#EC080890',
        // backgroundColor: '#fbe99f',
        height: 20,
        width: 20,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 10
    }
});
