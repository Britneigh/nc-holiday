import React, { useMemo } from 'react';
import { StyleSheet, Text, View, TextInput, FlatList, Pressable } from 'react-native';


export default function DepartureFlightSearch({ flightData, departureSearchQuery, selectedDepartureCode, setDepartureSearchQuery, setSelectedDepartureCode }) {

    const filteredResults = useMemo(() => {
        if (!departureSearchQuery) {
            return []
        }
        const lowerCaseDepQuery = departureSearchQuery.toLowerCase()

        return flightData.filter(({ city, code }) =>
            city.toLowerCase().includes(lowerCaseDepQuery) ||
            code.toLowerCase().includes(lowerCaseDepQuery)
        )
    }, [departureSearchQuery])

    return (
        <View style={styles.container}>
            <Text>Choose a departure airport.</Text>
            <Text style={{ fontSize: 16, color: 'black', marginTop: 8 }}
            >Selected Airport Code: {selectedDepartureCode || 'no departure code selected'}</Text>
            {selectedDepartureCode ? <Pressable onPress={() => setSelectedDepartureCode('')}
            ><Text
                style={styles.link}
            >unselect airport</Text></Pressable> : null}
            {departureSearchQuery && filteredResults.length === 0 ? <Text>No Results Found</Text> : null}
            <TextInput
                placeholder='Search for cities or airports...'
                clearButtonMode='always'
                style={styles.input}
                autoCorrect={false}
                autoCapitalize='words'
                value={departureSearchQuery}
                onChangeText={setDepartureSearchQuery}
            />
            <FlatList
                data={filteredResults}
                keyExtractor={(item) => `${item.city} ${item.code}`}
                renderItem={({ item }) => (
                    <Pressable
                        onPress={() => {
                            setSelectedDepartureCode(item.code)
                            setDepartureSearchQuery('')
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

