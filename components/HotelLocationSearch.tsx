import React, { useMemo, useState } from 'react';
import { StyleSheet, Text, View, TextInput, FlatList, Pressable } from 'react-native';
import { testAirportData } from '@/test-data/testAirportData'
import { useTheme } from '../app/ThemeContext';

export default function HotelLocationSearch({ selectedLocationCode, setSelectedLocationCode }: any) {
    const { mode }: any = useTheme();
    const [locationSearchQuery, setLocationSearchQuery] = useState('')
    const [selectedLocation, setSelectedLocation] = useState('')


    const filteredLocationResults = useMemo(() => {
        if (!locationSearchQuery) {
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

            <View style={styles.airportCodeSelection}>
                <Text style={[styles.labelDescription, { color: mode.text }]}>Selected Location:</Text>
                {selectedLocation ? <View style={styles.airportResultCodeContainer}>
                    <Text style={styles.airportResultCode}>{selectedLocation}</Text>
                </View>
                    :
                    <Text style={styles.label}>no location selected</Text>
                }
            </View>

            <View style={styles.linkContainer} >
                {selectedLocation
                    ?
                    <Pressable onPress={() => setSelectedLocation('')}>
                        <Text style={styles.link} >unselect location</Text>
                    </Pressable> : null}
            </View>


            <TextInput
                placeholder='Search for cities or airports...'
                clearButtonMode='always'
                style={[styles.input, { color: mode.text, backgroundColor: mode.background }]}
                autoCorrect={false}
                autoCapitalize='words'
                value={locationSearchQuery}
                onChangeText={setLocationSearchQuery}
            />
            <FlatList
                scrollEnabled={false}
                data={filteredLocationResults}
                keyExtractor={(item) => `${item.city} ${item.code}`}
                renderItem={({ item }) => (
                    <Pressable
                        onPress={() => {
                            setSelectedLocation(item.city)
                            setSelectedLocationCode(item.code)
                            setLocationSearchQuery('')
                        }}
                        style={styles.airportResult}
                    >

                        <Text style={styles.airportResultCity}>{item.city}</Text>
                        <View style={styles.airportResultCodeContainer}>
                            <Text style={styles.airportResultCode}>{item.code}</Text>
                        </View>
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
        padding: 16,
    },
    label: {
        fontSize: 12,
        fontWeight: '600',
        marginBottom: 8,
        color: '#2891D9',
    },
    labelDescription: {
        fontSize: 12,
        fontWeight: '400',
        marginBottom: 8,
        color: '#333',
    },
    error: {
        fontSize: 12,
        fontWeight: '400',
        marginTop: 8,
        color: 'red',
    },
    input: {
        borderColor: '#ccc',
        borderWidth: 1,
        borderRadius: 8,
        marginTop: 5,
        padding: 10,
        fontSize: 16,
        backgroundColor: '#fff',
    },
    airportResult: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: '#fff',
        borderRadius: 8,
        paddingVertical: 12,
        paddingHorizontal: 16,
        marginVertical: 6,
        borderWidth: 1,
        borderColor: '#ccc',
        shadowColor: '#000',
        shadowOpacity: 0.05,
        shadowRadius: 5,
        shadowOffset: { width: 1, height: 2 },
        elevation: 1,
    },
    airportResultCity: {
        fontSize: 16,
        color: '#333',
        fontWeight: '500',
    },
    airportCodeSelection: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    airportResultCodeContainer: {
        borderRadius: 30,
        backgroundColor: '#269fc12e',
        padding: 10
    },
    airportResultCode: {
        fontSize: 16,
        color: '#2891D9',
        fontWeight: '500',

    },
    linkContainer: {
        justifyContent: 'flex-end',
        flexDirection: 'row',

    },
    link: {
        fontSize: 12,
        fontWeight: '400',
        marginBottom: 8,
        color: '#2579CA',
        textDecorationLine: 'underline',
        marginTop: 5,
    }
});