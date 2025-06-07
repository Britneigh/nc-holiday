import React, { useState, useEffect } from 'react';
import { StyleSheet, ScrollView, Text, Button } from 'react-native';
import { router } from 'expo-router';
import { testAirportData } from '@/test-data/testAirportData';
import DepartureFlightSearch from '@/components/DepartureFlightSearch';
import ArrivalFlightSearch from '@/components/ArrivalFlightSearch';
import NumberOfAdultsSearch from '@/components/NumberOfAdultsSearch';
import DateFlightSearch from '@/components/DateFlightSearch';
import { useQueryClient } from '@tanstack/react-query';
import { useIsFocused } from '@react-navigation/native';


export default function FlightSearch() {
    const [departureSearchQuery, setDepartureSearchQuery] = useState('');
    const [selectedDepartureCode, setSelectedDepartureCode] = useState('');
    const [arrivalSearchQuery, setArrivalSearchQuery] = useState('');
    const [selectedArrivalCode, setSelectedArrivalCode] = useState('');
    const [departureDate, setDepartureDate] = useState(new Date())
    const [returnDate, setReturnDate] = useState<Date | null>(null);
    const [numberOfAdults, setNumberOfAdults] = useState(1);
    
const queryClient = useQueryClient();
const isFocused = useIsFocused();

useEffect(() => {
  if (isFocused) {
    queryClient.removeQueries('flights');
  }
}, [isFocused]);

useEffect(() => {
  setDepartureSearchQuery('');
  setSelectedDepartureCode('');
  setArrivalSearchQuery('');
  setSelectedArrivalCode('');
  setDepartureDate(new Date());
  setReturnDate(null);
  setNumberOfAdults(1);
}, []);

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
                {returnDate && returnDate < departureDate ? <Text>Return date is before depature date!</Text> : null}
            <Text>Select number of adult passengers</Text>
                <NumberOfAdultsSearch
                    numberOfAdults={numberOfAdults}
                    setNumberOfAdults={setNumberOfAdults} 
                />
            <Button
                title="Search for flights"
                disabled={returnDate && returnDate < departureDate ? true : false}
                onPress={() => {
                    const params: any = {
                      selectedDepartureCode,
                      selectedArrivalCode,
                      departureDate: departureDate.toISOString().split('T')[0],
                      numberOfAdults,
                    };
                    if (returnDate) {
                        params.returnDate = returnDate.toISOString().split('T')[0];
                    }
                    router.push({
                     pathname: '/flight-results',
                     params,
                    });
                }}
            />
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        flexGrow: 1,
        padding: 16,
    },
});