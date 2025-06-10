import React, { useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';


export default function HotelRadiusSearch({radius, setRadius}){

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
                <Text>{radius}KM</Text>
                <TouchableOpacity onPress={decrement}>
                    <Text>−</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={increment}>
                    <Text>+</Text>
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