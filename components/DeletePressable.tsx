import React from 'react';
import { StyleSheet, Text, View, Pressable } from 'react-native';


export default function DeletePressable({ onPressFunc }: any) {


    return (

        <Pressable
            onPress={onPressFunc}>
            <View style={styles.deleteContainer}>
                <Text style={styles.deleteX} >×</Text>
            </View>
        </Pressable>

    );
}

const styles = StyleSheet.create({
    deleteX: {
        fontSize: 16,
        color: '846c5b'
    },
    deleteContainer: {
        backgroundColor: '#EC080890',
        // backgroundColor: '#fbe99f',
        height: 20,
        width: 20,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 10
    }
});
