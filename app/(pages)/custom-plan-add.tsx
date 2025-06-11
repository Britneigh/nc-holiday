import React, { useState } from 'react';
import { StyleSheet, Text, View, Button, Pressable, ScrollView } from 'react-native';
import { router } from 'expo-router';
import FlightSearch from '../(pages)/flight-search';
import CustomHotel from './custom-hotel';
import CustomActivity from './custom-activity';
import CustomFlight from './custom-flight';


export default function CustomPlanAdd() {

    const [customFlightPage, setCustomFlightPage] = useState(true)
    const [customHotelPage, setCustomHotelPage] = useState(false)
    const [customActivityPage, setCustomActivityPage] = useState(false)


    function handleFlightPageSelector() {
        setCustomFlightPage(true)
        setCustomHotelPage(false)
        setCustomActivityPage(false)

    }

    function handleHotelPageSelector() {
        setCustomHotelPage(true)
        setCustomFlightPage(false)
        setCustomActivityPage(false)

    }

    function handleActivityPageSelector() {
        setCustomActivityPage(true)
        setCustomFlightPage(false)
        setCustomHotelPage(false)
    }


    return (
        <>
            <View style={styles.pageSelection}>
                <ScrollView horizontal={true} >

                    <Pressable
                        onPress={handleFlightPageSelector}
                        style={[
                            styles.searchPageContainer,
                            customFlightPage && styles.searchPageContainerSelected,
                        ]}
                    >
                        <Text
                            style={[
                                styles.searchPageTitle,
                                customFlightPage && styles.searchPageTitleSelected,
                            ]}
                        >Custom Flight</Text>
                    </Pressable>

                    <Pressable
                        onPress={handleHotelPageSelector}
                        style={[
                            styles.searchPageContainer,
                            customHotelPage && styles.searchPageContainerSelected,
                        ]}
                    >
                        <Text
                            style={[
                                styles.searchPageTitle,
                                customHotelPage && styles.searchPageTitleSelected,
                            ]}
                        >Custom Hotel</Text>
                    </Pressable>

                    <Pressable
                        onPress={handleActivityPageSelector}
                        style={[
                            styles.searchPageContainer,
                            customActivityPage && styles.searchPageContainerSelected,
                        ]}
                    >
                        <Text
                            style={[
                                styles.searchPageTitle,
                                customActivityPage && styles.searchPageTitleSelected,
                            ]}
                        >Custom Activity</Text>
                    </Pressable>


                </ScrollView>
            </View>

            {customFlightPage && <CustomFlight />}
            {customHotelPage && <CustomHotel />}
            {customActivityPage && <CustomActivity />}


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

