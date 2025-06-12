import React, { useState } from 'react';
import { StyleSheet, Text, View, Button, ScrollView, Pressable } from 'react-native';
import { router } from 'expo-router';
import { useAuth } from "../../context/UserContext";
import HomeCurrentTrips from '@/components/HomeCurrentTrips';
import HomeUpcomingTrips from '@/components/HomeUpcomingTrips';
import HomeCurrentAndUpcomingTrips from '@/components/HomeCurrentAndUpcomingTrips';
import { useTheme } from '../ThemeContext';

export default function Home() {
    const { mode }: any = useTheme();
    const { currentUser } = useAuth();
    const [currentTripsLength, setCurrentTripsLength] = useState(0)

    return (
        <ScrollView contentContainerStyle={[styles.container, { backgroundColor: mode.background }]}>


            <View style={styles.welcomeMessageContainer}><Text style={[styles.welcomeMessage, { color: mode.text }]}>{currentUser ? `Welcome back ${currentUser.email}` : "Welcome"}</Text></View>


            <View style={styles.homeStructure}>

                <Text style={styles.addNewTripText}>View your current trips:</Text>
                <Pressable
                    onPress={() => router.push('/trip-add')}
                    style={styles.addNewTripContainer}
                >
                    <Text style={styles.addNewTripText}>Add New Trip</Text>
                </Pressable>


                <View style={styles.largeBlock}>
                    <HomeCurrentTrips setCurrentTripsLength={setCurrentTripsLength} />
                </View>

            </View>



        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        flexGrow: 1,
        backgroundColor: '#ffffff',
        paddingBottom: 50,
        justifyContent: 'center',
        alignItems: 'center',
        textAlign: 'center',
        paddingTop: 75,

    },
    homeStructure: {
        alignItems: 'center'
    },
    welcomeMessageContainer: {
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%',
        paddingHorizontal: 20,
    },
    welcomeMessage: {
        fontSize: 18,
        fontWeight: '600',
        marginVertical: 30,
        textAlign: 'center',
        width: '100%',
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
        margin: 20,
        width: '90%',
    },
    buttonView: {
        marginTop: 20,
        marginBottom: 20,

    }
});

