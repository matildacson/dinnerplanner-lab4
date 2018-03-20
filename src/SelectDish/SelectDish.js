import React, { Component } from 'react';
import './SelectDish.css';
import Sidebar from '../Sidebar/Sidebar';
import Dishes from '../Dishes/Dishes';

class SelectDish extends Component {
  render() {
    return (
      <div className="SelectDish">
      	<div className="row">
      		<div className="col-sm-3">
      			<Sidebar model={this.props.model}/>
      		</div>
      		<div className="col-sm-9">
      			<Dishes id={this.props.dish}/>
      		</div>
      	</div> 
 
      </div>
    );
  }
}

export default SelectDish;
