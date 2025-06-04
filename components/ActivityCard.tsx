import React from 'react';
import { StyleSheet, Text, TouchableOpacity } from 'react-native';
import { router } from 'expo-router';

export default function ActivityCard() {
    return (
        <TouchableOpacity style={styles.container} onPress={() => router.push('/activity-info')}>
            <Text>A clickable component with info about a activity</Text>
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    container: {
        height: 150,
        borderColor: 'red',
        borderWidth: 2,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 10,
        marginBottom: 10
    },
});