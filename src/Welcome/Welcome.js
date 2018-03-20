import React, { Component } from 'react';
import './Welcome.css';
import { Link } from 'react-router-dom';

class Welcome extends Component {
  render() {
    return (
      <div className="Welcome">
        <p>Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Nam nibh. 
        Nunc varius facilisis eros. Sed erat. In in velit quis arcu ornare laoreet. 
        Curabitur adipiscing luctus massa. Integer ut purus ac augue commodo commodo. 
        Nunc nec mi eu justo tempor consectetuer.<br/></p>
        <Link to="/search">
          <button id="beginButton" type="button" class="ordinaryButton">Create Dinner</button>
        </Link>
      </div>
    );
  }
}

export default Welcome;
