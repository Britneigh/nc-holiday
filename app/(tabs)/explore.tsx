import React, { useState } from 'react';
import { StyleSheet, Text, View, Button, Pressable, ScrollView } from 'react-native';
import { router } from 'expo-router';
import FlightSearch from '../(pages)/flight-search';
import HotelSearch from '../(pages)/hotel-search';
import ActivitySearch from '../(pages)/activity-search';
import CustomPlanAdd from '../(pages)/custom-plan-add';
import { useTheme } from '../ThemeContext';

export default function Explore() {
    const { mode }: any = useTheme();
    const [flightSearchPage, setFlightSearchPage] = useState(true)
    const [hotelSearchPage, setHotelSearchPage] = useState(false)
    const [activitySearchPage, setActivitySearchPage] = useState(false)
    const [customPlanPage, setCustomPlanPage] = useState(false)

    function handleFlightPageSelector() {
        setFlightSearchPage(true)
        setHotelSearchPage(false)
        setActivitySearchPage(false)
        setCustomPlanPage(false)
    }

    function handleHotelPageSelector() {
        setHotelSearchPage(true)
        setFlightSearchPage(false)
        setActivitySearchPage(false)
        setCustomPlanPage(false)
    }

    function handleActivityPageSelector() {
        setActivitySearchPage(true)
        setFlightSearchPage(false)
        setHotelSearchPage(false)
        setCustomPlanPage(false)
    }

    // function handleCustomPageSelector() {
    //     setCustomPlanPage(true)
    //     setFlightSearchPage(false)
    //     setHotelSearchPage(false)
    //     setActivitySearchPage(false)
    // }

    return (
        <>
            <View style={[styles.pageSelection, { backgroundColor: mode.background }]}>
                <ScrollView horizontal={true} >

                    <Pressable
                        onPress={handleFlightPageSelector}
                        style={[
                            styles.searchPageContainer,
                            flightSearchPage && styles.searchPageContainerSelected,
                        ]}
                    >
                        <Text
                            style={[
                                styles.searchPageTitle,
                                flightSearchPage && styles.searchPageTitleSelected,
                            ]}
                        >Search Flights</Text>
                    </Pressable>

                    <Pressable
                        onPress={handleHotelPageSelector}
                        style={[
                            styles.searchPageContainer,
                            hotelSearchPage && styles.searchPageContainerSelected,
                        ]}
                    >
                        <Text
                            style={[
                                styles.searchPageTitle,
                                hotelSearchPage && styles.searchPageTitleSelected,
                            ]}
                        >Search Hotels</Text>
                    </Pressable>

                    <Pressable
                        onPress={handleActivityPageSelector}
                        style={[
                            styles.searchPageContainer,
                            activitySearchPage && styles.searchPageContainerSelected,
                        ]}
                    >
                        <Text
                            style={[
                                styles.searchPageTitle,
                                activitySearchPage && styles.searchPageTitleSelected,
                            ]}
                        >Search Activities</Text>
                    </Pressable>

                    {/* <Pressable
                        onPress={handleCustomPageSelector}
                        style={[
                            styles.searchPageContainer,
                            customPlanPage && styles.searchPageContainerSelected,
                        ]}
                    >
                        <Text
                            style={[
                                styles.searchPageTitle,
                                customPlanPage && styles.searchPageTitleSelected,
                            ]}
                        >Add Custom Plan</Text>
                    </Pressable> */}

                </ScrollView>
            </View>

            {flightSearchPage && <FlightSearch />}
            {hotelSearchPage && <HotelSearch />}
            {activitySearchPage && <ActivitySearch />}
            {customPlanPage && <CustomPlanAdd />}

        </>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#ffffff',
        justifyContent: 'center',
        alignItems: 'center'
    },
    header: {
        fontSize: 24,
        fontWeight: '600',
        color: '#333',
        textAlign: 'center',
        marginBottom: 30
    },
    searchPageContainer: {
        borderRadius: 30,
        backgroundColor: '#269fc12e',
        padding: 10,
        margin: 5
    },
    searchPageTitle: {
        fontSize: 16,
        color: '#2891D9',
        fontWeight: '500',

    },
    searchPageContainerSelected: {
        borderRadius: 30,
        backgroundColor: '#2891D9',
        padding: 10,
        margin: 5
    },
    searchPageTitleSelected: {
        fontSize: 16,
        color: 'white',
        fontWeight: '500',
    },
    pageSelection: {
        backgroundColor: '#ffffff',
        flexDirection: 'row',
        padding: 5
    }
});

