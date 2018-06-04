import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const UserStats = props => {
  const { pizzeriasVisited, pizzeriasToVisit, slicesEaten } = props;

  return (
    <View style={styles.statsContainer}>
      <View style={styles.pizzeriaCounters}>
        <Text style={styles.pizzeriaCounterText}>Visited: {pizzeriasVisited}</Text>
        <Text style={styles.pizzeriaCounterText}>On the list: {pizzeriasToVisit}</Text>
      </View>
      <Text style={styles.slicesEaten}>Slices eaten: {slicesEaten}</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  statsContainer: {
    flex: 1,
    alignItems: 'center'
  },
  pizzeriaCounters: {
    flexDirection: 'row'
  },
  pizzeriaCounterText: {
    fontSize: 20,
    marginLeft: 5,
    marginRight: 5
  },
  slicesEaten: {
    fontSize: 20,
  }
})

export default UserStats;