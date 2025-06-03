import React from 'react';
import { StyleSheet, Text, Button, ScrollView } from 'react-native';
import { router } from 'expo-router';
import { handleSignout } from '../../firebase/signOut';

export default function Settings() {
    return (
        <ScrollView style={styles.container}>
            <Text>Settings</Text>
            <Button
                onPress={() => {
                    const user: object = handleSignout()
                    { user ? router.replace('/login') : <Text>Issue signing out. Try again.</Text> }
                }}
                title='Sign Out'
            />
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
});