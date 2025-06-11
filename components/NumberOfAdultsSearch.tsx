
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';


export default function NumberOfAdultsSearch({ numberOfAdults, setNumberOfAdults }: any) {


    const increment = () => {
        if (numberOfAdults < 9) {
            setNumberOfAdults(numberOfAdults + 1);
        }
    };

    const decrement = () => {
        if (numberOfAdults > 1) {
            setNumberOfAdults(numberOfAdults - 1);
        }
    };

    return (
        <View style={styles.container}>
            <Text style={styles.labelDescription} >Choose Between (1-9):</Text>
            <View style={styles.numberIncrementContainer}>

                <TouchableOpacity
                    style={styles.incTouchSpace}
                    onPress={decrement}>
                    <Text style={styles.incText}>−</Text>
                </TouchableOpacity>

                <View style={styles.numOfAdultsTextContainer}>
                    <Text style={styles.numOfAdultsText}>{numberOfAdults}</Text>
                </View>

                <TouchableOpacity
                    style={styles.incTouchSpace}
                    onPress={increment}>
                    <Text style={styles.incText}>+</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
}


const styles = StyleSheet.create({
    container: {
        flexGrow: 1,
        padding: 16
    },
    numberIncrementContainer: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        margin: 30,
        alignItems: 'center'
    },
    labelDescription: {
        fontSize: 12,
        fontWeight: '400',
        marginBottom: 8,
        color: '#333',
    },
    numOfAdultsTextContainer: {
        width: 40,
        height: 40,
        borderRadius: 20,
        backgroundColor: '#269fc12e',
        justifyContent: 'center',
        alignItems: 'center',
    },
    numOfAdultsText: {
        fontSize: 16,
        color: '#2891D9',
        fontWeight: '500',
    },
    incText: {
        fontSize: 16,
        fontWeight: '500',
        color: '#2891D9'
    },
    incTouchSpace: {
        padding: 25
    }
});


