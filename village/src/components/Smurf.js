import React from 'react';
import { Link } from 'react-router-dom';

class Smurf extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
       id: props.id,
       age: props.age,
       height: props.height,
       name: props.name,
       showDelete: props.showDelete
    };
  }
  
  componentDidMount() {
    if (Object.keys(this.props.match.params).length !== 0) {
  
      let smurf = {};
      console.log(this.props.smurfs);
      console.log(smurf);
    }
  }  

  render() {
    return (
      <div className="Smurf">
        <Link to={`/profile/${this.props.id}`}>
          <h3>{this.props.name}</h3>
        </Link>
        <strong>{this.props.height} tall</strong>
        <p>{this.props.age} smurf years old</p>
        {!this.props.showDelete ? <button onClick={() => this.props.removeSmurf(this.props.id)}>Remove {this.props.name} from village</button> : null}
      </div>
    );
  }
};

export default Smurf;