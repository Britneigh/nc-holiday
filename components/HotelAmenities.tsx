import React, { useState } from 'react';
import { View, FlatList, Text, Pressable, StyleSheet } from 'react-native';

const amenities = [
  'SWIMMING_POOL', 'SPA', 'FITNESS_CENTER', 'AIR_CONDITIONING', 'RESTAURANT',
  'PARKING', 'PETS_ALLOWED', 
  'DISABLED_FACILITIES', 'MEETING_ROOMS', 'NO_KID_ALLOWED', 'TENNIS',
  'GOLF', 'KITCHEN', 'ANIMAL_WATCHING', 'BABY-SITTING', 'BEACH', 'CASINO',
  'JACUZZI', 'SAUNA', 'SOLARIUM', 'MASSAGE', 'VALET_PARKING', 'BAR or LOUNGE',
  'KIDS_WELCOME', 'NO_PORN_FILMS', 'MINIBAR', 'TELEVISION', 
  'ROOM_SERVICE'
];

export default function HotelAmeneties() {

    const formatLabel = (value: string) => {
        value = value[0] + value.slice(1,).toLowerCase()
        value = value.replace(/_/g, ' ') // Replace underscores with spaces
        return value
    };

  

  const [selectedItems, setSelectedItems] = useState<string[]>([]);

  const toggleSelection = (item: string) => {
    setSelectedItems(prev =>
      prev.includes(item)
        ? prev.filter(i => i !== item)
        : [...prev, item]
    );
  };

  const renderItem = ({ item }: { item: string }) => {
    const isSelected = selectedItems.includes(item);
    return (
      <Pressable
        onPress={() => toggleSelection(item)}
        style={[styles.item, isSelected && styles.selectedItem]}
      >
        <Text style={styles.text}>{isSelected ? '☑' : '☐'} {formatLabel(item)}</Text>
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
      <Text style={styles.selectedText}>
        Selected: {JSON.stringify(selectedItems, null, 2)}
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
