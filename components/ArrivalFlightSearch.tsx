import React, { useMemo } from 'react';
import { StyleSheet, Text, View, TextInput, FlatList, Pressable } from 'react-native';
import { useTheme } from '../app/ThemeContext';

export default function ArrivalFlightSearch({ flightData, arrivalSearchQuery, selectedArrivalCode, setArrivalSearchQuery, setSelectedArrivalCode }: any) {
    const { mode }: any = useTheme();
    const filteredResults = useMemo(() => {
        if (!arrivalSearchQuery) {
            return []
        }
        const lowerCaseDepQuery = arrivalSearchQuery.toLowerCase()
        return flightData.filter(({ city, code }: any) =>
            city.toLowerCase().includes(lowerCaseDepQuery) ||
            code.toLowerCase().includes(lowerCaseDepQuery)
        )
    }, [arrivalSearchQuery])

    return (
        <View style={styles.container}>

            <View style={styles.airportCodeSelection}>
                <Text style={[styles.labelDescription, { color: mode.text }]}>Selected Airport Code:</Text>
                {selectedArrivalCode ? <View style={styles.airportResultCodeContainer}>
                    <Text style={styles.airportResultCode}>{selectedArrivalCode}</Text>
                </View>
                    :
                    <Text style={styles.label}>no arrival code selected</Text>
                }
            </View>

            <View style={styles.linkContainer} >
                {selectedArrivalCode
                    ?
                    <Pressable onPress={() => setSelectedArrivalCode('')}>
                        <Text style={styles.link} >unselect airport</Text>
                    </Pressable> : null}
            </View>

            <TextInput
                placeholder='Search for cities or airports...'
                clearButtonMode='always'
                style={[styles.input, { color: mode.text, backgroundColor: mode.background }]}
                autoCorrect={false}
                autoCapitalize='words'
                value={arrivalSearchQuery}
                onChangeText={setArrivalSearchQuery}
            />

            {arrivalSearchQuery && filteredResults.length === 0 ? <Text style={styles.error}>No Results Found</Text> : null}

            <FlatList
                scrollEnabled={false}
                data={filteredResults}
                keyExtractor={(item) => `${item.city} ${item.code}`}
                renderItem={({ item }) => (
                    <Pressable
                        style={styles.airportResult}
                        onPress={() => {
                            setSelectedArrivalCode(item.code)
                            setArrivalSearchQuery('')
                        }}
                    >
                        <Text style={styles.airportResultCity}>{item.city}</Text>
                        <View style={styles.airportResultCodeContainer}>
                            <Text style={styles.airportResultCode}>{item.code}</Text>
                        </View>
                    </Pressable>
                )}>
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




