import React, { useState } from 'react';
import { View, FlatList, Text, Pressable, StyleSheet } from 'react-native';
import { useTheme } from '../app/ThemeContext';

const amenities = [
  'DISABLED_FACILITIES', 'SWIMMING_POOL', 'SPA', 'FITNESS_CENTER', 'AIR_CONDITIONING', 'PARKING', 'PETS_ALLOWED', 
  'BEACH', 'ROOM_SERVICE'
];

export default function HotelAmenities({selectedAmenities, setSelectedAmenities}: any) {
  const { mode }: any = useTheme();

  const formatLabel = (value: string) => {
      value = value[0] + value.slice(1,).toLowerCase()
      value = value.replace(/_/g, ' ') // Replace underscores with spaces
      return value
  };
    
  const toggleSelection = (item: string) => {
    setSelectedAmenities(prev =>
      prev.includes(item)
        ? prev.filter(i => i !== item)
        : [...prev, item]
    );
  };

  const renderItem = ({ item }: { item: string }) => {
    const isSelected = selectedAmenities.includes(item);
    return (
      <Pressable
        onPress={() => toggleSelection(item)}
        style={[styles.item, isSelected && styles.selectedItem]}
      >
        <Text style={[styles.text, {color: mode.text}]}>{isSelected ? '☑' : '☐'} {formatLabel(item)}</Text>
      </Pressable>
    );
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={amenities}
        keyExtractor={item => item}
        renderItem={renderItem}
      />
      <Text style={[styles.selectedText, {color: mode.text}]}>
        Selected: {JSON.stringify(selectedAmenities, null, 2)}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
    paddingBottom: 60,
  },
  item: {
    padding: 12,
    borderBottomWidth: 1,
    borderColor: '#eee',
  },
  selectedItem: {
    backgroundColor: '#e6f7ff',
  },
  text: {
    fontSize: 16,
  },
  selectedText: {
    marginTop: 20,
    fontSize: 14,
    fontStyle: 'italic',
  },
});
