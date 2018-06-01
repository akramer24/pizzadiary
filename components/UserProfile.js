import React from 'react';
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';
import * as firebase from 'firebase';

export default class Home extends React.Component {

  logout() {
    firebase.auth().signOut().then(function() {
      console.log('signed out')
      this.props.navigation.navigate('LandingPage')
    }).catch(function(error) {
      console.log(error)
    });
  }

  render() {
    const { navigation } = this.props;
    const email = navigation.getParam('email');
    return (
      <View style={styles.home}>
        <Text>This is {email} page</Text>
        <TouchableOpacity onPress={() => this.logout()}>
          <Text>Logout</Text>
        </TouchableOpacity>
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