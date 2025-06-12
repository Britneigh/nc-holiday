import React, { useEffect, useState } from 'react';
import { StyleSheet, ScrollView, TouchableOpacity, View, Text, Image } from 'react-native';
import { getTrips } from '@/firestoreService/trip/getTrips';
import { router } from 'expo-router';
import { Trip } from '@/firestoreService/types';
import { useTheme } from '../app/ThemeContext';

export default function HomeCurrentTrips({ setCurrentTripsLength }: any) {
    const { mode }: any = useTheme();
    const [currentTrips, setCurrentTrips] = useState<Trip[]>([]);

    const today = new Date();
    today.setHours(0, 0, 0, 0);

    useEffect(() => {
        getTrips()
            .then((trips) => {

                if (!trips) return

                const filtered = trips.filter((trip) => {
                    const start = trip.startDate.toDate();
                    const end = trip.endDate.toDate();
                    start.setHours(0, 0, 0, 0);
                    end.setHours(0, 0, 0, 0);
                    return start <= today && end >= today;
                })
                filtered.sort((a, b) => {
                    const startA = a.startDate.toDate();
                    const startB = b.startDate.toDate();
                    return startA.getTime() - startB.getTime();
                });
                setCurrentTrips(filtered);
                setCurrentTripsLength(filtered.length);
            });
    }, []);

    return (
        <View style={styles.centeringContainer}>
            <ScrollView style={styles.scrollContainer}>
                {currentTrips.map((trip) => (

                    <TouchableOpacity
                        key={trip.id}
                        style={[styles.container, { backgroundColor: mode.background }]}
                        onPress={() => router.push({ pathname: '/trip-info', params: { id: trip.id } })}
                    >
                        <View style={styles.currentTripWrapper}>
                            <View style={styles.card}>
                                <View style={styles.flightCardHeader}>
                                    <Text style={styles.currentTripBadge}>Current Trip</Text>
                                    <Text style={styles.label}>{trip.tripName}</Text>
                                </View>

                                <View style={styles.cardDataContainer}>
                                    {trip.pictures ?
                                        (<Image
                                            style={styles.cardImg}
                                            source={{
                                                uri: trip.pictures[0],
                                            }}
                                        />)
                                        : null}

                                    <View style={styles.cardData}>
                                        <Text style={[styles.cardLocation, { color: mode.text }]}>{trip.location}</Text>
                                        <Text style={styles.cardDate}>Start: {trip.startDate.toDate().toLocaleDateString()}</Text>
                                        <Text style={styles.cardDate}>End: {trip.endDate.toDate().toLocaleDateString()}</Text>
                                        <Text style={styles.cardDate}>Created: {trip.createdAt.toDate().toLocaleDateString()}</Text>
                                    </View>
                                </View>
                            </View>
                        </View>
                    </TouchableOpacity>

                ))
                }
            </ScrollView >
        </View>
    );
}

const styles = StyleSheet.create({
    scrollContainer: {
        paddingHorizontal: 10,
        paddingVertical: 5,
        width: '100%',

    },
    centeringContainer: {
        alignItems: 'center'
    },
    container: {
        width: '100%',
        paddingHorizontal: 10,
        backgroundColor: '#FFF',
    },
    currentTripWrapper: {
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
    flightCardHeader: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#269FC10D',
        borderTopLeftRadius: 12,
        borderTopRightRadius: 12,
        padding: 8,
    },
    currentTripBadge: {
        marginRight: 10,
        backgroundColor: '#fbe99f',
        color: '#846c5b',
        paddingVertical: 5,
        paddingHorizontal: 10,
        borderRadius: 12,
        alignSelf: 'flex-start',
        fontSize: 12,
        fontWeight: '600',
    },
    label: {
        fontSize: 16,
        fontWeight: '600',
        color: '#2891D9',
    },
    cardDataContainer: {
        padding: 16,
        flexDirection: 'row',
        alignItems: 'center',
    },
    cardImg: {
        width: '30%',
        aspectRatio: 1,
        borderColor: '#ccc',
        borderWidth: 1,
        borderRadius: 8,
    },
    cardData: {
        marginLeft: 20,
        width: '62%',
    },
    cardLocation: {
        fontSize: 18,
        fontWeight: '600',
        marginTop: 10,
        marginBottom: 10,
    },
    cardDate: {
        fontSize: 12,
        color: '#2891D9',
        marginLeft: 15,
    },
});