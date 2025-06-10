import React, { useState, useEffect } from 'react';
import { StyleSheet, View, ScrollView, Text, Button } from 'react-native';
import { useQuery } from '@tanstack/react-query';
import { getAccessToken, getHotelList, getHotelSearch} from '../../api';
import { useLocalSearchParams } from 'expo-router';
import { useTheme } from '../ThemeContext';

export default function HotelSearchResults(){
    const { mode }: any = useTheme();
    const [token, setToken] = useState('')

    const { 
        selectedLocationCode,
        rating,
        radius,
        selectedAmenities
    } = useLocalSearchParams();

    const hotelsQuery = useQuery({
        queryKey: ['hotels', selectedLocationCode, rating, radius, selectedAmenities],
        queryFn: () =>
            getAccessToken().then((token) => {
                setToken(token)
                return getHotelList(token, selectedLocationCode, rating, radius, selectedAmenities)
            })
            .then((response)=>{
                getHotelSearch(token, response)
            })
            
    })

    if (hotelsQuery.isLoading) {
        return <Text style={{ color: mode.text }}>Loading</Text>
    };

    return (
        <ScrollView>
            
        </ScrollView>
    )

}