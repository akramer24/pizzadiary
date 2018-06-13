import React from 'react';
import { StyleSheet, View, Text, TouchableOpacity, ImageBackground, StatusBar } from 'react-native';
import * as firebase from 'firebase';
import db from '../../db';
import { UserStats, UserHeader, UserPhoto, Pizzerias } from './index';

export default class UserProfile extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      user: {},
      displayVisited: true
    }
  }

  componentDidMount() {
    const user = firebase.auth().currentUser;
    if (user) {
      db.collection('users')
        .doc(user.email)
        .get()
        .then(foundUser => this.setState({ user: foundUser.data() }))
        .catch(console.log);
    }
  }

  toggleTabs(isVisited) {
    const displayVisited = isVisited;
    this.setState({ displayVisited });
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
    const { user, displayVisited } = this.state;
    const { pizzeriasVisited, pizzeriasToVisit, slicesEaten, username, email } = user;

    return (
      <ImageBackground style={styles.image} source={require('../../pizza.jpg')}>
        <StatusBar
          barStyle="dark-content"
        />
        <View style={styles.home}>
          <View style={styles.navbar}>
          </View>
          {pizzeriasVisited &&
            <UserHeader
              username={username}
              email={email}
            />}
          {pizzeriasVisited &&
            <UserStats
              pizzeriasVisited={pizzeriasVisited.length}
              pizzeriasToVisit={pizzeriasToVisit.length}
              slicesEaten={slicesEaten}
            />}
          {
            pizzeriasVisited &&
            <View style={styles.pizzeriaTabContainer}>
              <TouchableOpacity
                style={displayVisited ? styles.activeTab : styles.inactiveTab}
                onPress={() => this.toggleTabs(true)}
              >
                <Text style={styles.header}>Pizzerias Visited ({pizzeriasVisited.length})</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={!displayVisited ? styles.activeTab : styles.inactiveTab}
                onPress={() => this.toggleTabs(false)}
              >
                <Text style={styles.header}>Pizzerias to Visit ({pizzeriasToVisit.length})</Text>
              </TouchableOpacity>
            </View>
          }
          {
            pizzeriasVisited && displayVisited &&
            <Pizzerias pizzerias={pizzeriasVisited} />
          }
          {
            pizzeriasVisited && !displayVisited &&
            <Pizzerias pizzerias={pizzeriasToVisit} />
          }
          <TouchableOpacity onPress={() => this.logout(navigation)}>
            <Text style={styles.logout}>Logout</Text>
          </TouchableOpacity>
        </View>
      </ImageBackground>
    )
  }
}

const styles = StyleSheet.create({
  image: {
    flex: 1
  },
  home: {
    flex: 1,
    justifyContent: 'space-around',
    alignItems: 'center',
    marginTop: 20,
    backgroundColor: 'rgba(42,41,3,0.2)'
  },
  navbar: {
    height: 40,
    width: '100%'
  },
  navbarText: {
    alignSelf: 'center',
    fontSize: 20,
    fontWeight: 'bold',
    color: 'white'
  },
  header: {
    fontSize: 20,
    color: 'white'
  },
  pizzeriaTabContainer: {
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'space-evenly'
  },
  logout: {
    color: 'white'
  },
  activeTab: {
    backgroundColor: 'rgba(18,158,18,1)',
    width: '50%'
  },
  inactiveTab: {
    backgroundColor: 'rgba(101,115,101,1)',
    width: '50%'
  }
})