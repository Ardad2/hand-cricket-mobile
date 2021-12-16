import { StatusBar } from 'expo-status-bar';
import React, {useState} from 'react';
import { StyleSheet, Text, View } from 'react-native';
import * as Font from 'expo-font';

import Header from './components/Header';
import StartGameScreen from './screens/StartGameScreen';
import BattingGameScreen from './screens/BattingGameScreen';
import GameOverScreen from './screens/GameOverScreen';

export default function App() {

    const[userNumber, setUserNumber] = useState();
    const [wickets, setWickets] = useState(0);
<<<<<<< HEAD
    const [runs, setRuns] = useState(0);
    const [oppWickets, setOppWickets] = useState(0);
    const [oppRuns, setOppRuns] = useState(0);

    const configureNewGameHandler = () => {
      setWickets(0);
      setRuns(0);
      setOppRuns(0);
      setOppWickets(0);
=======

    const configureNewGameHandler = () => {
      setWickets(0);
>>>>>>> parent of d877713 (fixed bugs with the score)
      setUserNumber(null);
    }

    const startGameHandler = (selectedNumber) => {
      setUserNumber(selectedNumber);
      setWickets(0);
<<<<<<< HEAD
      setOppWickets(0);
      setOppRuns(0);
      setRuns(0);
    };

    const gameOverHandler = (runs, oppRuns, oppWickets) => {
=======
    };

    const gameOverHandler = (wickets) => {
>>>>>>> parent of d877713 (fixed bugs with the score)
      setWickets(wickets);
    };

    let content = <StartGameScreen onStartGame={startGameHandler}/>;

    if (userNumber && wickets < 1)
    {
      content = <BattingGameScreen userChoice={userNumber} onGameOver={gameOverHandler}/> 
    }
    else if (wickets >= 1)
    {
      content = <GameOverScreen wickets={wickets} userNumber={userNumber} onRestart={configureNewGameHandler}/>;
    }


  return (
    <View style={styles.screen}>
      <Header title="Hand Cricket" />
      {content }
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1
  }
});
