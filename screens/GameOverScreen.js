import React from 'react';
import { View, Text, StyleSheet, Button } from 'react-native';

const GameOverScreen = props => {
    return <View style={styles.screen}>
        <Text>You've been bowled out!</Text>
        <Text>You lost all of your 10 wickets!</Text>
        <Button title="NEW GAME" onPress={props.onRestart}/>
    </View>
};

const styles = StyleSheet.create({
    screen: {
        flex: 1, 
        justifyContent: 'center',
        alignItems: 'center'
    }
});

export default GameOverScreen;