import ActivityCard from '@/components/ActivityCard';
import React from 'react';
import { ScrollView, StyleSheet, Text } from 'react-native';

export default function ListItinerary() {
    return (
        <ScrollView style={styles.container}>
            <Text>List Itinerary</Text>
            <ActivityCard />
            <ActivityCard />
            <ActivityCard />
            <ActivityCard />
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
});