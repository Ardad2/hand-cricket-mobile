import React, { useState, useRef, useEffect } from 'react';
import { View, Text,  StyleSheet, Button, Alert, Keyboard} from 'react-native';

import NumberContainer from '../components/NumberContainer';
import Card from '../components/Card';
import Input from '../components/Input';
import Colors from '../constants/colors';



const generateRandomBetween = (min, max, exclude) => {
    min = Math.ceil(min);
    max = Math.floor(max);
    const rndNum = Math.floor(Math.random() * (max - min)) + min;
    if (rndNum === exclude)
    {
        return generateRandomBetween(min, max, exclude);
    }
    else{
        return rndNum;
    }
};

const GameScreen = props => {

    const [enteredValue, setEnteredValue] = useState('');
    const [confirmed, setConfirmed] = useState(false);

    const numberInputHandler = inputText => {
        setEnteredValue(inputText.replace(/[^0-6]/g, ''));
    };

    const resetInputHandler = () => {
        setEnteredValue('');
        setConfirmed(false);
    }

    const confirmInputHandler = () => {

        const chosenNumber = parseInt(enteredValue);

        if (isNaN(chosenNumber) || chosenNumber <= 0 || chosenNumber > 6)
        {
            Alert.alert('Invalid Number!', 'Number has to be between 0 and 6 included', [{text: 'Okay', style: 'destructive', onPress: resetInputHandler}]);
            return;
        }

        setConfirmed(true);
        setSelectedNumber(parseInt(enteredValue));
        setEnteredValue('');
        Keyboard.dismiss();
    };

    const [currentGuess, setCurrentGuess ] = useState(generateRandomBetween(0, 7, 100));
    const [selectedNumber, setSelectedNumber] = useState();
    const [rounds, setRounds] = useState(0);
    const currentLow = useRef(0);
    const currentHigh = useRef(6);

    const { userChoice, onGameOver } = props;

    useEffect(() => {
        if (currentGuess === userChoice)
        {
            onGameOver(rounds);
        }
    }, [currentGuess,]);

    const nextGuessHandler = () => {

        const chosenNumber = parseInt(enteredValue);

        if (isNaN(chosenNumber) || chosenNumber <= 0 || chosenNumber > 6)
        {
            Alert.alert('Invalid Number!', 'Number has to be between 0 and 6 included', [{text: 'Okay', style: 'destructive', onPress: resetInputHandler}]);
            return;
        }

        setConfirmed(true);
        setSelectedNumber(parseInt(enteredValue));
        setEnteredValue('');
        Keyboard.dismiss();

        const nextNumber = generateRandomBetween(currentLow.current, currentHigh.current, currentGuess);
        setCurrentGuess(nextNumber);
        setRounds(currRounds => currRounds + 1);
    };

return (
    <View style={styles.screen}>
        <Text>Opponent's Number: </Text>
        <NumberContainer>{currentGuess}</NumberContainer>
        <Card style={styles.inputContainer}>
        <Text>Select a Number!</Text>
             <Input style={styles.input} 
             blurOnSubmit 
             autoCaptalize='none' 
             keyboardType="number-pad" 
             maxLength={1}
             onChangeText={numberInputHandler}
             value={enteredValue}/>
             <View style={styles.buttonContainer}>
                 <Button title = "Reset" onPress={resetInputHandler} color={Colors.accent}/>
                 <Button title = "Confirm" onPress={nextGuessHandler} color={Colors.primary}/>

         </View>
        </Card>

    </View>
);
};

const styles = StyleSheet.create({
    inputContainer: {
        width: 300,
        maxWidth: '80%',
        alignItems: 'center',
    },
    input: {
        width: 50,
        textAlign: "center"
    },
    screen: {
        flex: 1,
        padding: 10,
        alignItems: 'center'
    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        marginTop: 20,
        width: 300,
        maxWidth: '80%'
    }
});

export default GameScreen;