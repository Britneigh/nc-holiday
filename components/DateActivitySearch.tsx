import { useState } from "react";
import {
  StyleSheet,
  View,
  TextInput,
  Pressable,
  Platform,
  Text,
} from "react-native";
import DateTimePicker from "@react-native-community/datetimepicker";

export default function DateActivitySearch({ date, setDate }: any) {
  const [show, setShow] = useState(false);

  const onChange = (event: any, selectedDate: Date | undefined) => {
    setShow(false);
    if (selectedDate && selectedDate.getTime() !== date.getTime()) {
      setDate(selectedDate);
    }
  };

  const webOnChange = (event: any) => {
    const webDateValue = event.target.value;
    const newDate = new Date(webDateValue);
    if (!isNaN(newDate.getTime())) {
      setDate(newDate);
    }
  };

  const formattedDate = date ? date.toISOString().split("T")[0] : "";

  return (
    <View style={styles.container}>
      {Platform.OS === "web" ? (
        <>
          <label>
            <input type="date" value={formattedDate} onChange={webOnChange} />
          </label>
        </>
      ) : (
        <>
          <Pressable onPress={() => setShow(true)}>
            <TextInput
              value={formattedDate}
              editable={false}
              pointerEvents="none"
              style={[styles.input]}
            />
          </Pressable>
          {show && (
            <DateTimePicker
              value={date ?? new Date()}
              mode="date"
              display={Platform.OS === "ios" ? "inline" : "default"}
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
    borderColor: "#ccc",
    padding: 12,
    borderRadius: 8,
  },
});


