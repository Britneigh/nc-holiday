import React, { useState } from 'react';
import { ScrollView, StyleSheet } from 'react-native';
import { testAirportData } from '@/test-data/testAirportData';
import DepartureFlightSearch from '@/components/DepartureFlightSearch';
import ArrivalFlightSearch from '@/components/ArrivalFlightSearch';
import NumberOfAdultsSearch from '@/components/NumberOfAdultsSearch';

export default function FlightSearch() {
    const [departureSearchQuery, setDepartureSearchQuery] = useState('');
    const [selectedDepartureCode, setSelectedDepartureCode] = useState('');
    const [arrivalSearchQuery, setArrivalSearchQuery] = useState('');
    const [selectedArrivalCode, setSelectedArrivalCode] = useState('');
    const [numberOfAdults, setNumberOfAdults] = useState(1);

    return (
        <ScrollView style={styles.container}>
            <DepartureFlightSearch
                flightData={testAirportData}
                departureSearchQuery={departureSearchQuery}
                selectedDepartureCode={selectedDepartureCode}
                setDepartureSearchQuery={setDepartureSearchQuery}
                setSelectedDepartureCode={setSelectedDepartureCode}
            />
            <ArrivalFlightSearch
                flightData={testAirportData}
                arrivalSearchQuery={arrivalSearchQuery}
                selectedArrivalCode={selectedArrivalCode}
                setArrivalSearchQuery={setArrivalSearchQuery}
                setSelectedArrivalCode={setSelectedArrivalCode}
            />
            <NumberOfAdultsSearch
                numberOfAdults={numberOfAdults}
                setNumberOfAdults={setNumberOfAdults} />
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        flexGrow: 1,
        padding: 16,
    },
});