import React from 'react';
import { StyleSheet, Text, ScrollView } from 'react-native';
import GoBackHeader from '@/components/GoBackHeader';

export default function CustomPlanAdd() {
    return (
        <>
            <ScrollView style={styles.container}>

                <Text>Custom Plan</Text>
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