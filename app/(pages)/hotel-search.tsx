import React from 'react';
import { StyleSheet, FlatList, Text } from 'react-native';

import HotelLocationSearch from '@/components/HotelLocationSearch'
import HotelRatingSearch from '@/components/HotelRatingSearch';
import HotelQueries from '@/components/HotelQueries';
import HotelAmeneties from '@/components/HotelAmenities';



export default function hotelSearch(){
  const placeholderData = [{ key: 'dummyData' }];

    return (
    <FlatList
      data={placeholderData}
      renderItem={null}
      ListHeaderComponent={
        <>
            <Text>Choose a location:</Text>
            <HotelLocationSearch />
            <Text>Choose a rating:</Text>
            <HotelRatingSearch />
            <HotelQueries />
            <HotelAmeneties />
        </>
      }
     contentContainerStyle={styles.container}
    />
    )


}

const styles = StyleSheet.create({
    container: {
        flexGrow: 1,
        padding: 16,
    },
});          
    