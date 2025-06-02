import React, { useState } from 'react';
import { StyleSheet, Text, TextInput, View } from 'react-native';

export const Input = (props: any) => (
    <TextInput
    onChangeText={props.onChangeText}
    value={props.value}
    placeholder={props.placeholder}
    secureTextEntry={props.secureTextEntry}>
    </TextInput>
);

const confirmPasswordsMatch = (confirmationPassword: string, password: string) => {
  if (confirmationPassword !== password) {
    alert('Passwords do not match, please try again.');
  }
}

export default function Login() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    return (
        <View style={styles.container}>
            <Input label="Username:" placeholder="Enter your username here" value={username} onChangeText={setUsername}></Input>
            <Input label="Password:" placeholder="Enter your password here" value={password} onChangeText={setPassword} secureTextEntry={true}></Input>
            <Text>username:{username} (tracking for testing)</Text>
            <Text>password:{password} (tracking for testing)</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
});