import React from 'react';
import { StyleSheet, Text, View, TextInput, Button, Alert } from 'react-native';
import TripDates from './TripDates';
import { router } from 'expo-router';
import { addTrip } from '../firestoreService/trip/addTrip';

export default function TripForm({ tripName, setTripName, location, setLocation, startDate, setStartDate, endDate, setEndDate, tripPicture, setTripPicture }: any) {

  const isValidUrl = (url: string) => {
    const regex = /^(https?:\/\/)?([\w\-]+\.)+[a-z]{2,6}(:\d{1,5})?(\/[\w\-._~:/?#[\]@!$&'()*+,;=]*)?$/i
    return url === '' || regex.test(url)
  };

  const onPress = () => {

    if (!isValidUrl(tripPicture)) {
      Alert.alert("Invalid URL", "Please enter a valid image URL.")
      return
    }

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

  const today = new Date(); today.setHours(0, 0, 0, 0);
  const startDay = new Date(startDate); startDay.setHours(0, 0, 0, 0);


  return (
    <View style={styles.container}>
      <Text style={styles.label}>Trip Name:</Text>
      <TextInput
        placeholder='Input trip name here...'
        clearButtonMode='always'
        style={styles.input}
        autoCorrect={false}
        value={tripName}
        onChangeText={setTripName}
      />
      <Text style={styles.label}>Location:</Text>
      <TextInput
        placeholder='Where are you going?'
        clearButtonMode='always'
        style={styles.input}
        autoCorrect={false}
        value={location}
        onChangeText={setLocation}
      />
      <TripDates startDate={startDate} setStartDate={setStartDate} endDate={endDate} setEndDate={setEndDate} />

      <Text style={styles.label}>Add a photo for your trip (optional)</Text>
      <TextInput
        placeholder="Enter a photo url for your trip"
        clearButtonMode='always'
        style={styles.input}
        autoCorrect={false}
        autoCapitalize='none'
        value={tripPicture}
        onChangeText={setTripPicture}
      />


      <View style={styles.buttonContainer}>
        <Button title="Add Trip" onPress={onPress} disabled={!tripName.trim() || !location.trim() || startDate > endDate || startDay < today} />

      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 16,
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
  label: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 8,
    color: '#333',
  },
  buttonContainer: {
    margin: 30
  },
});

