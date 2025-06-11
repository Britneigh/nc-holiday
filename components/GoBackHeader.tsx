import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { router } from 'expo-router';

export default function GoBackHeader() {
    return (
        <View style={styles.container}>
            <TouchableOpacity onPress={() => router.back()}>
                <Text>← go back</Text>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        justifyContent: 'center',
        padding: 10,
        backgroundColor: '#ffffff'
    },
});