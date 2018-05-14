import React, { Component } from 'react';
import axios from 'axios';
import Smurfs from './Smurfs';

class SmurfForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      age: '',
      height: '',
    };
  }

  // add any needed code to ensure that the smurfs collection exists on state and it has data coming from the server
  // Notice what your map function is looping over and returning inside of Smurfs.
  // You'll need to make sure you have the right properties on state and pass them down to props.

  addSmurf = event => {
    event.preventDefault();

    const { name, age, height } = this.state;
    const smurfData = { name, age, height };
    this.props.addSmurf(smurfData);
    this.setState({
      name: '',
      age: '',
      height: '',
    });
  }

  handleInputChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  buttonSubmit = () => {
    const { name, age, height, id } = this.state
    axios.post('http://localhost:3333/smurfs', { name, age, height, id })
      .then( (response) => {
        this.setState({ smurfs: response.data, name: '', age: '', height: '', id: '' })
      })
  }

  render() {
    return (
      <div className="SmurfForm">
        <form onSubmit={this.addSmurf}>
          <input
            onChange={this.handleInputChange}
            placeholder="Enter name"
            value={this.state.name}
            name="name"
          />
          <input
            onChange={this.handleInputChange}
            placeholder="Enter age"
            value={this.state.age}
            name="age"
          />
          <input
            onChange={this.handleInputChange}
            placeholder="Enter height"
            value={this.state.height}
            name="height"
          />
          <button type="submit" onClick={this.buttonSubmit}>Add to the village</button>
        </form>
        <Smurfs smurfs={this.state.smurfs} />
      </div>
    );
  }
}

export default SmurfForm;