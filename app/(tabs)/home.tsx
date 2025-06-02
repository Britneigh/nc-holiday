import React from 'react';
import { StyleSheet, Text, View, Button, ScrollView } from 'react-native';
import {router} from 'expo-router';
import { AuthContext } from '../../context/AuthContext';
import { useContext } from 'react';

export default function Home() {
  const { isLoggedIn } = useContext(AuthContext);
    return (
        <ScrollView style={styles.container}>
            <View style={styles.block}>
                <View style={styles.rowBlock}><Text>{ isLoggedIn ? "Welcome" : "Welcome guest" }</Text></View>
                 <View style={styles.rowBlock}><Text>Weather info</Text></View>
            </View>
            <View style={styles.largeBlock}>
                <Text>Info on next or current trip</Text>
            </View>
            <View style={styles.buttonView}>
                <Button
            title="View calendar itinerary"
            onPress={() => router.push('/calendar-itinerary')}
             />
            </View>
            <View style={styles.buttonView}>
                <Button
            title="View list itinerary"
            onPress={() => router.push('/list-itinerary')}
             />
            </View>
             <View style={styles.mediumBlock}>
                <Text>Form for search</Text>
            </View>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    block: {
        height: 100,
        borderColor: 'red',
        borderWidth: 2,
        justifyContent: 'space-around',
        alignItems: 'center',
        marginTop: 10,
        marginBottom: 10,
        flexDirection: 'row'
    },
    rowBlock: {
        borderColor: 'red',
        borderWidth: 2,
    },
    largeBlock: {
        height: 400,
        borderColor: 'red',
        borderWidth: 2,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 10,
        marginBottom: 10
    },
    mediumBlock: {
        height: 250,
        borderColor: 'red',
        borderWidth: 2,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 10,
        marginBottom: 10
    },
    buttonView :{
        marginTop: 10,
        marginBottom: 10,

    }
});