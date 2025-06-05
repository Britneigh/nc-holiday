import React, { useMemo } from 'react';
import { StyleSheet, Text, View, TextInput, FlatList, Pressable } from 'react-native';


export default function ArrivalFlightSearch({ flightData, arrivalSearchQuery, selectedArrivalCode, setArrivalSearchQuery, setSelectedArrivalCode }) {

    const filteredResults = useMemo(() => {
        if (!arrivalSearchQuery) {
            return []
        }
        const lowerCaseDepQuery = arrivalSearchQuery.toLowerCase()
        return flightData.filter(({ city, code }) =>
            city.toLowerCase().includes(lowerCaseDepQuery) ||
            code.toLowerCase().includes(lowerCaseDepQuery)
        )
    }, [arrivalSearchQuery])

    return (
        <View style={styles.container}>
            <Text>Choose an arrival airport.</Text>
            <Text style={{ fontSize: 16, color: 'black', marginTop: 8 }}
            >Selected Airport Code: {selectedArrivalCode || 'no arrival code selected'}</Text>
            {selectedArrivalCode ? <Pressable onPress={() => setSelectedArrivalCode('')}
            ><Text
                style={styles.link}
            >unselect airport</Text></Pressable> : null}
            {arrivalSearchQuery && filteredResults.length === 0 ? <Text>No Results Found</Text> : null}
            <TextInput
                placeholder='Arrival Airport'
                clearButtonMode='always'
                style={styles.input}
                autoCorrect={false}
                autoCapitalize='words'
                value={arrivalSearchQuery}
                onChangeText={setArrivalSearchQuery}
            />
            <FlatList
                data={filteredResults}
                keyExtractor={(item) => `${item.city} ${item.code}`}
                renderItem={({ item }) => (
                    <Pressable
                        onPress={() => {
                            setSelectedArrivalCode(item.code)
                            setArrivalSearchQuery('')
                        }}
                        style={styles.airportResult}
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
    }
    ,
    input: {
        margin: 5,
        padding: 5,
        borderColor: "red",
        borderWidth: 2
    },
    airportResult: {
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

