import React from 'react';
import { TextInput, Text, View, TouchableOpacity, StyleSheet } from 'react-native';
import db from '../../db';

export default class UserHeader extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      usernameInput: '',
      username: props.username
    }
  }

  handleSubmitUsername() {
    const {email} = this.props;
    const {usernameInput} = this.state;
    this.setState({username: usernameInput, usernameInput: ''})
    db.collection('users')
      .doc(email)
      .set({username: usernameInput}, {merge: true})
  }

  render() {
    const {usernameInput, username} = this.state;
    return (
      <View>
        {
          username
            ?
            <Text style={styles.username}>{username}</Text>
            :
            <TextInput
              placeholder="You don't have a username! Enter one now!"
              placeholderTextColor="white"
              onChangeText={usernameInput => this.setState({usernameInput})}
              value={this.state.usernameInput}
              autoCorrect={false}
              autoCapitalize="none"
              style={styles.input}
            />
        }
        {
          usernameInput.length &&
          <TouchableOpacity style={styles.button} onPress={() => this.handleSubmitUsername()}>
            <Text>Submit</Text>
          </TouchableOpacity>
        }
      </View>
    )
  }
}

const styles = StyleSheet.create({
  username: {
    fontSize: 26,
    color: 'white',
    fontWeight: 'bold',
    textShadowColor: 'black',
    textShadowOffset: {width: 1, height: 1},
    textShadowRadius: 1
  },
  button: {
    backgroundColor: 'green',
    height: 20,
    width: 100,
    alignItems: 'center',
    justifyContent: 'center',
    margin: 5
  },
  input: {
    textAlign: 'center',
    color: 'white'
  }
})