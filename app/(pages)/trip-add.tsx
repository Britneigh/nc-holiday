import React, { useState, useEffect } from 'react';
import  { StyleSheet, Text, ScrollView } from 'react-native';
import TripForm from '@/components/TripForm';

export default function addTrip() {

    const [tripName, setTripName] = useState('');
    const [location, setLocation] = useState('');
    const [startDate, setStartDate] = useState(new Date());
    const [endDate, setEndDate] = useState(new Date());
    const [tripPictures, setTripPictures] = useState<string[]>([]);

useEffect(() => {
  setTripName('');
  setLocation('');
  setStartDate(new Date());
  setEndDate(new Date());
  setTripPictures([]);

    return () => {
        if (
        typeof document !== 'undefined' &&
        document.activeElement instanceof HTMLElement
        ) {
        document.activeElement.blur();
        }
    };
}, []);

    return (
        <ScrollView style={styles.container}>
            <Text>Add a trip to the itinerary:</Text>
            <TripForm 
                tripName={tripName} setTripName={setTripName}
                location={location} setLocation={setLocation}
                startDate={startDate} setStartDate={setStartDate}
                endDate={endDate} setEndDate={setEndDate}
                tripPictures={tripPictures} setTripPictures={setTripPictures}/>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        flexGrow: 1,
        padding: 16,
    },
});