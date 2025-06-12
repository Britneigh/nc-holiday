import React from "react";
import {
  View,
  TextInput,
  ScrollView,
  TouchableOpacity,
  Text,
  StyleSheet,
  Pressable,
} from "react-native";
import { useTheme } from '../app/ThemeContext';

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
  const { mode }: any = useTheme();
  const filteredCities = citySearchQuery.length
    ? cityData.filter((city) =>
      city.city.toLowerCase().includes(citySearchQuery.toLowerCase())
    )
    : [];

  const onSelectCity = (city: City) => {
    setSelectedCityCode(city.code);
    setCitySearchQuery(city.city);
    setSelectedCityLat(city.latitude);
    setSelectedCityLong(city.longitude);
  };

  return (
    <View style={styles.container}>
      <View style={styles.codeSelection}>
        <Text style={[styles.labelDescription, { color: mode.text }]}>Selected City:</Text>
        {selectedCityCode ? (
          <View style={styles.codeBadge}>
            <Text style={styles.codeText}>{selectedCityCode}</Text>
          </View>
        ) : (
          <Text style={styles.label}>No city selected</Text>
        )}
      </View>

      <View style={styles.linkContainer}>
        {selectedCityCode && (
          <Pressable onPress={() => setSelectedCityCode("")}>
            <Text style={styles.link}>Unselect city</Text>
          </Pressable>
        )}
      </View>

      <TextInput
        value={citySearchQuery}
        onChangeText={setCitySearchQuery}
        placeholder="Search cities..."
        style={[styles.input, { color: mode.text, backgroundColor: mode.background }]}
        autoCorrect={false}
        autoCapitalize="words"
        clearButtonMode="while-editing"
      />

      {filteredCities.length > 0 && (
        <ScrollView
          style={styles.container}
          keyboardShouldPersistTaps="handled"
        >
          <View style={styles.resultsContainer}>
            {filteredCities.map((city) => (
              <Pressable
                key={city.code}
                onPress={() => {
                  onSelectCity(city)
                  setCitySearchQuery('')
                }}
                style={styles.resultItem}
              >
                <Text style={styles.resultCity}>{city.city}</Text>
                <View style={styles.codeBadge}>
                  <Text style={styles.codeText}>{city.code}</Text>
                </View>
              </Pressable>
            ))}
          </View>
        </ScrollView>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    // flexGrow: 1,
    padding: 16,
  },
  label: {
    fontSize: 12,
    fontWeight: "600",
    marginBottom: 8,
    color: "#2891D9",
  },
  labelDescription: {
    fontSize: 12,
    fontWeight: "400",
    marginBottom: 8,
    color: "#333",
  },
  codeSelection: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  codeBadge: {
    borderRadius: 30,
    backgroundColor: "#269fc12e",
    padding: 10,
  },
  codeText: {
    fontSize: 16,
    color: "#2891D9",
    fontWeight: "500",
  },
  linkContainer: {
    justifyContent: "flex-end",
    flexDirection: "row",
  },
  link: {
    fontSize: 12,
    fontWeight: "400",
    marginBottom: 8,
    color: "#2579CA",
    textDecorationLine: "underline",
    marginTop: 5,
  },
  input: {
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: 8,
    marginTop: 5,
    padding: 10,
    fontSize: 16,
    backgroundColor: "#fff",
  },
  resultsContainer: {
    marginTop: 8,
    // maxHeight: 200,
  },
  resultItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "#fff",
    borderRadius: 8,
    paddingVertical: 12,
    paddingHorizontal: 16,
    marginVertical: 6,
    borderWidth: 1,
    borderColor: "#ccc",
    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowRadius: 5,
    shadowOffset: { width: 1, height: 2 },
    elevation: 1,
  },
  resultCity: {
    fontSize: 16,
    color: "#333",
    fontWeight: "500",
  },
});





