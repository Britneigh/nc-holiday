
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';


export default function NumberOfAdultsSearch({ numberOfAdults, setNumberOfAdults }) {


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
            <Text>Select Number of Adult Passengers (1-9):</Text>
            <View >
                <Text>{numberOfAdults}</Text>
                <TouchableOpacity onPress={decrement}>
                    <Text>−</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={increment}>
                    <Text>+</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
}


const styles = StyleSheet.create({
    container: {
        flexGrow: 1,
        padding: 16
    }
    ,
    input: {
        margin: 5,
        padding: 5,
        borderColor: "red",
        borderWidth: 2
    }
});

