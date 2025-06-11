import React, { useState } from 'react';
import { StyleSheet, Text, View, Button, ScrollView, Pressable } from 'react-native';
import { router } from 'expo-router';
import { useAuth } from "../../context/UserContext";
import HomeCurrentTrips from '@/components/HomeCurrentTrips';
import HomeUpcomingTrips from '@/components/HomeUpcomingTrips';
import HomeCurrentAndUpcomingTrips from '@/components/HomeCurrentAndUpcomingTrips';

export default function Home() {
    const { currentUser } = useAuth();
    const [currentTripsLength, setCurrentTripsLength] = useState(0)
    const [upcomingTripsLength, setUpcomingTripsLength] = useState(0)

    // console.log(currentTripsLength, upcomingTripsLength, '<----- trip length')


    return (
        <ScrollView contentContainerStyle={styles.container}>

            <View style={styles.welcomeMessageContainer}><Text style={styles.welcomeMessage}>{currentUser ? `Welcome back ${currentUser.email}` : "Welcome"}</Text></View>


            <View style={styles.homeStructure}>

                <Text style={styles.addNewTripText}>View your current trips:</Text>

                <Pressable
                    onPress={() => router.push('/trip-add')}
                    style={styles.addNewTripContainer}
                >
                    <Text style={styles.addNewTripText}>Add New Trip</Text>
                </Pressable>

                {/* <View style={styles.largeBlock}>
                    <HomeCurrentAndUpcomingTrips />
                </View> */}

                <View style={styles.largeBlock}>
                    <HomeCurrentTrips setCurrentTripsLength={setCurrentTripsLength} />
                </View>

                {/* <View style={styles.largeBlock}>
                    <HomeUpcomingTrips setUpcomingTripsLength={setUpcomingTripsLength} />
                </View> */}

                {/* <View style={styles.largeBlock}>
                    <HomeCurrentAndUpcomingTrips />
                </View> */}
            </View>

        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        flexGrow: 1,
        backgroundColor: '#ffffff',
        paddingBottom: 50,
    },
    homeStructure: {
        alignItems: 'center'
    },
    welcomeMessageContainer: {
        justifyContent: 'center',
        alignItems: 'center'
    },
    welcomeMessage: {
        fontSize: 18,
        fontWeight: 600,
        margin: 30,
        alignItems: 'center',
        justifyContent: 'center'
    },
    addNewTripContainer: {
        marginTop: 20,
        borderRadius: 30,
        backgroundColor: '#269fc12e',
        padding: 10,
        justifyContent: 'center',
        alignItems: 'center'
    },
    addNewTripText: {
        fontSize: 16,
        color: '#2891D9',
        fontWeight: '500',
    },
    largeBlock: {
        justifyContent: 'center',
        alignItems: 'center',
        margin: 15,
    },
    buttonView: {
        marginTop: 20,
        marginBottom: 20,

    }
});

