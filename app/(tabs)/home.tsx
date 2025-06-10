import React from 'react';
import { StyleSheet, Text, View, Button, ScrollView } from 'react-native';
import { router } from 'expo-router';
import { useAuth } from "../../context/UserContext";

export default function Home() {
    const { currentUser } = useAuth();
    return (
        <ScrollView style={styles.container}>
            <View style={styles.welcomeMessage}><Text>{currentUser ? `Welcome back ${currentUser.email}` : "Welcome"}</Text></View>
            <View style={styles.weatherContainer}>
                <View style={styles.rowBlock}><Text>The weather for your next trip:</Text></View>
                <View style={styles.rowBlock}><Text>☀️🌧️</Text></View>
            </View>
            <View style={styles.largeBlock}>
                <Text>Info on next or current trip</Text>
            </View>
            {/* <View style={styles.buttonView}>
                <Button
                    title="View list itinerary"
                    onPress={() => router.push('/list-itinerary')}
                />
            </View>
            <View style={styles.buttonView}>
                <Button
                    title="View calendar itinerary"
                    onPress={() => router.push('/calendar-itinerary')}
                />
            </View> */}

        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#ffffff'
    },
    welcomeMessage: {

        margin: 30,
        alignItems: 'center',
        justifyContent: 'center'
    },
    weatherContainer: {
        height: 60,
        justifyContent: 'space-around',
        alignItems: 'center',
        flexDirection: 'row'
    },
    rowBlock: {

    },
    largeBlock: {
        height: 400,
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 25,
        justifyContent: 'center',
        alignItems: 'center',
        margin: 15,
    },
    buttonView: {
        marginTop: 20,
        marginBottom: 20,

    }
});