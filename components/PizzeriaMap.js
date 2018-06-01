import React from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { MapView } from 'expo';
import db from '../db';

export default class Home extends React.Component {

  constructor() {
    super();
    this.state = {
      pizzerias: []
    }
  }

  componentDidMount() {
    this.getPizzerias()
  }

  getPizzerias() {
    const { navigation } = this.props;
    const latitude = navigation.getParam('latitude');
    const longitude = navigation.getParam('longitude');
    const latMin = latitude - 0.1;
    const latMax = latitude + 0.1;
    const longMin = longitude - 0.1;
    const longMax = longitude + 0.1;
    db.collection('pizzerias')
      .where('latitude', '>', latMin)
      .where('latitude', '<', latMax)
      .get()
      .then(pizzerias => {
        const places = [];
        pizzerias.forEach(pizzeria => {
          pizzeria = pizzeria.data();
          if (pizzeria.longitude > longMin && pizzeria.longitude < longMax) places.push(pizzeria)
        })
        this.setState({ pizzerias: places })
      })
      .catch(console.log)
  }

  render() {
    const { navigation } = this.props;
    const userLatitude = navigation.getParam('latitude');
    const userLongitude = navigation.getParam('longitude');
    const { pizzerias } = this.state;
    return (
      <MapView
        style={{ flex: 1 }}
        initialRegion={{
          latitude: userLatitude,
          longitude: userLongitude,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }}
        showsUserLocation={true}
      >
        {
          pizzerias && pizzerias.map(pizzeria => {
            const {name, latitude, longitude} = pizzeria;
            return (
              <MapView.Marker
                key={name}
                title={name}
                coordinate={{ latitude, longitude }}
              />
            )
          })
        }
      </MapView>
    )
  }
}