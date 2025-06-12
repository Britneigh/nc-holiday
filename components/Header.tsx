import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { router } from 'expo-router';
import { useTheme } from '../app/ThemeContext';
import { Image } from 'react-native';


export default function Header() {
    const { mode }: any = useTheme();

    return (
        <View style={[styles.container, { backgroundColor: mode.background }]}>
            <TouchableOpacity style={styles.logo} onPress={() => router.navigate('/home')}>
              <View style={{ backgroundColor: "white" }}>
              <Image source={require("../test-data/Logo.png")} style={{}} />
              </View>
            </TouchableOpacity>

            <TouchableOpacity style={styles.settings} onPress={() => router.push('/settings')}>
                <Text style={styles.settingsIcon}>⚙️</Text>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        height: 60,
        borderBottomWidth: 1,
        borderColor: '#ccc',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingLeft: 25,
        paddingRight: 25,

    },
    logo: {
        padding: 5
    },
    settings: {
        padding: 5
    },
    ncText: {
        fontSize: 24,
        fontWeight: '600',
        marginBottom: 8,
        color: 'black',
    },
    holidayText: {
        fontSize: 16,
        fontWeight: '400',
        marginBottom: 8,
        color: '#333',
    },
    settingsIcon: {
        fontSize: 25,
    }

});