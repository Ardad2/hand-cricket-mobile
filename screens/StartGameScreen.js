import React, {useState} from 'react';
import { View, ImageBackground, Text, StyleSheet, TextInput, Button, TouchableWithoutFeedback, Keyboard, Alert} from 'react-native';
import Card from '../components/Card';
import Input from '../components/Input';
import NumberContainer from '../components/NumberContainer';
import Colors from '../constants/colors';

const StartGameScreen = props => {

    const [enteredValue, setEnteredValue] = useState('');
    const [confirmed, setConfirmed] = useState(false);
    const [selectedNumber, setSelectedNumber] = useState();


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

    let confirmedOutput;

    if (confirmed)
    {
        confirmedOutput = 
        <Card style ={styles.summaryContainer}>
        <Text>You won the toss! You selected</Text>
        <View>
            <Text>
                <NumberContainer>{selectedNumber}</NumberContainer>
                <Button title="START GAME" onPress={() => props.onStartGame(selectedNumber)}/>
            </Text>
        </View>

        </Card>
    }



    return (
        <ImageBackground source={require("../assets/6402575.jpeg")} style={{width: '100%', height: '100%'}}>
        <TouchableWithoutFeedback
        onPress={() => {
            Keyboard.dismiss();
        }}>
        <View style={styles.screen}>
            <Text style={styles.title}>Toss: Select a Number!</Text>
         <Card style={styles.inputContainer}>
             <Input style={styles.input} 
             blurOnSubmit 
             autoCaptalize='none' 
             keyboardType="number-pad" 
             maxLength={1}
             onChangeText={numberInputHandler}
             value={enteredValue}/>
             <View style={styles.buttonContainer}>
                 <Button title = "Start New Game" onPress={confirmInputHandler} color={Colors.primary}/>
         </View>
         </Card>
         {confirmedOutput}

        </View>
        </TouchableWithoutFeedback>
        </ImageBackground>
    );
};

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        padding: 10,
        alignItems: 'center',
    },
    title: {
        color: 'white',
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
    },
    summaryContainer: {
        marginTop:20,
        alignItems: 'center'
    }
});

export default StartGameScreen;