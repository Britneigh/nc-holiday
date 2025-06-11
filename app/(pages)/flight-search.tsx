import React, { useState, useEffect } from 'react';
import { StyleSheet, View, ScrollView, Text, Button, Switch } from 'react-native';
import { router } from 'expo-router';
import { testAirportData } from '@/test-data/testAirportData';
import DepartureFlightSearch from '@/components/DepartureFlightSearch';
import ArrivalFlightSearch from '@/components/ArrivalFlightSearch';
import NumberOfAdultsSearch from '@/components/NumberOfAdultsSearch';
import DateFlightSearch from '@/components/DateFlightSearch';
import { getFlightSearchWithDestination, getAccessToken } from '../../api'
import { useQueryClient } from '@tanstack/react-query';
import { useIsFocused } from '@react-navigation/native';
import GoBackHeader from '@/components/GoBackHeader';


export default function FlightSearch() {
    const [departureSearchQuery, setDepartureSearchQuery] = useState('');
    const [selectedDepartureCode, setSelectedDepartureCode] = useState('');
    const [arrivalSearchQuery, setArrivalSearchQuery] = useState('');
    const [selectedArrivalCode, setSelectedArrivalCode] = useState('');
    const [departureDate, setDepartureDate] = useState(new Date())
    const [returnDate, setReturnDate] = useState<Date | null>(null);
    const [numberOfAdults, setNumberOfAdults] = useState(1);
    const [addAReturnFlight, setAddAReturnFlight] = useState(false);

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

    const toggleSwitch = () => {
        setAddAReturnFlight(!addAReturnFlight)
    }

    return (
        <>

            <ScrollView style={styles.container}>

                <View style={styles.searchComponent}>
                    <Text style={styles.label}>Select departure airport</Text>
                    <DepartureFlightSearch
                        flightData={testAirportData}
                        departureSearchQuery={departureSearchQuery}
                        selectedDepartureCode={selectedDepartureCode}
                        setDepartureSearchQuery={setDepartureSearchQuery}
                        setSelectedDepartureCode={setSelectedDepartureCode}
                    />
                </View>

                <View style={styles.searchComponent}>
                    <Text style={styles.label}>Select arrival airport</Text>
                    <ArrivalFlightSearch
                        flightData={testAirportData}
                        arrivalSearchQuery={arrivalSearchQuery}
                        selectedArrivalCode={selectedArrivalCode}
                        setArrivalSearchQuery={setArrivalSearchQuery}
                        setSelectedArrivalCode={setSelectedArrivalCode}
                    />
                </View>


                <View style={styles.searchComponent}>
                    <Text style={styles.label}>Select departure date</Text>
                    <DateFlightSearch date={departureDate} setDate={setDepartureDate} />
                </View>


                <View style={styles.toggleContainer}>
                    <Switch
                        style={styles.toggle}
                        trackColor={{ false: '#269fc12e', true: '#2891D9' }}
                        thumbColor={addAReturnFlight ? 'white' : 'white'}
                        ios_backgroundColor="#269fc12e"
                        onValueChange={toggleSwitch}
                        value={addAReturnFlight}
                    />
                    <Text>Add a return flight?</Text>
                </View>
                {
                    addAReturnFlight ?
                        <View style={styles.searchComponent}>
                            <Text style={styles.label}>Select return date</Text>
                            <DateFlightSearch date={returnDate} setDate={setReturnDate} />
                            {returnDate && returnDate < departureDate ? <Text style={styles.error}>Return date is before depature date!</Text> : null}
                        </View>
                        :
                        null
                }


                <View style={styles.searchComponent}>
                    <Text style={styles.label}>Select number of adult passengers</Text>
                    <NumberOfAdultsSearch
                        numberOfAdults={numberOfAdults}
                        setNumberOfAdults={setNumberOfAdults}
                    />
                </View>
                <View style={styles.buttonContainer}>
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
                </View>
            </ScrollView>
        </>
    );
}

const styles = StyleSheet.create({
    container: {
        flexGrow: 1,
        padding: 16,
        backgroundColor: '#FFF'
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
    toggleContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-start',
        padding: 20
    },
    toggle: {
        marginRight: 20
    }
});