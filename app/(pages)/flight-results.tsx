import React, { useState } from 'react';
import { StyleSheet, View, ScrollView, Text, ActivityIndicator, Pressable } from 'react-native';
import { useQuery } from '@tanstack/react-query';
import { getAccessToken, getFlightSearchWithDestination } from '../../api';
import { useLocalSearchParams } from 'expo-router';
import GoBackHeader from '@/components/GoBackHeader';
import { Timestamp } from 'firebase/firestore';
import TimeZonePicker from '@/components/TimeZonePicker';
import { timeZoneOptions } from '@/app-data/time-zone-options';
import { formatDateTime } from '@/utils/format-date-and-time';

export default function FlightSearchResults() {

    const { selectedDepartureCode, selectedArrivalCode, departureDate, numberOfAdults, returnDate } = useLocalSearchParams();
    const adults = Number(numberOfAdults);
    const [timeZone, setTimeZone] = useState('UTC')
    const [isNonStop, setIsNonStop] = useState(false)

    const flightsQuery = useQuery({
        queryKey: ['flights', selectedDepartureCode, selectedArrivalCode, departureDate, numberOfAdults, returnDate],
        queryFn: () =>
            getAccessToken().then((token) =>
                getFlightSearchWithDestination(
                    token,
                    selectedDepartureCode as string,
                    selectedArrivalCode as string,
                    departureDate as string,
                    adults,
                    returnDate ? (returnDate as string) : undefined,
                )
            ),
        enabled: !!selectedDepartureCode && !!selectedArrivalCode,
    });

    if (flightsQuery.isLoading) {
        return (
            <>
                <GoBackHeader />
                <View style={styles.loadingAndErrorContainer}>
                    <Text style={styles.loadingMessage}>Searching for flights...</Text>
                    <ActivityIndicator />
                </View>
            </>
        );
    }

    if (flightsQuery.isError) {
        const error = flightsQuery.data?.message || 'Failed to fetch flights.';
        return (
            <>
                <GoBackHeader />
                <View style={styles.loadingAndErrorContainer}>
                    <Text style={styles.error}>{error}</Text>
                </View>
            </>
        );
    }

    if (flightsQuery.data.data.length === 0) {
        return (
            <>
                <GoBackHeader />
                <View style={styles.loadingAndErrorContainer}>
                    <Text style={styles.loadingMessage}>No results found for chosen airports and dates.</Text>
                </View>
            </>
        );
    }

    const carrierDictionary = flightsQuery.data?.dictionaries?.carriers || {};

    return (
        <View style={styles.container}>
            <GoBackHeader />

            <ScrollView>

                <TimeZonePicker timeZone={timeZone} setTimeZone={setTimeZone} />
                <Pressable
                    onPress={() => setIsNonStop(!isNonStop)}
                    style={[styles.optionalChoiceContainer, isNonStop && styles.optionalChoiceContainerSelected]}>
                    <Text style={[styles.optionalChoice, isNonStop && styles.optionalChoiceSelected]}>Non Stop</Text>
                </Pressable>

                {flightsQuery.data.data.map((flight: any, index: number) => {

                    // check format needed for firebase, but think this is correct
                    const price = parseFloat(flight.price.grandTotal);
                    const createdAt = Timestamp.now();
                    const updatedAt = Timestamp.now();

                    // Outbound flight
                    const outboundSegments = flight.itineraries[0].segments;
                    const outboundCarrierCode = outboundSegments[0].carrierCode;
                    const outboundAirline = carrierDictionary[outboundCarrierCode] || outboundCarrierCode;
                    const outboundFlightNumber = `${outboundCarrierCode}${outboundSegments[0].number}`;

                    // check if format is correct to submit to firebase
                    const outboundDetails = {
                        cost: price,
                        departureTime: Timestamp.fromDate(new Date(outboundSegments[0].departure.at)), // I believe in firebase correct format
                        arrivalTime: Timestamp.fromDate(new Date(outboundSegments[outboundSegments.length - 1].arrival.at)), // I believe in firebase correct format
                        departureLocation: outboundSegments[0].departure.iataCode,
                        arrivalLocation: outboundSegments[outboundSegments.length - 1].arrival.iataCode,
                        stops: outboundSegments.length > 1
                            ? outboundSegments.slice(1).map((seg: any) => seg.departure.iataCode).join(', ')
                            : "None",
                        airline: outboundAirline,
                        flightNumber: outboundFlightNumber,
                        isBooked: false,
                        isReturn: false,
                        createdAt,
                        updatedAt,
                    };

                    // Return flight
                    const returnDetails = (!flight.oneWay && flight.itineraries.length > 1)
                        ? (() => {
                            const returnSegments = flight.itineraries[1].segments;
                            const returnCarrierCode = returnSegments[0].carrierCode;
                            const returnAirline = carrierDictionary[returnCarrierCode] || returnCarrierCode;
                            const returnFlightNumber = `${returnCarrierCode}${returnSegments[0].number}`;

                            return {
                                cost: price,
                                departureTime: Timestamp.fromDate(new Date(returnSegments[0].departure.at)),
                                arrivalTime: Timestamp.fromDate(new Date(returnSegments[returnSegments.length - 1].arrival.at)),
                                departureLocation: returnSegments[0].departure.iataCode,
                                arrivalLocation: returnSegments[returnSegments.length - 1].arrival.iataCode,
                                stops: returnSegments.length > 1
                                    ? returnSegments.slice(1).map((seg: any) => seg.departure.iataCode).join(', ')
                                    : "None",
                                airline: returnAirline,
                                flightNumber: returnFlightNumber,
                                isBooked: false,
                                isReturn: true,
                                createdAt,
                                updatedAt,
                            };
                        })()
                        : null;

                    const isRoundTrip = !!returnDetails;

                    const onlyDisplayNonStopCode = isNonStop
                        ? (
                            isRoundTrip
                                ? (outboundDetails.stops === "None" && returnDetails?.stops === "None")
                                : outboundDetails.stops === "None"
                        )
                        : true;

                    if (onlyDisplayNonStopCode) {

                        return (
                            <View key={index} style={isRoundTrip ? styles.roundTripWrapper : styles.flightWrapper}>
                                {isRoundTrip && (
                                    <Text style={styles.roundTripLabel}>Round-trip</Text>
                                )}

                                {/* Outbound */}
                                <View style={styles.card}>
                                    <View style={styles.flightCardHeader}>
                                        <Text style={styles.label}>Outbound Flight</Text>
                                    </View>

                                    <View style={styles.cardData}>
                                        <Text style={styles.cardText}>{`${outboundDetails.airline}`} <Text style={styles.cardText}>{`${outboundDetails.flightNumber}`}</Text></Text>

                                        <View>
                                            <Text style={styles.cardText}>{`From: ${outboundDetails.departureLocation}`}</Text>
                                            <Text style={styles.cardText}> {`${formatDateTime(outboundSegments[0].departure.at, timeZone)} (${timeZoneOptions[timeZone][1]})`}</Text>
                                            <Text>✈️→</Text>
                                            <Text style={styles.cardText}>{`To: ${outboundDetails.arrivalLocation}`}</Text>
                                            <Text style={styles.cardText}>{`Arrival: ${formatDateTime(outboundSegments[outboundSegments.length - 1].arrival.at, timeZone)} (${timeZoneOptions[timeZone][1]})`}</Text>
                                        </View>

                                        <Text style={styles.cardText}>{`Stops: ${outboundDetails.stops}`}</Text>
                                        {!isRoundTrip && <Text style={styles.price}>{`Total: ${price} ${flight.price.currency}`}</Text>}
                                    </View>
                                </View>

                                {/* Return */}
                                {returnDetails && (
                                    <View style={styles.card}>
                                        <View style={styles.flightCardHeader}>
                                            <Text style={styles.label}>Return Flight</Text>
                                        </View>

                                        <View style={styles.cardData}>
                                            <Text style={styles.cardText}>{`${returnDetails.airline}`} <Text style={styles.cardText}>{`${returnDetails.flightNumber}`}</Text></Text>
                                            <View>
                                                <Text style={styles.cardText}>{`From: ${returnDetails.departureLocation}`}</Text>
                                                <Text style={styles.cardText}> {`${formatDateTime(returnDetails.departureTime.toDate().toISOString(), timeZone)} (${timeZoneOptions[timeZone][1]})`}</Text>
                                                <Text>✈️→</Text>
                                                <Text style={styles.cardText}>{`To: ${returnDetails.arrivalLocation}`}</Text>
                                                <Text style={styles.cardText}>{`Arrival: ${formatDateTime(returnDetails.arrivalTime.toDate().toISOString(), timeZone)} (${timeZoneOptions[timeZone][1]})`}</Text>
                                            </View>

                                            <Text style={styles.cardText}>{`Stops: ${returnDetails.stops}`}</Text>
                                        </View>


                                    </View>
                                )}
                                {isRoundTrip && <Text style={styles.price}>{`Total: ${price} ${flight.price.currency}`}</Text>}
                            </View>
                        );
                    }
                }
                )}
            </ScrollView>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        padding: 16,
        flex: 1,
        backgroundColor: '#FFF',
    },
    loadingAndErrorContainer: {
        padding: 16,
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#ffffff',
    },
    loadingMessage: {
        paddingBottom: 30,
    },
    error: {
        fontSize: 12,
        fontWeight: '400',
        marginTop: 8,
        color: 'red',
    },
    flightWrapper: {
        marginBottom: 20,
    },
    roundTripWrapper: {
        marginTop: 15,
        marginBottom: 15,
        padding: 15,
        backgroundColor: '#269FC105',
        borderRadius: 12,
        borderColor: '#269fc12e',
        borderWidth: 1,
        shadowColor: '#000',
        shadowOpacity: 0.04,
        shadowRadius: 5,
        shadowOffset: { width: 0, height: 1 },
        elevation: 1,
    },
    roundTripLabel: {
        color: '#2891D9',
        fontWeight: '600',
        fontSize: 14,
        marginBottom: 8,
        marginLeft: 4,
    },
    card: {
        backgroundColor: '#ffffff',
        borderRadius: 12,
        padding: 0,
        marginTop: 10,
        marginBottom: 5,
        borderColor: '#ccc',
        borderWidth: 1,
        shadowColor: '#000',
        shadowOpacity: 0.05,
        shadowRadius: 4,
        shadowOffset: { width: 0, height: 2 },
        elevation: 2,
    },
    flightCardHeader: {
        backgroundColor: '#269fc12e',
        borderTopLeftRadius: 12,
        borderTopRightRadius: 12
    },
    cardData: {
        padding: 16
    },
    label: {
        fontSize: 16,
        fontWeight: '600',
        margin: 8,
        color: '#2891D9',
    },
    cardText: {
        fontSize: 14,
        color: '#333',
        marginBottom: 4,
    },
    price: {
        fontSize: 16,
        color: '#2891D9',
        fontWeight: 'bold',
        marginTop: 10,
    },
    optionalChoiceContainer: {
        borderRadius: 30,
        backgroundColor: '#269fc12e',
        padding: 10,
        margin: 5,
        justifyContent: 'center',
        alignItems: 'center'
    },
    optionalChoice: {
        fontSize: 16,
        color: '#2891D9',
        fontWeight: '500',

    },
    optionalChoiceContainerSelected: {
        borderRadius: 30,
        backgroundColor: '#2891D9',
        padding: 10,
        margin: 5,
        justifyContent: 'center',
        alignItems: 'center'
    },
    optionalChoiceSelected: {
        fontSize: 16,
        color: 'white',
        fontWeight: '500',
    }
});
