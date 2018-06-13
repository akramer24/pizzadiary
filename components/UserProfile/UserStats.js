import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const UserStats = props => {
  const { pizzeriasVisited, pizzeriasToVisit, slicesEaten } = props;

  return (
    <View style={styles.statsContainer}>
      <Text style={styles.slicesEaten}>Slices eaten: {slicesEaten}</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  statsContainer: {
    alignItems: 'center'
  },
  slicesEaten: {
    fontSize: 20,
    color: 'white',
    fontWeight: 'bold',
    textShadowColor: 'black',
    textShadowOffset: {width: 1, height: 1},
    textShadowRadius: 1
  }
})

export default UserStats;