import React from 'react';
import {
  Text,
  View,
  TouchableOpacity,
  Button
} from 'react-native';
import { Camera, Permissions, FaceDetector } from 'expo';


export default class CameraExample extends React.Component {
  state = {
    hasCameraPermission: null,
    type: Camera.Constants.Type.front,
  };

  async componentDidMount() {
    const { status } = await Permissions.askAsync(Permissions.CAMERA);
    this.setState({ hasCameraPermission: status === 'granted' });
  }
  snap = async () => {
    if (this.camera) {
      let photo = await this.camera.takePictureAsync();
      const options = { mode: FaceDetector.Constants.Mode.fast }
      const result = await FaceDetector.detectFacesAsync(photo.uri, options);
      console.log(result);
      if (result.faces.length > 0) {
        console.log("Match found");


      } else {
        console.log('Not Found');

      }
    }
  }

  render() {
    const { hasCameraPermission } = this.state;
    if (hasCameraPermission === null) {
      return <View />;
    } else if (hasCameraPermission === false) {
      return <Text>No access to camera</Text>;
    } else {
      return (
        <View style={{ flex: 1 }}>
          <Camera
            ref={ref => this.camera = ref}
            style={{ flex: 1 }} type={this.state.type}>
            <View
              style={{
                flex: 1,
                backgroundColor: 'transparent',
                justifyContent: 'flex-end',

              }}>
              <Button
                onPress={this.snap}

                buttonStyle={{ backgroundColor: '#00bfff', borderRadius: 10 }}
                textStyle={{ textAlign: 'center' }}
                title={`Capture`}
              />

              <TouchableOpacity
                style={{
                  flex: 0.1,
                  // alignSelf: 'flex-end',
                  // alignItems: 'center',
                }}
                onPress={() => {
                  this.setState({
                    type: this.state.type === Camera.Constants.Type.front
                      ? Camera.Constants.Type.back
                      : Camera.Constants.Type.front,
                  });
                }}>
                <Text
                  style={{ fontSize: 18, marginBottom: 10, color: 'white' }}>
                  {' '}Flip{' '}
                </Text>
              </TouchableOpacity>
            </View>
          </Camera>
        </View>
      );
    }
  }
}