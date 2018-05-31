import React from 'react';
import { StyleSheet, View, Text, ImageBackground, TextInput, TouchableOpacity } from 'react-native';
import db from '../db';
import * as firebase from 'firebase';


export default class LandingPage extends React.Component {

  constructor() {
    super();
    this.state = {
      email: '',
      password: '',
      error: ''
    }
  }

  componentWillMount() {
    const { navigation } = this.props;
    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        db.collection('users').doc(user.email).get()
        .then(doc => {
          const {email} = doc.data()
          navigation.navigate('Home', {email})
        })
      }
    });
  }

  componentWillUnmount() {
    this.setState({ email: '', password: '' })
  }

  handleInputChange(inputField, value) {
    this.setState({ [inputField]: value });
  }

  signUp(email, password) {
    db.collection('users')
      .doc(email)
      .get()
      .then(doc => {
        if (doc.exists) {
          this.setState({ error: 'User already exists' });
        } else {
          firebase.auth().createUserWithEmailAndPassword(email, password)
            .then(() => {
              db.collection('users').doc(email).set({
                email,
                pizzeriasVisited: [],
                pizzeriasToVist: []
              });
              this.props.navigation.navigate('Home', { email });
              this.setState({ email: '', password: ''});
            })
        }
      })
      .catch(err => {
        this.setState({ error: err.message });
        console.log(err.message)
      })
  }

  signIn(email, password) {
    firebase.auth().signInWithEmailAndPassword(email, password)
    .then(data => {
      if (data.user) {
        db.collection('users')
        .doc(email)
        .get()
        .then(doc => {
          this.props.navigation.navigate('Home', { email: doc.data().email })
          this.setState({ email: '', password: '', error: '' });
          })
      }

    })
    .catch(err => {
      this.setState({ error: err.message });
      console.log(err.message);
    })
  }

  render() {
    const { email, password, error } = this.state;

    return (
      <ImageBackground style={styles.image} source={require('../pizza.jpg')}>
        <View style={styles.overlay}>
          <Text style={styles.header}>Welcome</Text>
          <TextInput
            style={styles.input}
            placeholder="Email"
            placeholderTextColor="white"
            value={email}
            onChangeText={(email) => this.handleInputChange('email', email)}
          />
          <TextInput
            style={styles.input}
            placeholder="Password"
            placeholderTextColor="white"
            secureTextEntry={true}
            value={password}
            onChangeText={(password) => this.handleInputChange('password', password)}
          />
          <View>
            {
              error && <Text>{error}</Text>
            }
            <TouchableOpacity style={styles.button} onPress={() => this.signIn(email, password)}>
              <Text style={styles.buttonText}>Sign In</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.button} onPress={() => this.signUp(email, password)}>
              <Text style={styles.buttonText}>Sign Up</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ImageBackground>
    )
  }
}

const styles = StyleSheet.create({
  image: {
    flex: 1
  },
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(42,41,3,0.5)',
    alignItems: 'center',
    justifyContent: 'center'
  },
  header: {
    color: 'white',
    fontSize: 30,
    fontWeight: 'bold'
  },
  input: {
    height: 40,
    width: 300,
    margin: 10,
    color: 'white',
    fontSize: 15,
    borderBottomWidth: 2,
    borderColor: 'gray'
  },
  button: {
    backgroundColor: 'white',
    height: 40,
    width: 200,
    alignItems: 'center',
    justifyContent: 'center',
    margin: 5,
    shadowColor: 'black',
    shadowRadius: 5,
    shadowOffset: { width: 5, height: 5 },
    shadowOpacity: 0.4
  },
  buttonText: {
    fontSize: 20
  }
});