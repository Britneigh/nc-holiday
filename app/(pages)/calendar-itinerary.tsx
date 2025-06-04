import React from 'react';
import { StyleSheet, Text, ScrollView } from 'react-native';

export default function CalendarItinerary() {
    return (
        <ScrollView style={styles.container}>

            <Text>Calendar Itinerary</Text>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
});