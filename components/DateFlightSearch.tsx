import { useState } from 'react';
import { StyleSheet, View, TextInput, Pressable, Platform, Text } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import { useTheme } from '../app/ThemeContext';

export default function DateFlightSearch({ date, setDate }: any) {
  const { mode }: any = useTheme();
  const [show, setShow] = useState(false);

  const onChange = (event: any, selectedDate: any) => {
    setShow(false);
    if (selectedDate) {
      setDate(selectedDate);
    }
  };

  const webOnChange = (event: any) => {
    const webDateValue = event.target.value;
    setDate(new Date(webDateValue));
  };


  const formattedDate = date ? date.toISOString().split('T')[0] : null



  return (
    <View style={styles.container}>
      {Platform.OS === 'web' ? (
        <>
          <Text style={[styles.labelDescription, { color: mode.text }]}>Selected Date:</Text>
          <input
            type='date'
            value={formattedDate}
            onChange={webOnChange}
          />
        </>
      ) : (
        <>
          <Text style={[styles.labelDescription, { color: mode.text }]}>Selected Date:</Text>
          <Pressable onPress={() => setShow(true)}>
            <TextInput
              value={formattedDate}
              editable={false}
              pointerEvents="none"
              style={styles.input}
            />
          </Pressable>
          {show && (
            <DateTimePicker
              value={date ?? new Date()}
              mode="date"
              display={Platform.OS === 'ios' ? 'inline' : 'default'}
              onChange={onChange}
            />
          )}
        </>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
  },
  input: {
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 8,
    marginTop: 5,
    padding: 10,
    fontSize: 16,
    backgroundColor: '#fff',
  },
  labelDescription: {
    fontSize: 12,
    fontWeight: '400',
    marginBottom: 8,
    color: '#333',
  },
});