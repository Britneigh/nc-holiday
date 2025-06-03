import React, { useState } from 'react';
import { StyleSheet, Text, TextInput, View, Button, Pressable, Switch } from 'react-native';
import { handleSignin } from '../firebase/signIn';
import { router } from 'expo-router';

export const Input = (props: any) => (
    <TextInput
        onChangeText={props.onChangeText}
        value={props.value}
        placeholder={props.placeholder}
        secureTextEntry={props.secureTextEntry}>
    </TextInput>
);

export default function Login() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);

    const toggleSwitch = () => {
        setShowPassword(!showPassword)
    }

    return (
        <View style={styles.container}>
            <Input label="Username:" placeholder="Enter your email here" value={username} onChangeText={setUsername}></Input>
            <Input label="Password:" placeholder="Enter your password here" value={password} onChangeText={setPassword} secureTextEntry={true}></Input>
            {showPassword ? <Text>{password}</Text> : null}
            <Text>Show Password?</Text>
            <Switch
                trackColor={{ false: '#767577', true: '#81b0ff' }}
                thumbColor={showPassword ? '#f5dd4b' : '#f4f3f4'}
                ios_backgroundColor="#3e3e3e"
                onValueChange={toggleSwitch}
                value={showPassword}
            />
            <Button
                onPress={() => {
                    const user: object = handleSignin(username, password)
                    { user ? router.replace('/home') : <Text>No existing user that matches those details. Please check again or sign up.</Text> }
                }}
                title='Log In'
            />
            <Pressable onPress={() => router.push('/signup')}>
                <Text>Don't have an account? Sign up</Text>
            </Pressable>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
});