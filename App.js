import React, { useEffect, useState } from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
  Dimensions,
  TouchableWithoutFeedback,
} from 'react-native';
import Birds from './components/Birds';
import Obstacles from './components/Obstacles';

const App = () => {
  const screenWidth = Dimensions.get("screen").width;
  const screenHeight = Dimensions.get("screen").height;
const birdLeft = screenWidth / 2;
const [birdBottom, setBirdBottom] = useState(screenHeight/2);
const [obstaclesLeft, setObstaclesLeft] = useState(screenWidth);
const [obstaclesLeftTwo, setObstaclesLeftTwo] = useState(screenWidth + screenWidth/2 + 30);
const [score, setScore] = useState(0)
const [obstaclesNegHeight, setObstaclesNegHeight] = useState(0);
const [obstaclesNegHeightTwo, setObstaclesNegHeightTwo] = useState(0);
const obstaclesWith = 60;
const obstaclesHeight = 300;
const gap = 200;
const gravity = 3;
let gameTimerId;
let obstaclesLeftTimeId;
let obstaclesLeftTimeIdTwo;
const [isGameOver, setIsGameOver] = useState(false);

// start bird falling
useEffect(() => {
  if(birdBottom > 0){
   gameTimerId = setInterval(() =>{
      setBirdBottom(birdBottom => birdBottom - gravity)
    }, 30)

    return () => {
      clearInterval(gameTimerId)
    }
  }
}, [birdBottom])


const jump = () =>{
  if(!isGameOver && (birdBottom < screenHeight)){
      setBirdBottom(birdBottom => birdBottom + 50)
  }
}
// start first obstacles
useEffect(() =>{
  if(obstaclesLeft > -obstaclesWith){
   obstaclesLeftTimeId = setInterval(() =>{
      setObstaclesLeft(obstaclesLeft => obstaclesLeft - 5)
    }, 30)
    return () =>{
      clearInterval(obstaclesLeftTimeId)
  }
  }
  else{
    setObstaclesLeft(screenWidth)
    setObstaclesNegHeight(- Math.random() * 100)
    setScore(score => score + 1)

  }
},[obstaclesLeft])

// start second obstacles
useEffect(() =>{
  if(obstaclesLeftTwo > -obstaclesWith){
   obstaclesLeftTimeIdTwo = setInterval(() =>{
      setObstaclesLeftTwo(obstaclesLeftTwo => obstaclesLeftTwo - 5)
    }, 30)
    return () =>{
      clearInterval(obstaclesLeftTimeIdTwo)
  }
  }
  else{
    setObstaclesLeftTwo(screenWidth);
    setObstaclesNegHeightTwo(- Math.random() * 100)
    setScore(score => score + 1)
  }
},[obstaclesLeftTwo])

//check for collision
useEffect(() =>{
  if(
  ((birdBottom < (obstaclesNegHeight + obstaclesHeight + 30) ||
  birdBottom > (obstaclesNegHeight + obstaclesHeight + gap - 30)) && 
  (obstaclesLeft > screenWidth/2 - 30 && obstaclesLeft < screenWidth/2 + 30)
  )
  ||
  ((birdBottom < (obstaclesNegHeightTwo + obstaclesHeight + 30) ||
  birdBottom > (obstaclesNegHeightTwo + obstaclesHeight + gap - 30) )&& 
  (obstaclesLeftTwo > screenWidth/2 - 30 && obstaclesLeftTwo < screenWidth/2 + 30)
  )
  ){
        gameOver()
        setIsGameOver(true)
  }
})

const gameOver = () =>{
  clearInterval(gameTimerId);
  clearInterval(obstaclesLeftTimeId);
  clearInterval(obstaclesLeftTimeIdTwo);
  setIsGameOver(true);
}

  return (
    <TouchableWithoutFeedback onPress={jump}>
    <View style={styles.container}>
      {isGameOver && <Text>Your score is: {score}</Text>}
      <Birds
      birdBottom={birdBottom}
      birdLeft={birdLeft}
      />
      <Obstacles
      obstaclesLeft={obstaclesLeft}
      obstaclesHeight={obstaclesHeight}
      obstaclesWith={obstaclesWith}
      randomBottom={obstaclesNegHeight}
      gap={gap}
      color={"green"}
      />
        <Obstacles
        color={"yellow"}
      obstaclesLeft={obstaclesLeftTwo}
      obstaclesHeight={obstaclesHeight}
      obstaclesWith={obstaclesWith}
      randomBottom={obstaclesNegHeightTwo}
      gap={gap}
      />
    </View>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center", 
    justifyContent: "center"
  }
  
});

export default App;
