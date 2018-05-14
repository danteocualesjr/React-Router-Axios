import React, { Component } from 'react';
import axios from 'axios';
import { Route } from 'react-router-dom'; 

import './App.css';
import SmurfForm from './components/SmurfForm';
import Smurfs from './components/Smurfs';
import Smurf from './components/Smurf';
import Header from './components/Header';

const URL = 'http://localhost:3333/smurfs';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      smurfs: [],
    };
  }

  componentDidMount() {
    const myPromise = axios.get(URL);

    myPromise
      .then(response => {
        this.setState({ smurfs: response.data })
    })
      .catch(err => {
        console.error(err);
    });
  }

  addSmurf = smurf => {
    const myPromise = axios.post(URL, smurf);
    myPromise
      .then(response => {
        this.setState({ smurfs: response.data });
      })
      .catch(err => {
        console.error(err)
      });
  }

  removeSmurf = id => {
    const myPromise = axios.delete(`${URL}/${id}`);
    myPromise
      .then(response => {
        this.setState({ smurfs: response.data });
      })
      .catch(err => {
        console.error(err);
      });
  }

  editSmurf = smurfEdits => {
    console.log(smurfEdits);
  }

  render() {
    return (
      <div className="App">
        <Route exact path="/" component={Header} />
        <Route path="/smurfs" render={props => {
          return (
            <div>
              <SmurfForm {...props} addSmurf={this.addSmurf} />
              <Smurfs {...props} smurfs={this.state.smurfs} removeSmurf={this.removeSmurf}/>
            </div> 
          )
        }} />
        <Route path="/profile" render={props => {
          return (
            <div>
              <SmurfForm {...props} addSmurf={this.editSmurf} />
              <Smurf {...props} smurfs={this.state.smurfs} showDelete={true}/>
            </div>
          )
        }} />
      </div>  
    );
  }
}

export default App;