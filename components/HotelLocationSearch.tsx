import React, { useMemo, useState } from 'react';
import { StyleSheet, Text, View, TextInput, FlatList, Pressable } from 'react-native';
import {testAirportData} from '@/test-data/testAirportData'


export default function HotelLocationSearch({selectedLocationCode, setSelectedLocationCode}){

    const [locationSearchQuery, setLocationSearchQuery] = useState('')
    const [selectedLocation, setSelectedLocation] = useState('')
    

    
    const filteredLocationResults = useMemo(()=>{
        if (!locationSearchQuery){
            return []
        }

        const lowerCaseLocationQuery = locationSearchQuery.toLowerCase()

        return testAirportData.filter(({ city, code }) =>
            city.toLowerCase().includes(lowerCaseLocationQuery) ||
            code.toLowerCase().includes(lowerCaseLocationQuery)
        )
        
    }, [locationSearchQuery]) 

    return (
        <View style={styles.container}>
            <Text style={{ fontSize: 16, color: 'black', marginTop: 8 }}>
            {selectedLocationCode
                ? `Selected Location: ${selectedLocation} - ${selectedLocationCode}`
                : 'No location selected'}
            </Text>
            {selectedLocationCode ? <Pressable onPress={() => {
                setSelectedLocation('');
                setSelectedLocationCode('');
                }}>
            <Text
                style={styles.link}
            >Deselect location</Text></Pressable> : null}
            {locationSearchQuery && filteredLocationResults.length === 0 ? <Text>No Results Found</Text> : null}
            <TextInput
                placeholder='Search for cities or airports...'
                clearButtonMode='always'
                style={styles.input}
                autoCorrect={false}
                autoCapitalize='words'
                value={locationSearchQuery}
                onChangeText={setLocationSearchQuery}
            />
            <FlatList
                data={filteredLocationResults}
                keyExtractor={(item) => `${item.city} ${item.code}`}
                renderItem={({ item }) => (
                    <Pressable
                        onPress={() => {
                            setSelectedLocation(item.city)
                            setSelectedLocationCode(item.code)
                            setLocationSearchQuery('')
                        }}
                        style={styles.cityResult}
                    >
                        <Text>{item.city} - {item.code}</Text>
                    </Pressable>
                )}
            >
            </FlatList>
        </View>
    );

}


const styles = StyleSheet.create({
    container: {
        flexGrow: 1,
        padding: 16
    },
    input: {
        margin: 5,
        padding: 5,
        borderColor: "red",
        borderWidth: 2
    },
    cityResult: {
        margin: 5,
        padding: 5,
        borderColor: "grey",
        borderWidth: 2
    },
    link: {
        color: 'blue',
        textDecorationLine: 'underline'
    }
});
