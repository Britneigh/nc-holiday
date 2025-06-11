import React, { useState } from 'react';
import { StyleSheet, Text, View, Button, Pressable, ScrollView } from 'react-native';

export default function TimeZonePicker({ timeZone, setTimeZone }: any) {

    return (
        <>
            <Text>pick time zone:</Text>
            {/* <View style={styles.pageSelection}> */}

            <ScrollView horizontal={true} >
                <Pressable
                    onPress={() => setTimeZone("UTC")}
                    style={[
                        styles.timeZoneContainer,
                        timeZone === "UTC" && styles.timeZoneContainerSelected,
                    ]}
                >
                    <Text
                        style={[
                            styles.timeZoneOption,
                            timeZone === "UTC" && styles.timeZoneOptionSelected,
                        ]}
                    >UTC</Text>
                </Pressable>

                <Pressable
                    onPress={() => setTimeZone("Europe/London")}
                    style={[
                        styles.timeZoneContainer,
                        timeZone === "Europe/London" && styles.timeZoneContainerSelected,
                    ]}
                >
                    <Text
                        style={[
                            styles.timeZoneOption,
                            timeZone === "Europe/London" && styles.timeZoneOptionSelected,
                        ]}
                    >London (UK)</Text>
                </Pressable>

                <Pressable
                    onPress={() => setTimeZone("America/New_York")}
                    style={[
                        styles.timeZoneContainer,
                        timeZone === "America/New_York" && styles.timeZoneContainerSelected,
                    ]}
                >
                    <Text
                        style={[
                            styles.timeZoneOption,
                            timeZone === "America/New_York" && styles.timeZoneOptionSelected,
                        ]}
                    >New York (US East)</Text>
                </Pressable>

                <Pressable
                    onPress={() => setTimeZone("America/Chicago")}
                    style={[
                        styles.timeZoneContainer,
                        timeZone === "America/Chicago" && styles.timeZoneContainerSelected,
                    ]}
                >
                    <Text
                        style={[
                            styles.timeZoneOption,
                            timeZone === "America/Chicago" && styles.timeZoneOptionSelected,
                        ]}
                    >Chicago (US Central)</Text>
                </Pressable>

                <Pressable
                    onPress={() => setTimeZone("America/Los_Angeles")}
                    style={[
                        styles.timeZoneContainer,
                        timeZone === "America/Los_Angeles" && styles.timeZoneContainerSelected,
                    ]}
                >
                    <Text
                        style={[
                            styles.timeZoneOption,
                            timeZone === "America/Los_Angeles" && styles.timeZoneOptionSelected,
                        ]}
                    >Los Angeles (US Pacific)</Text>
                </Pressable>

                <Pressable
                    onPress={() => setTimeZone("Europe/Paris")}
                    style={[
                        styles.timeZoneContainer,
                        timeZone === "Europe/Paris" && styles.timeZoneContainerSelected,
                    ]}
                >
                    <Text
                        style={[
                            styles.timeZoneOption,
                            timeZone === "Europe/Paris" && styles.timeZoneOptionSelected,
                        ]}
                    >Paris (Central Europe)</Text>
                </Pressable>

                <Pressable
                    onPress={() => setTimeZone("Asia/Dubai")}
                    style={[
                        styles.timeZoneContainer,
                        timeZone === "Asia/Dubai" && styles.timeZoneContainerSelected,
                    ]}
                >
                    <Text
                        style={[
                            styles.timeZoneOption,
                            timeZone === "Asia/Dubai" && styles.timeZoneOptionSelected,
                        ]}
                    >Dubai (Gulf)</Text>
                </Pressable>

                <Pressable
                    onPress={() => setTimeZone("Asia/Singapore")}
                    style={[
                        styles.timeZoneContainer,
                        timeZone === "Asia/Singapore" && styles.timeZoneContainerSelected,
                    ]}
                >
                    <Text
                        style={[
                            styles.timeZoneOption,
                            timeZone === "Asia/Singapore" && styles.timeZoneOptionSelected,
                        ]}
                    >Singapore</Text>
                </Pressable>

                <Pressable
                    onPress={() => setTimeZone("Asia/Tokyo")}
                    style={[
                        styles.timeZoneContainer,
                        timeZone === "Asia/Tokyo" && styles.timeZoneContainerSelected,
                    ]}
                >
                    <Text
                        style={[
                            styles.timeZoneOption,
                            timeZone === "Asia/Tokyo" && styles.timeZoneOptionSelected,
                        ]}
                    >Tokyo (Japan)</Text>
                </Pressable>

                <Pressable
                    onPress={() => setTimeZone("Australia/Sydney")}
                    style={[
                        styles.timeZoneContainer,
                        timeZone === "Australia/Sydney" && styles.timeZoneContainerSelected,
                    ]}
                >
                    <Text
                        style={[
                            styles.timeZoneOption,
                            timeZone === "Australia/Sydney" && styles.timeZoneOptionSelected,
                        ]}
                    >Sydney (Australia)</Text>
                </Pressable>

            </ScrollView>
            {/* </View> */}
        </>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#ffffff',
        justifyContent: 'center',
        alignItems: 'center'
    },
    timeZoneContainer: {
        borderRadius: 30,
        backgroundColor: '#269fc12e',
        padding: 10,
        margin: 5,
        justifyContent: 'center',
        alignItems: 'center'
    },
    timeZoneOption: {
        fontSize: 16,
        color: '#2891D9',
        fontWeight: '500',

    },
    timeZoneContainerSelected: {
        borderRadius: 30,
        backgroundColor: '#2891D9',
        padding: 10,
        margin: 5,
        justifyContent: 'center',
        alignItems: 'center'
    },
    timeZoneOptionSelected: {
        fontSize: 16,
        color: 'white',
        fontWeight: '500',
    }
});

