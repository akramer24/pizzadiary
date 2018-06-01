import React from 'react';
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';
import * as firebase from 'firebase';
import db from '../../db';

export default class UserProfile extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      user: {}
    }
  }

  componentDidMount() {
    const user = firebase.auth().currentUser;
    if (user) {
      db.collection('users')
        .doc(user.email)
        .get()
        .then(foundUser => this.setState({user: foundUser.data()}))
        .catch(console.log);
    }
  }

  logout(navigation) {
    firebase.auth().signOut().then(function () {
      navigation.navigate('LandingPage')
    }).catch(function (error) {
      console.log(error)
    });
  }

  render() {
    const { navigation } = this.props;
    const { user } = this.state;
    return (
      <View style={styles.home}>
        {user.email && <Text>This is {this.state.user.email} page</Text>}
        <TouchableOpacity onPress={() => this.logout(navigation)}>
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