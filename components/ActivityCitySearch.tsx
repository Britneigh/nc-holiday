import React from "react";
import {
  View,
  TextInput,
  ScrollView,
  TouchableOpacity,
  Text,
  StyleSheet,
} from "react-native";

interface City {
  city: string;
  code: string;
  latitude: number;
  longitude: number;
}

interface ActivityCitySearchProps {
  cityData?: City[];
  citySearchQuery: string;
  selectedCityCode: string;
  setCitySearchQuery: (query: string) => void;
  setSelectedCityCode: (code: string) => void;
  setSelectedCityLat: (latitude: number) => void;
  setSelectedCityLong: (longitude: number) => void;
}

export default function ActivityCitySearch({
  cityData = [],
  citySearchQuery,
  selectedCityCode,
  setCitySearchQuery,
  setSelectedCityCode,
  setSelectedCityLat,
  setSelectedCityLong,
}: ActivityCitySearchProps) {
  // Filter cities based on search query (case-insensitive)
  const filteredCities = citySearchQuery.length
    ? cityData.filter((city) =>
        city.city.toLowerCase().includes(citySearchQuery.toLowerCase())
      )
    : [];

  // Handle city selection
  const onSelectCity = (city: City) => {
    setSelectedCityCode(city.code);
    setCitySearchQuery(city.city);
    setSelectedCityLat(city.latitude);
    setSelectedCityLong(city.longitude);
  };

  return (
    <View style={styles.container}>
      <TextInput
        value={citySearchQuery}
        onChangeText={setCitySearchQuery}
        placeholder="Search cities"
        style={styles.input}
        autoCorrect={false}
        autoCapitalize="none"
      />
      {filteredCities.length > 0 && (
        <ScrollView
          style={styles.resultsContainer}
          keyboardShouldPersistTaps="handled"
        >
          {filteredCities.map((city) => (
            <TouchableOpacity
              key={city.code}
              onPress={() => onSelectCity(city)}
              style={[
                styles.cityItem,
                city.code === selectedCityCode && styles.selectedCityItem,
              ]}
            >
              <Text style={styles.cityText}>
                {city.city} ({city.code})
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginVertical: 12,
  },
  input: {
    padding: 12,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 4,
    fontSize: 16,
  },
  resultsContainer: {
    maxHeight: 200,
    borderWidth: 1,
    borderColor: "#ccc",
    borderTopWidth: 0,
    borderRadius: 4,
  },
  cityItem: {
    padding: 12,
    backgroundColor: "white",
  },
  selectedCityItem: {
    backgroundColor: "#e0e0e0",
  },
  cityText: {
    fontSize: 16,
  },
});




