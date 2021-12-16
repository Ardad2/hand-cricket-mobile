import { StatusBar } from 'expo-status-bar';
import React, {useState} from 'react';
import { StyleSheet, Text, View } from 'react-native';
import * as Font from 'expo-font';

import Header from './components/Header';
import StartGameScreen from './screens/StartGameScreen';
import BattingGameScreen from './screens/BattingGameScreen';
import GameOverScreen from './screens/GameOverScreen';
import BowlingGameScreen from './screens/BowlingGameScreen';

export default function App() {

    const[userNumber, setUserNumber] = useState();
    const [runs, setRuns] = useState(0);
    const [oppRuns, setOppRuns] = useState(0);
    const [oppWickets, setOppWickets] = useState(0);
    const [wickets, setWickets] = useState(0);
    const [inningsNo, setInningsNo] = useState(0);

    const configureNewGameHandler = () => {
      setWickets(0);
      setUserNumber(null);
      setInningsNo(0);
    }

    const startGameHandler = (selectedNumber) => {
      setUserNumber(selectedNumber);
      setInningsNo(1);
      setWickets(0);
    };

    const inningsChangeHandler = (inningsNo, playerRuns) => {
      setRuns(playerRuns);
      setInningsNo(inningsNo);
    }

    const gameOverHandler = (wickets, oppRuns) => {
      setOppRuns(oppRuns);
      setOppWickets(oppWickets);
      setOppWickets(wickets);
      setInningsNo(3);
    };

    content = <StartGameScreen onStartGame={startGameHandler} />;

    if (inningsNo === 1)
    {
      content = <BattingGameScreen userChoice={userNumber} onGameOver={inningsChangeHandler}/>;
    }

    else if (inningsNo === 2)
    {
      content = <BowlingGameScreen userChoice={userNumber} onGameOver={gameOverHandler} runs={runs}/>;
    }

    else if (inningsNo === 3 && (oppRuns > runs))
    {
      content = <GameOverScreen winner = {"You Lost"} wickets={wickets} userNumber={userNumber} onRestart={configureNewGameHandler}/>;
    }

    else if (inningsNo === 3 && (runs > oppRuns))
    {
      content = <GameOverScreen winner = {"You Won"} wickets={wickets} userNumber={userNumber} onRestart={configureNewGameHandler}/>;
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
