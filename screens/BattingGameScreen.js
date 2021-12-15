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

const BattingGameScreen = props => {

    const [enteredValue, setEnteredValue] = useState('');
    const [confirmed, setConfirmed] = useState(false);

    const numberInputHandler = inputText => {
        setEnteredValue(inputText.replace(/[^0-6]/g, ''));
    };

    const resetInputHandler = () => {
        setEnteredValue('');
        setConfirmed(false);
    }

    const [currentGuess, setCurrentGuess ] = useState(null);
    const [selectedNumber, setSelectedNumber] = useState();
    const [wickets, setWickets] = useState(0);
    const [runs, setRuns] = useState(0);

    const { userChoice, onGameOver } = props;

    const nextGuessHandler = () => {
        const chosenNumber = parseInt(enteredValue);

        if (isNaN(chosenNumber) || chosenNumber < 0 || chosenNumber > 6)
        {
            Alert.alert('Invalid Number!', 'Number has to be between 0 and 6 included', [{text: 'Okay', style: 'destructive', onPress: resetInputHandler}]);
            return;
        }

        setConfirmed(true);
        setSelectedNumber(parseInt(enteredValue));
        setEnteredValue('');
        Keyboard.dismiss();

        const nextNumber = generateRandomBetween(0,6,null);

        if (currentGuess === nextNumber)
        {
            setWickets(wickets + 1);

            if (wickets == 1)
            {
                onGameOver(runs, wickets);
            }
        }
        else
        {setRuns(runs+chosenNumber);}

        
        setCurrentGuess(nextNumber);

    };

return (
    <View style={styles.screen}>
        <Text style={styles.header}> Player Batting</Text>
        <Text>Your score is {runs} - {wickets}</Text>
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
    header: {
        fontSize: 22
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

export default BattingGameScreen;