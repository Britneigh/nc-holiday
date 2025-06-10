import React, { useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { useTheme } from '../app/ThemeContext';

export default function HotelRadiusSearch({radius, setRadius}: any){
    const { mode }: any = useTheme();

    const increment = () => {
        setRadius(radius + 1);
    };

    const decrement = () => {
        if (radius > 1) {
            setRadius(radius - 1);
        }
    };

    return (
        <View style={styles.container}>
            <View >
                <Text style={{ color: mode.text }}>{radius}KM</Text>
                <TouchableOpacity onPress={decrement}>
                    <Text style={{ color: mode.text }}>−</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={increment}>
                    <Text style={{ color: mode.text }}>+</Text>
                </TouchableOpacity>
            </View>
        
        </View>
    )



}

const styles = StyleSheet.create({
    container: {
        flexGrow: 1,
        padding: 16,
        justifyContent: 'center',
    }
});