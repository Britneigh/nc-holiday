import React, { useState, useEffect } from 'react';
import { StyleSheet, ScrollView, Text, Button } from 'react-native';
import { router } from 'expo-router';

import HotelLocationSearch from '@/components/HotelLocationSearch'
import HotelRatingSearch from '@/components/HotelRatingSearch';
import HotelQueries from '@/components/HotelQueries';
import HotelAmeneties from '@/components/HotelAmenities';



export default function hotelSearch(){

    return (
        <ScrollView style={styles.container}>
            <Text>Choose a location:</Text>
            <HotelLocationSearch />
            <Text>Choose a rating:</Text>
            <HotelRatingSearch />
            <HotelQueries />
            <HotelAmeneties />
        </ScrollView>
    )


}

const styles = StyleSheet.create({
    container: {
        flexGrow: 1,
        padding: 16,
    },
});          
    