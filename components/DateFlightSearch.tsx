import { useState } from 'react';
import { StyleSheet, View, TextInput, Pressable, Platform } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';

export default function DateFlightSearch({date, setDate}) {
  
  const [show, setShow] = useState(false);

  const onChange = (event, selectedDate) => {
    setShow(false);
    if (selectedDate) {
      setDate(selectedDate);
    }
  };

  const webOnChange = (event) => {
    const webDateValue = event.target.value;
    setDate(new Date(webDateValue));
  };

  
const formattedDate = date ? date.toISOString().split('T')[0] : null



  return (
    <View style={styles.container}>
      {Platform.OS === 'web' ? (
        <input 
          type='date'
          value={formattedDate}
          onChange={webOnChange}
        />
      ) : (
        <>
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
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 12,
    borderRadius: 8,
  },
});