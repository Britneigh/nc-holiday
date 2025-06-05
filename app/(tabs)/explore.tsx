import React from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';
import { router } from 'expo-router';

export default function Explore() {
    return (
        <View style={styles.container}>
            <Text>Explore</Text>
            <Button
                title="Search Flights"
                onPress={() => router.push('/flight-search')}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
});