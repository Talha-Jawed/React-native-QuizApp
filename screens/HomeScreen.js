import React from 'react';
import {
  Image,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  Button,
  TouchableOpacity,
  View,
} from 'react-native';
import { WebBrowser, Camera, Permissions, FaceDetector } from 'expo';
import { MonoText } from '../components/StyledText';
import { log } from 'core-js';

export default class HomeScreen extends React.Component {
  constructor() {
    super()
    this.state = {
      hasCameraPermission: null,
      type: Camera.Constants.Type.front,
      text: ''
    }
    this.handleFacesDetected = this.handleFacesDetected.bind(this)
  }
  static navigationOptions = {
    header: null,
  };
  async componentDidMount() {
    const { status } = await Permissions.askAsync(Permissions.CAMERA);
    this.setState({ hasCameraPermission: status === 'granted' });
  }

  // _handleButtonPress = () => {
  // CameraRoll.getPhotos({
  //   first: 20,
  //   assetType: 'Photos',
  // })
  //   .then(r => {
  //     this.setState({ photos: r.edges });
  //   })
  //   .catch((err) => {
  //     //Error Loading Images
  //   });
  // };

  pick() {
    // console.log('shukr***');

  }
  handleFacesDetected(e) {
    const faceArr = e.faces.length
    if (faceArr) {
      console.log(faceArr, 'faceArr-----   ');
      this.setState({ hasCameraPermission: false, text: "Face detect" })
    } else {
      console.log(faceArr, 'faceArr-----   ');
      this.setState({ text: "don't found face" })
    }

    // const options = { mode: FaceDetector.Constants.Landmarks.all };
    // console.log('face****');
    // return await FaceDetector.detectFacesAsync(imageUri);
  };

  // detectFace = () =>
  //   FaceDetector.detectFacesAsync(this.props.uri, {
  //     detectLandmarks: FaceDetector.Constants.Landmarks.none,
  //     runClassifications: FaceDetector.Constants.Classifications.all,
  //   })


  render() {
    const { hasCameraPermission } = this.state;
    if (hasCameraPermission === null) {
      return <View />;
    } else if (hasCameraPermission === false) {
      return <Text>No access to camera</Text>;
    } else {
      return (
        // <View style={styles.container}>
        // {/* <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
        // </ScrollView> */}
        <View style={{ flex: 1 }}>
          <Camera style={{ flex: 1 }} type={this.state.type}>

            <Camera
              // ... other props
              onFacesDetected={this.handleFacesDetected}
              faceDetectorSettings={{
                mode: FaceDetector.Constants.Mode.fast,
                detectLandmarks: FaceDetector.Constants.Mode.none,
                runClassifications: FaceDetector.Constants.Mode.none,
              }}
            />
            <View
              style={{
                flex: 1,
                backgroundColor: 'transparent',
                flexDirection: 'row',
              }}>
              <TouchableOpacity
                style={{
                  flex: 0.1,
                  alignSelf: 'flex-end',
                  alignItems: 'center',
                }}
                onLongPress={this.detectFace}
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
                {/* <Button title='click' onPress={() => this.pick()} /> */}
              </TouchableOpacity>
            </View>
          </Camera>

        </View>
      );
      {/* </View> */ }

      // );
    }
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  developmentModeText: {
    marginBottom: 20,
    color: 'rgba(0,0,0,0.4)',
    fontSize: 14,
    lineHeight: 19,
    textAlign: 'center',
  },
  contentContainer: {
    paddingTop: 30,
  },
  welcomeContainer: {
    alignItems: 'center',
    marginTop: 10,
    marginBottom: 20,
  },
  welcomeImage: {
    width: 100,
    height: 80,
    resizeMode: 'contain',
    marginTop: 3,
    marginLeft: -10,
  },
  getStartedContainer: {
    alignItems: 'center',
    marginHorizontal: 50,
  },
  homeScreenFilename: {
    marginVertical: 7,
  },
  codeHighlightText: {
    color: 'rgba(96,100,109, 0.8)',
  },
  codeHighlightContainer: {
    backgroundColor: 'rgba(0,0,0,0.05)',
    borderRadius: 3,
    paddingHorizontal: 4,
  },
  getStartedText: {
    fontSize: 17,
    color: 'rgba(96,100,109, 1)',
    lineHeight: 24,
    textAlign: 'center',
  },
  tabBarInfoContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    ...Platform.select({
      ios: {
        shadowColor: 'black',
        shadowOffset: { height: -3 },
        shadowOpacity: 0.1,
        shadowRadius: 3,
      },
      android: {
        elevation: 20,
      },
    }),
    alignItems: 'center',
    backgroundColor: '#fbfbfb',
    paddingVertical: 20,
  },
  tabBarInfoText: {
    fontSize: 17,
    color: 'rgba(96,100,109, 1)',
    textAlign: 'center',
  },
  navigationFilename: {
    marginTop: 5,
  },
  helpContainer: {
    marginTop: 15,
    alignItems: 'center',
  },
  helpLink: {
    paddingVertical: 15,
  },
  helpLinkText: {
    fontSize: 14,
    color: '#2e78b7',
  },
});
