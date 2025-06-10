import React from 'react'
import { StyleSheet, Button, Text, View} from 'react-native';
import { router } from 'expo-router';
import { useTheme } from '../ThemeContext';

export default function TripConfirmed(){
const { mode }: any = useTheme();

const onPress = () => {
  if (typeof document !== 'undefined' && document.activeElement instanceof HTMLElement) {
    document.activeElement.blur();
  }
    router.replace('/(tabs)/home');
}

  return (
    <View>
        <Text style={[styles.text, {color: mode.text}]}>Trip added!</Text>
        <Text style={[styles.text, {color: mode.text}]}>You can view all your added trips in the "Trips" tab at the bottom of your screen.</Text>
        <Button title='Back to Home' onPress={onPress}/>
    </View>
    
  )
}

const styles = StyleSheet.create({
    text: {
        marginTop: 50,
        marginBottom: 50,
        justifyContent: "center",
        alignContent: "center",
        textAlign: "center"
    },
});