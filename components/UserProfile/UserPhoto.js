import React from 'react';
import { CameraRoll, View, Button, ScrollView, Image, TouchableOpacity } from 'react-native';

export default class UserPhoto extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      photos: [],
      imageUri: ''
    }
  }

  _handleButtonPress = () => {
    CameraRoll.getPhotos({
      first: 20,
      assetType: 'Photos',
    })
      .then(r => {
        this.setState({ photos: r.edges });
      })
      .catch((err) => {
        //Error Loading Images
      });
  };

  selectImage(uri) {
    this.setState({imageUri: uri})
  }

  render() {
    console.log(this.state.imageUri)
    return (
      <View>
        <Button title="Load Images" onPress={this._handleButtonPress} />
        <ScrollView>
          {this.state.photos.map((p, i) => {
            return (
              <TouchableOpacity key={i} onPress={() => this.selectImage(p.node.image.uri)}>
                <Image
                  style={{
                    width: 300,
                    height: 100,
                  }}
                  source={{ uri: p.node.image.uri }}
                />
              </TouchableOpacity>
            );
          })}
        </ScrollView>
      </View>
    );
  }
}