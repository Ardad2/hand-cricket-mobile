import React, {useState} from 'react';
import { View, Text, StyleSheet, TextInput, Button} from 'react-native';
import Card from '../components/Card';
import Input from '../components/input';
import Colors from '../constants/colors';

const StartGameScreen = props => {

    const [enteredValue, setEnteredValue] = useState('');

    const numberInputHandler = inputText => {
        setEnteredValue(inputText.replace(/[^0-6]/g, ''));
    };

    return (
        <View style={styles.screen}>
            <Text style={styles.title}>Start !</Text>
         <Card style={styles.inputContainer}>
             <Text>Select a Number!</Text>
             <Input style={styles.input} 
             blurOnSubmit 
             autoCaptalize='none' 
             autoCorrect='false' 
             keyboardType="number-pad" 
             maxLength={1}
             onChangeText={numberInputHandler}
             value={enteredValue}/>
             <View style={styles.buttonContainer}>
                 <Button title = "Reset" onPress={() => {}} color={Colors.accent}/>
                 <Button title = "Confirm" onPress={() => {}} color={Colors.primary}/>

         </View>
         </Card>

        </View>
    );
};

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        padding: 10,
        alignItems: 'center',
    },
    title: {
        fontSize: 20,
        marginVertical: 10
    },
    inputContainer: {
        width: 300,
        maxWidth: '80%',
        alignItems: 'center',
    },
    buttonContainer: {
        flexDirection: 'row',
        width: '100%',
        justifyContent: 'space-between',
        paddingHorizontal: 15,
        marginVertical: 20
    },
    button: {
        width: 100
    },
    input: {
        width: 50,
        textAlign: "center"
    }
});

export default StartGameScreen;