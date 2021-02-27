import React from 'react';
import { View } from 'react-native';

const Obstacles = ({
    color, 
    obstaclesLeft, 
    obstaclesWith, 
    obstaclesHeight, 
    gap,
    randomBottom
}) => {


    return (
        <>
          <View style={{
              position: 'absolute',
              backgroundColor: color,
              width: obstaclesWith, 
              height: obstaclesHeight,
              left: obstaclesLeft,
              bottom: randomBottom + obstaclesHeight + gap,

          }}
          />
           <View style={{
              position: 'absolute',
              backgroundColor: color,
              width: obstaclesWith, 
              height: obstaclesHeight,
              left: obstaclesLeft,
              bottom: randomBottom,

          }}
          />   
        </>
    );
};

export default Obstacles;