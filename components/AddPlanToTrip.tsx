import React, { useState } from 'react';
import { StyleSheet, Text, View, Button, Modal } from 'react-native';
import CurrentAndUpcomingTrips from './CurrentAndUpcomingTrips';
import { addFlight } from '@/firestoreService/flight/addFlight';


export default function AddPlanToTrip({ typeOfPlan, planData }) {
    const [isModalVisable, setIsModalVisable] = useState(false);
    const [selectedTrip, setSelectedTrip] = useState('');
    const [addPlanButton, setAddPlanButton] = useState(false)

    return (
        <View style={styles.container}>
            <Button title="Add To Trip" onPress={() => setIsModalVisable(true)} />

            <Modal
                visible={isModalVisable}
                onRequestClose={() => setIsModalVisable(false)}
                transparent={true}
                animationType="slide"
            >
                <View style={styles.modalOverlay}>
                    <View style={styles.modalContent}>
                        <Text>Pick which trip to add to</Text>

                        <View style={styles.tripsContainer}>
                            <CurrentAndUpcomingTrips
                                typeOfPlan={typeOfPlan}
                                selectedTrip={selectedTrip}
                                setSelectedTrip={setSelectedTrip}
                                planData={planData}
                                setIsModalVisable={setIsModalVisable}
                                setAddPlanButton={setAddPlanButton}
                                addPlanButton={addPlanButton} />
                        </View>
                        <Button
                            title="Close"
                            onPress={() => {
                                setSelectedTrip('');
                                setAddPlanButton(false);
                                setIsModalVisable(false);
                            }}
                        />

                    </View>
                </View>
            </Modal>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    tripsContainer: {
        height: '80%'
    },
    modalOverlay: {
        flex: 1,
        backgroundColor: 'rgba(254, 254, 254, 0.53)',
        justifyContent: 'center',
        alignItems: 'center',
    },
    modalContent: {
        backgroundColor: 'rgb(255, 255, 255)',
        padding: 20,
        borderRadius: 12,
        width: '80%',
    },
});
