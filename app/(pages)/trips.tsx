import ActivityCard from '@/components/ActivityCard';
import React, { useState, useEffect } from 'react';
import { ScrollView, StyleSheet, Text } from 'react-native';
import { getTrips } from '../../firestoreService/trip/getTrips';
import { Trip } from '../../firestoreService/types';

export default function trips() {
  const [trips, setTrips] = useState<Trip[]>([]);
  const [isLoading, setIsLoading] = useState(true);
    
  useEffect(() => {
    getTrips()
      .then((fetchedTrips) => {
        if (fetchedTrips) {
        setIsLoading(false)
          setTrips(fetchedTrips);
        }
      })
  }, []); 

    return (
        <ScrollView style={styles.container}>
            <Text>List of trips</Text>
            {trips.map((trip) => (
        <ActivityCard key={trip.id} trip={trip} />
      ))}
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
});