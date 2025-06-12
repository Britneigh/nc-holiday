import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, Button, View, Switch } from 'react-native';
import { router } from 'expo-router';
import { handleSignout } from '../../firebase/signOut';
import GoBackHeader from '@/components/GoBackHeader';
import { auth, db } from "../../firebaseConfig";
import { doc, setDoc, getDoc, updateDoc } from 'firebase/firestore';
import { useTheme } from '../ThemeContext';
import { currencyList } from '../currencies';
import RNPickerSelect from 'react-native-picker-select';

export default function Settings() {
    const user = auth.currentUser;
    const { isDarkMode, switchMode, mode }: any = useTheme();
    const [mainCurrency, setMainCurrency] = useState('');
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {

        if (user?.uid) {
            const userRef = doc(db, 'users', user.uid);
            getDoc(userRef)
                .then((userSnap: any) => {
                    if (userSnap.exists()) {
                        const data = userSnap.data();
                        console.log("User data:", data);
                        console.log("Main currency:", data.mainCurrency);
                        if (data.mainCurrency) {
                            setMainCurrency(data.mainCurrency);
                        }
                    } else {
                        return setDoc(userRef, {
                            email: user.email,
                            mainCurrency: 'GBP'
                        }).then(() => {
                            setMainCurrency('GBP');
                        });
                    }
                })
                .catch((error) => {
                    setError("Error fetching or creating user doc:")
                    throw error;
                });
        }
    }, [user, mainCurrency]);


    const handleCurrencyChange = (selectedCurrency: string) => {
        setMainCurrency(selectedCurrency);

        if (user?.uid) {
            const userRef = doc(db, 'users', user.uid);
            updateDoc(userRef, {
                mainCurrency: selectedCurrency
            })
                .then(() => {
                    console.log("Main currency updated in Firestore:", selectedCurrency);
                })
                .catch((err) => {
                    setError("Error updating main currency")
                    throw err;
                });
        }
    };

    return (
        <>
            <GoBackHeader />
            <View style={[styles.container, { backgroundColor: mode.background }]}>
                <Text style={[styles.header, { color: mode.text }]}>Settings</Text>
                <Text style={{ color: mode.text }}>Email: {user?.email}</Text>
                <Text style={{ color: mode.text }}>Main Currency:
                    {mainCurrency && <Text style={{ color: mode.text, fontWeight: 'bold' }}> {mainCurrency}</Text>}
                </Text>
                <RNPickerSelect
                    onValueChange={handleCurrencyChange}
                    value={mainCurrency}
                    items={currencyList.map((currency) => ({
                        label: `${currency.code} - ${currency.name}`,
                        value: currency.code,
                    }))}
                    style={{
                        inputIOS: {
                            color: 'black',
                            padding: 12,
                            backgroundColor: 'white',
                            borderRadius: 4,
                        },
                        inputAndroid: {
                            color: 'black',
                            padding: 12,
                            backgroundColor: 'white',
                            borderRadius: 4,
                        },
                    }}
                />
                {error ? <Text>{error}</Text> : null}
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
        textAlign: 'center',
        gap: 20
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