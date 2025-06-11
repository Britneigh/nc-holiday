import React, { useState } from 'react';
import { StyleSheet, Text, View, TextInput, Pressable, Platform } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';

export default function TripDates({ startDate, setStartDate, endDate, setEndDate }: any) {

  const [showStart, setShowStart] = useState(false);
  const [showEnd, setShowEnd] = useState(false);

  const onChangeStart = (event: any, selectedDate: Date | undefined) => {
    setShowStart(false);
    if (selectedDate) setStartDate(selectedDate);
  };

  const onChangeEnd = (event: any, selectedDate: Date | undefined) => {
    setShowEnd(false);
    if (selectedDate) setEndDate(selectedDate);
  };

  const webOnChangeStart = (event: any) => {
    const webDateValue = event.target.value;
    setStartDate(new Date(webDateValue));
  };

  const webOnChangeEnd = (event: any) => {
    const webDateValue = event.target.value;
    setEndDate(new Date(webDateValue));
  };

  const formattedStartDate = startDate ? startDate.toISOString().split('T')[0] : ''
  const formattedEndDate = endDate ? endDate.toISOString().split('T')[0] : ''

  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const startDay = new Date(startDate);
  startDay.setHours(0, 0, 0, 0);

  return (
    <>
      <Text style={styles.label}>Start Date:</Text>
      <View style={styles.container}>
        {Platform.OS === 'web' ? (
          <input
            type='date'
            value={formattedStartDate}
            onChange={webOnChangeStart}
          />
        ) : (
          <>
            <Pressable onPress={() => setShowStart(true)}>
              <TextInput
                value={formattedStartDate}
                editable={false}
                pointerEvents="none"
                style={styles.input}
              />
            </Pressable>
            {showStart && (
              <DateTimePicker
                value={startDate ?? new Date()}
                mode="date"
                display={Platform.OS === 'ios' ? 'inline' : 'default'}
                onChange={onChangeStart}
              />
            )}
          </>
        )}
        {startDay < today ? <Text style={styles.error}>Start date is in the past!</Text> : null}
      </View>
      <Text style={styles.label}>End Date:</Text>
      <View style={styles.container}>
        {Platform.OS === 'web' ? (
          <input
            type='date'
            value={formattedEndDate}
            onChange={webOnChangeEnd}
          />
        ) : (
          <>
            <Pressable onPress={() => setShowEnd(true)}>
              <TextInput
                value={formattedEndDate}
                editable={false}
                pointerEvents="none"
                style={styles.input}
              />
            </Pressable>
            {showEnd && (
              <DateTimePicker
                value={endDate ?? new Date()}
                mode="date"
                display={Platform.OS === 'ios' ? 'inline' : 'default'}
                onChange={onChangeEnd}
              />
            )}
          </>
        )}
        {startDate > endDate ? <Text style={styles.error}>End date is before the start date!</Text> : null}
      </View>
    </>
  )
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
  },
  input: {
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 8,
    marginTop: 10,
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
  error: {
    fontSize: 12,
    fontWeight: '400',
    margin: 20,
    textAlign: 'center',
    color: 'red',
  },
});
