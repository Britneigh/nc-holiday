import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, Image } from 'react-native';
import { useLocalSearchParams } from 'expo-router';
import { Trip } from '@/firestoreService/types';
import { getTripById } from '@/firestoreService/trip/getTripById';
import GoBackHeader from '@/components/GoBackHeader';
import { useTheme } from '../ThemeContext';

export default function ActivityInfo() {
  const { mode }: any = useTheme();

  const { id } = useLocalSearchParams<{ id: string }>();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [trip, setTrip] = useState<Trip | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setIsLoading(true)
      getTripById(id)
        .then((fetchedTrip) => {
            setIsLoading(false)
            setTrip(fetchedTrip);
        })
        .catch((error) => {
          setIsLoading(false)
          setError("Trip not found")
            throw error;
        })
  }, [id]);

    return (
      <>
      <GoBackHeader></GoBackHeader>
  <View style={[styles.container, { backgroundColor: mode.background }]}>
    {isLoading && <Text style={{ color: mode.text }}>Loading trip...</Text>}
    {error && <Text>{error}</Text>}
    {!trip && (
      <Text style={{ color: mode.text }}>No trip data available</Text>
    )}
    {trip && (
      <>
          <Image
              style={styles.cardImg}
                // source={{
                //     uri: '',
                // }}
              />
        <Text style={[styles.header, {color: mode.text}]}>{trip.tripName}</Text>
        <Text style={[styles.text, {color: mode.text}]}>{trip.location}</Text>
        <Text style={{ color: mode.text }}>Start Date: {trip.startDate.toDate().toLocaleDateString()}</Text>
        <Text style={{ color: mode.text }}>End Date: {trip.endDate.toDate().toLocaleDateString()}</Text>
        <Text style={[styles.sections, {color: mode.text}]}>Saved Flights:</Text>
        <Text style={[styles.sections, {color: mode.text}]}>Saved Hotels:</Text>
      </>
    )}
  </View>
      </>

    );
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#ffffff',
        alignItems: 'center'

    },
    header: {
        fontSize: 24,
        fontWeight: '600',
        color: '#333',
        textAlign: 'center',
        marginBottom: 30
    },
    cardImg: {
        width: 150,
        height: 150,
        borderColor: '#ccc',
        borderWidth: 1,
        marginBottom: 30
    },
     sections: {
        marginTop: 30,
    },
    text: {
        fontWeight: 600,
    },
});


