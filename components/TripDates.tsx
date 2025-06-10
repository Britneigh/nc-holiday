import React, { useState } from 'react';
import { StyleSheet, Text, View, TextInput, Pressable, Platform } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import { useTheme } from '../app/ThemeContext';

export default function TripDates({ startDate, setStartDate, endDate, setEndDate}: any) {
  const { mode }: any = useTheme();
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
        <Text style={{ color: mode.text }}>Start Date:</Text>
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
        </View>
        <Text style={{ color: mode.text }}>End Date:</Text>
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
        </View>
        {startDate > endDate ? <Text>End date is before the start date!</Text> : null}
        {startDay < today ? <Text>Start date is in the past!</Text> : null}
    </>
    )
}

const styles = StyleSheet.create({
    container: {
        flexGrow: 1,
        padding: 16
    }
    ,
    input: {
        margin: 5,
        padding: 5,
        borderColor: "red",
        borderWidth: 2
    },
});
