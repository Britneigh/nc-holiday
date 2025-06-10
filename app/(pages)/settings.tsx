import React from 'react';
import { StyleSheet, Text, Button, View } from 'react-native';
import { router } from 'expo-router';
import { handleSignout } from '../../firebase/signOut';
import GoBackHeader from '@/components/GoBackHeader';

export default function Settings() {
    return (
        <>
            <GoBackHeader></GoBackHeader>
            <View style={styles.container}>
                <Text style={styles.header}>Settings</Text>
                <Button
                    onPress={() => {
                        const user: object = handleSignout()
                        { user ? router.replace('/login') : <Text>Issue signing out. Try again.</Text> }
                    }}
                    title='Sign Out'
                />
            </View>
        </>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#ffffff',
        justifyContent: 'center'

    },
    header: {
        fontSize: 24,
        fontWeight: '600',
        color: '#333',
        textAlign: 'center',
        marginBottom: 30
    },
});