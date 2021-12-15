import React, { Component }  from 'react';
import Navigation from './components/navigation/Navigation.js'
import ImageLinkForm from './components/imagelinkform/imagelinkform.js'

import FaceRecognition from './components/facerecognition/facerecognition.js'

import Rank from './components/rank/rank.js'
import SignIn from './components/signin/signin.js'
import Register from './components/register/register.js'
import Logo from './components/logo/Logo.js'
import Particles from "react-tsparticles";
import 'tachyons';
import './App.css';
//import Clarifai from 'clarifai';

// const app = new Clarifai.App({
//  apiKey: '4e8a6087471d49c5a8ebd97bfc0f73d9'
// });


const particlesInit = (main) => {
    //console.log(main);
    // you can initialize the tsParticles instance (main) here, adding custom shapes or presets
  };

  const particlesLoaded = (container) => {
//    console.log(container);
  };

  const particlesOptions={
                                  
        //background: { color: {value: "#0d47a1", }, },
        fpsLimit: 60,
        interactivity: {
          events: {
            onClick: {
              enable: true,
              mode: "push",
            },
            onHover: {
              enable: true,
              mode: "repulse",
            },
            resize: true,
          },
          modes: {
            bubble: {
              distance: 500,
              duration: 2,
              opacity: 0.8,
              size: 40,
            },
            push: {
              quantity: 4,
            },
            repulse: {
              distance: 100,
              duration: 0.4,
            },
          },
        },
        particles: {
          color: {
            value: "#ffffff",
          },
          links: {
            color: "#ffffff",
            distance: 150,
            enable: true,
            opacity: 0.5,
            width: 1,
          },
          collisions: {
            enable: true,
          },
          move: {
            direction: "none",
            enable: true,
            outMode: "bounce",
            random: false,
            speed: 1,
            straight: false,
          },
          number: {
            density: {
              enable: true,
              value_area: 800,
            },
            value: 50,
          },
          opacity: {
            value: 0.25,
          },
          shape: {
            type: "square",
          },
          size: {
            random: false,
            value: 2,
          },
        }, 
        detectRetina: true,
      };


const initialState = {
      input: '',
      imageURL: '',
      box: {},
      route: 'signin',
      isSignedIn: false,
      user: {
          id: '',
          name: '',
          email: '',
          entries: 0,
          joined: ''
      }
    }

class App extends Component {

  constructor(){
    super();
    this.state = initialState;

  }

//loadUser function
loadUser = (data) => {
  this.setState({user: {
          id: data.id,
          name: data.name,
          email: data.email,
          entries: data.entries,
          joined: data.joined
  }})

}

// componentDidMount(){
//   fetch('http://localhost:3000/')
//   .then(response=> response.json())
//   .then(console.log);
// }


  calculateFaceLocation = (data) =>{
    //console.log(data);
    const clarifaiFace = data.outputs[0].data.regions[0].region_info.bounding_box;
    const image = document.getElementById('inputimage');
    const width = Number(image.width);
    const height = Number(image.height);
    //console.log(width, height);
    return {
      leftCol: clarifaiFace.left_col * width,
      topRow: clarifaiFace.top_row * height,
      rightCol: width - (clarifaiFace.right_col * width),
      bottomRow: height - (clarifaiFace.bottom_row * height)
    }
  }

displayFaceBox = (box) => {
   // console.log(box);
    this.setState({box: box});

}

  onInputChange = (event) => {
    this.setState({input: event.target.value});

  }

//"f76196b43bbd45c99b4f3cd8e8b40a8a"

  onButtonSubmit = () => {

      this.setState({imageURL: this.state.input});
      fetch('http://localhost:3000/imageurl', {
            method: 'post',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
              input: this.state.input
            })
          })
        .then(response => response.json())
      .then(response => {if(response){
          fetch('http://localhost:3000/image', {
            method: 'put',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
              id: this.state.user.id
            })
          })
            .then(response => response.json())
            .then(count => {
              this.setState(Object.assign(this.state.user, {entries: count}))
            })
            .catch(console.log);
        }
        this.displayFaceBox(this.calculateFaceLocation(response))
      })
      .catch(err => console.log(err));
  }


  onRouteChange = (route) => {
    if(route === 'signout'){
      this.setState(initialState);
      }else if(route === 'home'){
      this.setState({isSignedIn:true});
    }
    this.setState({route: route}); //set's route state to home
  }



  render(){
  return (
    <div className="App">

<Particles
      className ="particles"
      id="tsparticles"
      init={particlesInit}
      loaded={particlesLoaded}
      options={particlesOptions    }
    />

                <Navigation isSignedIn={this.state.isSignedIn}  onRouteChange={this.onRouteChange} />
                <Logo />

          {  this.state.route === 'home' 
                ? //if signin is true... return home screen
                <div>
                           <Rank 
                                  name={this.state.user.name} 
                                  entries={this.state.user.entries} />
                            <ImageLinkForm  
                                onInputChange = {this.onInputChange}   
                                onButtonSubmit = {this.onButtonSubmit}  
                                />
                             <FaceRecognition box={this.state.box } imageURL = {this.state.imageURL} /> 
                    </div>
              : // else signin or register

              (
                this.state.route === 'signin' 
                ? <SignIn  
                          loadUser={this.loadUser} 
                          onRouteChange={ this.onRouteChange } /> 
                : <Register loadUser={this.loadUser} 
                            onRouteChange={ this.onRouteChange } /> 
              )

              
                
                    
          }
    </div>
  );
}
}
export default App;
