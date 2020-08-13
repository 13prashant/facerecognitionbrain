import React, { Component } from 'react';
// import Particles from 'react-particles-js';
import Clarifai from 'clarifai';
import Navigation from './components/Navigation/Navigation';
import Logo from './components/Logo/Logo';
import ImageLinkForm from './components/ImageLinkForm/ImageLinkForm';
import Rank from './components/Rank/Rank';
import FaceRecognition from './components/FaceRecognition/FaceRecognition';
import './App.css';

const app = new Clarifai.App({
  apiKey: 'a65987dcb24a4d79bd58e3436249d61c'
 });

// const particlesOptions = {
//   "particles": {
//       "number": {
//           "value": 100
//       },
//       "size": {
//           "value": 2
//       }
//   },
// }

class App extends Component {

  constructor() {
    super();
    this.state = {
      input: '',
      imageUrl: '',
      box: {}
    }
  }

onInputChange = (event) => {
  this.setState({input: event.target.value});
}

faceDetectiongBox = (data) => {
  const clarifaiFace = data.outputs[0].data.regions[0].region_info.bounding_box;
  const image = document.getElementById('image');
  const width = Number(image.width);
  const height = Number(image.height);

  return {
    topRow: clarifaiFace.top_row * height,
    rightCol: width - (clarifaiFace.right_col * width),
    bottomRow: height - (clarifaiFace.bottom_row * height),
    leftCol: clarifaiFace.left_col * width
  }
}

faceDisplayBox = (box) => {
  this.setState({box: box});
}

onButtonSubmit = (event) => {
  this.setState({imageUrl: this.state.input})
  app.models.predict(Clarifai.FACE_DETECT_MODEL, this.state.input)
  .then(response => this.faceDisplayBox(this.faceDetectiongBox(response)))
  .catch(err => console.log(err));
}



  render() {
    return (
      <div className="App">
        {/* <Particles className="particles" params = {particlesOptions} /> */}
        <Navigation />
        <Logo />
        <Rank />
        <ImageLinkForm
        onInputChange={this.onInputChange} 
        onButtonSubmit={this.onButtonSubmit}
        />
        <FaceRecognition 
        box={this.state.box}
        imageUrl={this.state.imageUrl}
        />
      </div>
    );
  }
}

export default App;
