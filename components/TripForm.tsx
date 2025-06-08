import React from 'react';
import { StyleSheet, Text, View, TextInput, Button, Alert } from 'react-native';
import TripDates from './TripDates';
import { TripPictures } from './TripPictures';
import { router } from 'expo-router';
import { addTrip } from '../firestoreService/trip/addTrip';

export default function TripForm({ tripName, setTripName, location, setLocation, startDate, setStartDate, endDate, setEndDate, tripPictures, setTripPictures }: any) {

const onPress = () => {
  if (typeof document !== 'undefined' && document.activeElement instanceof HTMLElement) {
    document.activeElement.blur();
  }
 
  const tripDetails: any = {
    tripName,   
    location,   
    startDate,
    endDate,   
    activities: [],
  };
  
  addTrip(tripDetails)
    .then((newTripId) => {
      if (newTripId) {
        console.log("Trip created with ID:", newTripId);
        router.navigate('/trip-confirmation');
      } else {
        Alert.alert("Failed to add trip, please try again.")
      }
    })
    .catch((error) => {
        Alert.alert(`Error: ${error}, "There was an error adding your trip, please try again.`)
    });
}

    return (
        <View style={styles.container}>
            <Text>Trip Name:</Text>
            <TextInput
                placeholder='Input trip name here...'
                clearButtonMode='always'
                style={styles.input}
                autoCorrect={false}
                value={tripName}
                onChangeText={setTripName}
            />
            <Text>Location:</Text>
            <TextInput
                placeholder='Where are you going?'
                clearButtonMode='always'
                style={styles.input}
                autoCorrect={false}
                value={location}
                onChangeText={setLocation}
            />
        <TripDates startDate={startDate} setStartDate={setStartDate} endDate={endDate} setEndDate={setEndDate}/>
        <TripPictures tripPictures={tripPictures} setTripPictures={setTripPictures}/>
        <Button title="Add Trip" onPress={onPress} disabled={!tripName.trim() || !location.trim()}/>
    </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flexGrow: 1,
        padding: 16
    },
    input: {
        margin: 5,
        padding: 5,
        borderColor: "red",
        borderWidth: 2
    },
});

