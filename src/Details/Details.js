import React, { Component } from 'react';
import './Details.css';
import { Link } from 'react-router-dom';
import Sidebar from '../Sidebar/Sidebar';
import Ingredients from '../Ingredients/Ingredients';

class Details extends Component {

  render() {
    return (
      <div className="Details">
        <Sidebar model={this.props.model} />
        <Ingredients model={this.props.model} />
      </div>
    );
  }
}

export default Details;
