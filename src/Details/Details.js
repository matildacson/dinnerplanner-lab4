import React, { Component } from 'react';
import './Details.css';
import { Link } from 'react-router-dom';
import Sidebar from '../Sidebar/Sidebar';
import Ingredients from '../Ingredients/Ingredients';

class Details extends Component {

  render() {
    return (
      <div className="Details">
      	<div className="row">
      		<div className="col-sm-3">
      			<Sidebar model={this.props.model} />
      		</div>
      		<div className="col-sm-9">
      			<Ingredients model={this.props.model} />
      		</div>
      	</div>
      </div>
    );
  }
}

export default Details;
