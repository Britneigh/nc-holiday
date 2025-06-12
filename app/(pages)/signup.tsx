import React, { useState } from 'react';
import { StyleSheet, Text, TextInput, View, Button, Pressable, Switch } from 'react-native';
import { handleSignup } from '../../firebase/signUp';
import { useRouter } from 'expo-router';
import { useTheme } from '../ThemeContext';

export const Input = (props: any) => (
    <TextInput
        onChangeText={props.onChangeText}
        value={props.value}
        placeholder={props.placeholder}
        secureTextEntry={props.secureTextEntry}>
    </TextInput>
);


export default function SignUp() {
    const { mode }: any = useTheme();
    const router = useRouter();
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [confirmPassword, setConfirmPassword] = useState('');
    const [signupError, setSignupError] = useState(false);
    const [isValid, setIsValid] = useState(true);
    const [error, setError] = useState('');
    const [emailTouched, setEmailTouched] = useState(false);


    const toggleSwitch = () => {
        setShowPassword(!showPassword)
    }

    const handleEmailChange = (input: string) => {
        setUsername(input);

        if (input.trim() === '') {
            setError('');
            setEmailTouched(false);
        }
    };

    const isEmailValid = (email: string) => {
        const regex = /^[\w.-]+@[a-zA-Z\d.-]+\.[a-zA-Z]{2,}$/;
        return regex.test(email);
    };

    const handleEmailBlur = () => {
        setEmailTouched(true);

        if (!isEmailValid(username)) {
            setError('This is not a valid email');
        } else {
            setError('');
        }

    };

    return (
        <View style={[styles.container, { backgroundColor: mode.background }]}>

            <Text style={[styles.header, { color: mode.text }]}>Sign Up</Text>

            <TextInput
                placeholder="Enter your email here"
                value={username}
                onChangeText={handleEmailChange}
                onBlur={handleEmailBlur}
                autoCapitalize='none'
                style={[styles.input, { color: mode.text, backgroundColor: mode.background }]} />
            {error ? <Text style={styles.errorText}>{error}</Text> : null}

            <TextInput
                placeholder="Enter your password here"
                value={password}
                onChangeText={setPassword}
                secureTextEntry={true}
                autoCapitalize='none'
                style={[styles.input, { color: mode.text, backgroundColor: mode.background }]} />


            {showPassword ? <Text style={[styles.showPasswordText, { color: mode.text }]}>{password}</Text> : null}


            <TextInput
                placeholder="Confirm your password"
                value={confirmPassword}
                onChangeText={setConfirmPassword}
                secureTextEntry={true}
                autoCapitalize='none'
                style={[styles.input, { color: mode.text, backgroundColor: mode.background }]} />


            {showPassword ? <Text style={[styles.showPasswordText, { color: mode.text }]}>{confirmPassword}</Text> : null}

            {confirmPassword !== password ? <Text style={styles.errorText}>Passwords do not match.</Text> : null}

            <View style={styles.toggleContainer}>
                <Text style={{ color: mode.text }}>Show Password?</Text>
                <Switch
                    trackColor={{ false: '#269fc12e', true: '#2891D9' }}
                    thumbColor={showPassword ? 'white' : 'white'}
                    ios_backgroundColor="#269fc12e"
                    onValueChange={toggleSwitch}
                    value={showPassword}
                />
            </View>

            {signupError ? <Text style={styles.errorText}>An issue occured when trying to sign up.</Text> : null}

            <Button
                disabled={username && password ? false : true}
                onPress={() => {
                    handleSignup(username, password)
                        .then(() => {
                            router.navigate('/login');
                        })
                        .catch((error) => {
                            setSignupError(true)
                        })
                }}
                title='Sign Up'
            />
            <Pressable onPress={() => router.replace('/login')}>
                <Text style={styles.link}>Already have an account? Log In</Text>
            </Pressable>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
        backgroundColor: '#FFF',
        justifyContent: 'center',

    },
    header: {
        fontSize: 24,
        fontWeight: '600',
        color: '#333',
        textAlign: 'center',
        marginBottom: 30
    },
    input: {
        borderColor: '#ccc',
        borderWidth: 1,
        borderRadius: 8,
        marginTop: 20,
        marginBottom: 20,
        marginLeft: 30,
        marginRight: 30,
        padding: 10,
        fontSize: 16,
        backgroundColor: '#fff',
    },
    toggleContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-evenly',
        padding: 20
    },
    showPasswordText: {
        fontSize: 16,
        fontWeight: '400',
        marginBottom: 10,
        marginLeft: 30,
        color: '#333',
    },
    link: {
        fontSize: 12,
        fontWeight: '400',
        marginBottom: 8,
        color: '#2579CA',
        textDecorationLine: 'underline',
        marginTop: 20,
        textAlign: 'center'
    },
    errorText: {
        fontSize: 12, fontWeight: "400", marginTop: 8, color: "red",
    },
});