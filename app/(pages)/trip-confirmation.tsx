import React from 'react'
import { StyleSheet, Button, Text, View} from 'react-native';
import { router } from 'expo-router';

export default function TripConfirmed(){

const onPress = () => {
  if (typeof document !== 'undefined' && document.activeElement instanceof HTMLElement) {
    document.activeElement.blur();
  }
    router.replace('/(tabs)/home');
}

  return (
    <View>
        <Text style={styles.text}>Trip added!</Text>
        <Text style={styles.text}>You can view all your added trips in "View Trips"</Text>
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