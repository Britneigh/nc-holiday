import React, { useState } from 'react';
import { StyleSheet, Text, View, Button, Image, TouchableOpacity, ScrollView } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faSquareXmark } from '@fortawesome/free-solid-svg-icons';
import { useTheme } from '../app/ThemeContext';

export const TripPictures = ({tripPictures, setTripPictures} : any) => {
    const { mode }: any = useTheme();
    const [isUploading, setIsUpLoading] = useState(false);

    const deleteIcon = <FontAwesomeIcon icon={faSquareXmark}></FontAwesomeIcon>

    const handleRemove = (selectedIndex: number) => {
    const newTripPicsArr = tripPictures.filter((img: string, index: number) => index !== selectedIndex);
    setTripPictures(newTripPicsArr);
    }

    const selectImage = () => {
    setIsUpLoading(true)
        ImagePicker.requestMediaLibraryPermissionsAsync()
        .then((permission) => {
            if (!permission.granted) {
            alert('Permission is required to upload a trip image.');
            throw new Error('Permission denied');
            }
        return ImagePicker.launchImageLibraryAsync({
            allowsEditing: true,
            quality: 1,
        })
        })
        .then((result: any) => {
            if (!result.canceled) {
                setIsUpLoading(false);
                setTripPictures((prev: string[]) => [...prev, result.assets[0].uri]);
            }
        })
        .catch((error: any) => {
            setIsUpLoading(false);
            console.warn('Image picker error:', error.message);
            throw error;
        });
    };

  return (
    <View style={styles.container}>
    <Text style={{ color: mode.text }}>Trip Pictures:</Text>
    <Button title="Upload an image" onPress={selectImage} disabled={isUploading}/>
    <ScrollView horizontal={true}>
    {tripPictures.length > 0 &&
    tripPictures.map((uri: string, index: number) => (
    <View key={index} style={styles.imgContainer}>
        <Image
        source={{ uri }}
        style={styles.img}
        />
    <TouchableOpacity onPress={() => handleRemove(index)} style={styles.deleteIcon}>
        {deleteIcon}
    </TouchableOpacity>
    </View>
      ))
    }
    </ScrollView>
    </View>
  )
}

const styles = StyleSheet.create({
    container: {
        flexGrow: 1,
        padding: 16
    },
    input: {
        margin: 5,
        padding: 5,
        borderColor: "red",
        borderWidth: 2
    },
    img: {
        width: 200,
        height: 200,
        marginTop: 20,
    },
    imgContainer: {
        margin: 10,
    },
    deleteIcon: {
        margin: 10,
    }
});
