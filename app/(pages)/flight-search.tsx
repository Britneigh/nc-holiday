import React, { useState } from 'react';
import { StyleSheet, View, ScrollView, Text, Button } from 'react-native';
import { testAirportData } from '@/test-data/testAirportData';
import DepartureFlightSearch from '@/components/DepartureFlightSearch';
import ArrivalFlightSearch from '@/components/ArrivalFlightSearch';
import NumberOfAdultsSearch from '@/components/NumberOfAdultsSearch';
import DateFlightSearch from '@/components/DateFlightSearch';
import flightSearchWithDestination from '../../api'

export default function FlightSearch() {
    const [departureSearchQuery, setDepartureSearchQuery] = useState('');
    const [selectedDepartureCode, setSelectedDepartureCode] = useState('');
    const [arrivalSearchQuery, setArrivalSearchQuery] = useState('');
    const [selectedArrivalCode, setSelectedArrivalCode] = useState('');
    const [departureDate, setDepartureDate] = useState(new Date())
    const [returnDate, setReturnDate] = useState(new Date())
    const [numberOfAdults, setNumberOfAdults] = useState(1);

    // const handleFlightSearch = () => {
    //     flightSearchWithDestination(selectedDepartureCode, selectedArrivalCode, departureDate, numberOfAdults)
    //     router.push('/list-itinerary')
    // }

    return (
        <ScrollView style={styles.container}>
            <Text>Select departure airport</Text>
                <DepartureFlightSearch
                    flightData={testAirportData}
                    departureSearchQuery={departureSearchQuery}
                    selectedDepartureCode={selectedDepartureCode}
                    setDepartureSearchQuery={setDepartureSearchQuery}
                    setSelectedDepartureCode={setSelectedDepartureCode}
                />
            <Text>Select arrival airport</Text>
                <ArrivalFlightSearch
                    flightData={testAirportData}
                    arrivalSearchQuery={arrivalSearchQuery}
                    selectedArrivalCode={selectedArrivalCode}
                    setArrivalSearchQuery={setArrivalSearchQuery}
                    setSelectedArrivalCode={setSelectedArrivalCode}
                />
            <Text>Select departure date</Text>
                <DateFlightSearch date={departureDate} setDate={setDepartureDate}/>
            <Text>Select return date</Text>
                <DateFlightSearch date={returnDate} setDate={setReturnDate}/>
            <Text>Select number of adult passengers</Text>
                <NumberOfAdultsSearch
                    numberOfAdults={numberOfAdults}
                    setNumberOfAdults={setNumberOfAdults} 
                />
            {/* <Button
                title="Search for flights"
                onPress={handleFlightSearch}
            /> */}
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        flexGrow: 1,
        padding: 16,
    },
});