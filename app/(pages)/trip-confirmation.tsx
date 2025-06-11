import React from 'react'
import { StyleSheet, Button, Text, View } from 'react-native';
import { router } from 'expo-router';

export default function TripConfirmed() {

  const onPress = () => {
    if (typeof document !== 'undefined' && document.activeElement instanceof HTMLElement) {
      document.activeElement.blur();
    }
    router.replace('/(tabs)/home');
  }

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Trip added!</Text>
      <Text style={styles.text}>You can view all your added trips in the "Trips" tab at the bottom.</Text>
      <Button title='Back to Home' onPress={onPress} />
    </View>

  )
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 16,
    backgroundColor: '#FFF',
    justifyContent: 'center',
    alignItems: 'center'
  },
  header: {
    fontSize: 24,
    fontWeight: '600',
    color: '#333',
    textAlign: 'center',
    marginBottom: 30
  },
  text: {
    fontSize: 16,
    color: '#333',
    textAlign: 'center',
    marginBottom: 30
  }
});