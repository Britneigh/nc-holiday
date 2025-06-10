import React from 'react';
import { StyleSheet, Text, Button, View, Switch } from 'react-native';
import { router } from 'expo-router';
import { handleSignout } from '../../firebase/signOut';
import GoBackHeader from '@/components/GoBackHeader';
import { auth } from "../../firebaseConfig";
import { useTheme } from '../ThemeContext';

export default function Settings() {
      const user = auth.currentUser;
      const { isDarkMode, switchMode, mode }: any = useTheme();

    return (
        <>
            <GoBackHeader/>
            <View style={[styles.container, { backgroundColor: mode.background }]}>
                <Text style={[styles.header, { color: mode.text }]}>Settings</Text>
                <Text style={{ color: mode.text }}>Email: {user?.email}</Text>
                <View style={styles.toggleContainer}>
                    <Text style={{ color: mode.text }}>Toggle light/dark mode: </Text>
                    <Switch
                        style={styles.toggle}
                        trackColor={{ false: '#269fc12e', true: '#2891D9' }}
                        thumbColor={isDarkMode ? 'white' : 'white'}
                        ios_backgroundColor="#269fc12e"
                        onValueChange={switchMode}
                        value={isDarkMode}
                    />
                </View>
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
        justifyContent: 'center',
        alignItems: 'center',
        textAlign: 'center'
    },
    header: {
        fontSize: 24,
        fontWeight: '600',
        color: '#333',
        textAlign: 'center',
        marginBottom: 30
    },
    toggleContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-start',
        padding: 20
    },
    toggle: {
        marginRight: 20
    }
});