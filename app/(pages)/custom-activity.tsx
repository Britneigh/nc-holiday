import React from "react";
import { StyleSheet, View, ScrollView, Text } from "react-native";
import { useQuery } from "@tanstack/react-query";
import { getAccessToken, getToursAndActivities } from "../../api";
import { useLocalSearchParams } from "expo-router";

export default function CustomActivity() {

    return (
        <ScrollView style={styles.container}>
            <Text>Custom Activity Add</Text>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        padding: 16,
    },
    card: {
        marginBottom: 12,
        padding: 12,
        borderWidth: 1,
        borderColor: "black",
        borderRadius: 8,
    },
});
