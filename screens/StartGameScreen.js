import React from 'react';
import { View, Text, StyleSheet} from 'react-native';

const StartGameScreen = props => {
    return (
        <View style={styles.screen}>
            <Text>"Pick a number to score" </Text>

        </View>
    );
};

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        padding: 10,
        alignItems: 'center',
    }
});

export default StartGameScreen;