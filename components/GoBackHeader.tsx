import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { router } from 'expo-router';
import { useTheme } from '../app/ThemeContext';

export default function GoBackHeader() {
    const { mode }: any = useTheme();

    return (
        <View style={[styles.container, { backgroundColor: mode.background }]}>
            <TouchableOpacity onPress={() => router.back()}>
                <Text style={{ color: mode.text }}>← Go Back</Text>
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