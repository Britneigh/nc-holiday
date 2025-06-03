import React, { useState } from 'react';
import { StyleSheet, Text, TextInput, View, Button, Pressable, Switch } from 'react-native';
import { handleSignup } from '../../firebase/signUp';
import { useRouter } from 'expo-router';

export const Input = (props: any) => (
    <TextInput
        onChangeText={props.onChangeText}
        value={props.value}
        placeholder={props.placeholder}
        secureTextEntry={props.secureTextEntry}>
    </TextInput>
);


export default function SignUp() {
    const router = useRouter();
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [confirmPassword, setConfirmPassword] = useState('');

    const toggleSwitch = () => {
        setShowPassword(!showPassword)
    }

    return (
        <View style={styles.container}>
            <Input label="Username:" placeholder="Enter your email here" value={username} onChangeText={setUsername}></Input>
            <Input label="Password:" placeholder="Enter your password here" value={password} onChangeText={setPassword} secureTextEntry={true}></Input>
            {showPassword ? <Text>{password}</Text> : null}
            <Input label="Confirm password:" placeholder="Confirm your password" value={confirmPassword} onChangeText={setConfirmPassword} secureTextEntry={true}></Input>
            {showPassword ? <Text>{confirmPassword}</Text> : null}
            {confirmPassword !== password ? <Text>Passwords do not match.</Text> : null}
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
                    const user: object = handleSignup(username, password)
                    { user ? router.navigate('/login') : <Text>An issue occured when trying to sign up.</Text> }
                }}
                title='Sign Up'
            />
            <Pressable onPress={() => router.replace('/login')}>
                <Text>Already have an account? Log In</Text>
            </Pressable>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
});