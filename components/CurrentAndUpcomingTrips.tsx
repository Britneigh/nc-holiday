import React, { useEffect, useState } from 'react';
import { StyleSheet, ScrollView, TouchableOpacity, View, Text, Pressable } from 'react-native';
import { getTrips } from '@/firestoreService/trip/getTrips';
import { Trip } from '@/firestoreService/types';
import { addFlight } from '@/firestoreService/flight/addFlight';

export default function CurrentAndUpcomingTrips({
    typeOfPlan,
    selectedTrip,
    setSelectedTrip,
    planData,
    setIsModalVisable,
    addPlanButton,
    setAddPlanButton,
}) {
    const [upcomingTrips, setUpcomingTrips] = useState<Trip[]>([]);

    const today = new Date();
    today.setHours(0, 0, 0, 0);

    useEffect(() => {
        getTrips().then((trips) => {
            if (!trips) return;

            const filtered = trips.filter((trip) => {
                const start = trip.startDate.toDate();
                const end = trip.endDate.toDate();
                start.setHours(0, 0, 0, 0);
                end.setHours(0, 0, 0, 0);

                return start >= today || (start <= today && end >= today);
            });

            setUpcomingTrips(filtered);
        });
    }, []);

    return (
        <ScrollView style={styles.scrollContainer}>
            {upcomingTrips.map((trip) => (
                <TouchableOpacity
                    key={trip.id}
                    style={styles.container}
                    onPress={() => {
                        setSelectedTrip(trip.id);
                        setAddPlanButton(true);
                    }}
                >
                    <View style={styles.tripWrapper}>
                        <View style={styles.card}>
                            <View style={styles.flightCardHeader}>
                                <Text style={styles.label}>
                                    {trip.tripName} ({trip.location})
                                </Text>
                            </View>



                            <View style={styles.cardDataContainer}>



                                <View style={styles.cardData}>

                                    <View style={styles.cardDatesContainer}>
                                        <Text style={styles.cardDate}>
                                            Start: {trip.startDate.toDate().toLocaleDateString()}
                                        </Text>
                                        <Text style={styles.cardDate}>
                                            End: {trip.endDate.toDate().toLocaleDateString()}
                                        </Text>

                                    </View>



                                    {/* FLIGHTS */}
                                    {typeOfPlan === 'flight' && addPlanButton && selectedTrip === trip.id && (
                                        <View style={styles.pressablePositioning}>
                                            <Pressable
                                                onPress={() => {
                                                    addFlight(trip.id, planData)
                                                        .then((success) => {
                                                            if (success) {
                                                                console.log("Flight added successfully.");
                                                                setIsModalVisable(false);
                                                                setAddPlanButton(false);
                                                            } else {
                                                                console.log("Failed to add flight.");
                                                            }
                                                        })
                                                        .catch((error) => {
                                                            console.error("Error adding flight:", error);
                                                        });
                                                }}
                                            >
                                                <View style={styles.addContainer}>
                                                    <Text style={styles.addText}>Add</Text>
                                                </View>
                                            </Pressable>
                                        </View>
                                    )}

                                    {/* HOTELS

                                    {typeOfPlan === 'hotel' && addPlanButton && selectedTrip === trip.id && (
                                        <View style={styles.pressablePositioning}>
                                            <Pressable
                                                onPress={() => {
                                                    //    addHotel
                                                }}
                                            >
                                                <View style={styles.addContainer}>
                                                    <Text style={styles.addText}>Add</Text>
                                                </View>
                                            </Pressable>
                                        </View>
                                    )} */}


                                    {/* ACTIVITY

                                    {typeOfPlan === 'activity' && addPlanButton && selectedTrip === trip.id && (
                                        <View style={styles.pressablePositioning}>
                                            <Pressable
                                                onPress={() => {
                                                    //    addActivity
                                                }}
                                            >
                                                <View style={styles.addContainer}>
                                                    <Text style={styles.addText}>Add</Text>
                                                </View>
                                            </Pressable>
                                        </View>
                                    )} */}



                                </View>
                            </View>
                        </View>
                    </View>
                </TouchableOpacity>
            ))}
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    scrollContainer: {
        paddingHorizontal: 10,
        paddingVertical: 5,
    },
    container: {
        width: 320,
        marginRight: 10,
        backgroundColor: '#FFF',
    },
    tripWrapper: {
        padding: 1,
        backgroundColor: '#e0f7ff40',
        borderRadius: 20,
        borderColor: '#e0f7ff10',
        borderWidth: 1,
        shadowColor: '#000',
        shadowOpacity: 0.04,
        shadowRadius: 5,
        shadowOffset: { width: 0, height: 1 },
        elevation: 1,
    },
    card: {
        backgroundColor: '#ffffff',
        width: '80%',
        borderRadius: 12,

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
        // flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#269FC10D',
        borderTopLeftRadius: 12,
        borderTopRightRadius: 12,
        padding: 8,
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
        flexDirection: 'row'
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
    cardDatesContainer: {
        margin: 10,

    },
    pressablePositioning: {
        justifyContent: 'flex-end',
        alignItems: 'flex-end'
    },

    addText: {
        fontSize: 16,
        color: '846c5b'
    },
    addContainer: {
        marginLeft: 20,
        backgroundColor: '#fbe99f',
        height: 40,
        width: 40,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 20
    }
});
