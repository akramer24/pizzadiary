import React from 'react';
import { ScrollView, Text, StyleSheet, View, TouchableOpacity } from 'react-native';

const Pizzerias = props => {
  const { pizzerias } = props;
  return (
      <ScrollView contentContainerStyle={styles.pizzaScroller}>
        {
          pizzerias.sort().map(pizzeria => {
            return (
              <Text key={pizzeria} style={styles.pizzeriaText}>{pizzeria}</Text>
            )
          })
        }
      </ScrollView>
  )
}

const styles = StyleSheet.create({
  pizzeriasContainer: {
    flex: 1
  },
  pizzeriaText: {
    fontSize: 40,
    color: 'white'
  },
  pizzaScroller: {
    alignSelf: 'center',
    alignItems: 'center'
  }
})

export default Pizzerias;