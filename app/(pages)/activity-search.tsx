import React from 'react';
import { StyleSheet, Text, ScrollView } from 'react-native';
import GoBackHeader from '@/components/GoBackHeader';

export default function ActivitySearch() {
    return (
        <>
            <ScrollView style={styles.container}>

                <Text>Activity Search</Text>
            </ScrollView>
        </>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#ffffff'
    },
});