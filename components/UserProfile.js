import React from 'react';
import { StyleSheet, View, Text } from 'react-native';

export default class Home extends React.Component {
  render() {
    const { navigation } = this.props;
    const email = navigation.getParam('email');
    return (
      <View style={styles.home}>
        <Text>This is {email} page</Text>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  home: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  }
})