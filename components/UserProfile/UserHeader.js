import React from 'react';
import { TextInput, Text, View, TouchableOpacity } from 'react-native';
import db from '../../db';

export default class UserHeader extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      usernameInput: ''
    }
  }

  handleSubmitUsername() {
    const {email} = this.props;
    const {usernameInput} = this.state;
    db.collection('users')
      .doc(email)
      .set({username: usernameInput}, {merge: true})
  }

  render() {
    const {username} = this.props;
    const {usernameInput} = this.state;
    return (
      <View>
        {
          username
            ?
            <Text>{username}</Text>
            :
            <TextInput
              placeholder="You don't have a username! Enter one now!"
              onChangeText={usernameInput => this.setState({usernameInput})}
              value={this.state.usernameInput}
              autoCapitalize={false}
              autoCapitalize="none"
            />
        }
        {
          usernameInput.length &&
          <TouchableOpacity onPress={() => this.handleSubmitUsername()}>
            <Text>Submit</Text>
          </TouchableOpacity>
        }
      </View>
    )
  }
}