import React, { useState, useEffect } from 'react';
import  { StyleSheet, Text, ScrollView } from 'react-native';
import TripForm from '@/components/TripForm';
import { useTheme } from '../ThemeContext';

export default function addTrip() {
    const { mode }: any = useTheme();

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
        <ScrollView style={[styles.container, { backgroundColor: mode.background }]}>
            <Text style={{ color: mode.text }}>Add a trip to the itinerary:</Text>
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
        backgroundColor: '#FFF'
    },
    header: {
        fontSize: 24,
        fontWeight: '600',
        color: '#333',
        textAlign: 'center',
        marginBottom: 30
    },
    label: {
        fontSize: 16,
        fontWeight: '600',
        marginBottom: 8,
        color: '#333',
    },
    searchComponent: {
        marginTop: 10,
        marginBottom: 15
    },
    error: {
        fontSize: 12,
        fontWeight: '400',
        margin: 5,
        marginLeft: 20,
        color: 'red',
    },
    buttonContainer: {
        marginBottom: 40
    },
    input: {
        borderColor: '#ccc',
        borderWidth: 1,
        borderRadius: 8,
        marginTop: 20,
        marginBottom: 20,
        marginLeft: 30,
        marginRight: 30,
        padding: 10,
        fontSize: 16,
        backgroundColor: '#fff',
    },
});