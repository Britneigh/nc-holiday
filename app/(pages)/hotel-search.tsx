import React, {useState, useEffect} from 'react';
import { StyleSheet, Button, Text, ScrollView } from 'react-native';
import { router } from 'expo-router';
import { useQueryClient } from '@tanstack/react-query';
import { useIsFocused } from '@react-navigation/native';

import HotelLocationSearch from '@/components/HotelLocationSearch'
import HotelRatingSearch from '@/components/HotelRatingSearch';
import HotelRadiusSearch from '@/components/HotelRadiusSearch';
import HotelAmeneties from '@/components/HotelAmenities';


export default function hotelSearch(){
    
    const [selectedLocationCode, setSelectedLocationCode] = useState('')
    const [radius, setRadius] = useState(5)
    const [rating, setRating] = useState([1]);
    const [selectedAmenities, setSelectedAmenities] = useState<string[]>([]);
    
    const queryClient = useQueryClient();
    const isFocused = useIsFocused();
    
    useEffect(() => {
        if (isFocused) {
            queryClient.removeQueries('flights');
        }
    }, [isFocused]);
    
    const placeholderData = [{ key: 'dummyData' }];

    return (
    
        <ScrollView style={styles.container}>
            <Text>Required: Choose a location:</Text>
                <HotelLocationSearch 
                    selectedLocationCode={selectedLocationCode} setSelectedLocationCode={setSelectedLocationCode} 
                />
            <Text>Optional: Choose a rating:</Text>
                <HotelRatingSearch 
                    rating={rating}
                    setRating={setRating}
                />
            <Text>Optional: How far are you willing to travel?</Text>
                <HotelRadiusSearch
                    radius={radius}
                    setRadius={setRadius}
                />
            <Text>Optional: Choose your amenities:</Text>
                <HotelAmeneties
                    selectedAmenities={selectedAmenities}
                    setSelectedAmenities={setSelectedAmenities}
                />
            <Button 
                title="Search for hotels"
                disabled={!selectedLocationCode ? true : false}
                onPress={() => {
                    const params: any = {
                        selectedLocationCode,
                        rating,
                        radius,
                        selectedAmenities
                    }                   
                    router.push({
                        pathname: '/hotel-results',
                        params,
                    });
                }} 
            />
            
        </ScrollView>
    
    )


}

const styles = StyleSheet.create({
    container: {
        flexGrow: 1,
        padding: 16,
    },
});          
    

// import React from 'react';
// import { StyleSheet, FlatList, Text } from 'react-native';

// import HotelLocationSearch from '@/components/HotelLocationSearch'
// import HotelRatingSearch from '@/components/HotelRatingSearch';
// import HotelQueries from '@/components/HotelQueries';
// import HotelAmeneties from '@/components/HotelAmenities';



// export default function hotelSearch(){
//   const placeholderData = [{ key: 'dummyData' }];

//     return (
//     <FlatList
//       data={placeholderData}
//       renderItem={null}
//       ListHeaderComponent={
//         <>
//             <Text>Choose a location:</Text>
//             <HotelLocationSearch />
//             <Text>Choose a rating:</Text>
//             <HotelRatingSearch />
//             <HotelQueries />
//             <HotelAmeneties />
//         </>
//       }
//      contentContainerStyle={styles.container}
//     />
//     )


// }

// const styles = StyleSheet.create({
//     container: {
//         flexGrow: 1,
//         padding: 16,
//     },
// });          
    