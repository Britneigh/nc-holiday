import React from 'react';
import { StyleSheet, Text, ScrollView } from 'react-native';




export default function CustomHotel() {



    return (

        <ScrollView style={styles.container}>
            <Text>custom hotel add</Text>
        </ScrollView>

    )


}

const styles = StyleSheet.create({
    container: {
        flexGrow: 1,
        padding: 16,
    },
});

