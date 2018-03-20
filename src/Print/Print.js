import React, { Component } from 'react';
import './Print.css';
import { Link } from 'react-router-dom';

class Print extends Component {

  constructor(props) {
    super(props)
    
    // we put on state the properties we want to use and modify in the component
    this.state = {
      numberOfGuests: this.props.model.getNumberOfGuests(),
      menu: this.props.model.getSelectedDishes()
    }
  }

  // this methods is called by React lifecycle when the 
  // component is actually shown to the user (mounted to DOM)
  // that's a good place to setup model observer
  componentDidMount() {
    this.props.model.addObserver(this)
  }

  // this is called when component is removed from the DOM
  // good place to remove observer
  componentWillUnmount() {
    this.props.model.removeObserver(this)
  }

  // in our update function we modify the state which will
  // cause the component to re-render
  update() {
    this.setState({
      numberOfGuests: this.props.model.getNumberOfGuests(),
      menu: this.props.model.getSelectedDishes(),
    })
  }
  // our handler for the input's on change event
  onNumberOfGuestsChanged = (e) => {
    this.props.model.setNumberOfGuests(+e.target.value)
  }

  render() {

    let selectedDishes = this.state.menu.map((dish) =>
      <div className="row">
        <div className="col-sm-6"><img alt="" src={dish.image}/>{dish.title}</div>
        <div className="col-sm-6">{dish.instructions}</div>
      </div>
    )

    return (
      <div className="Print">
        <div className="heading">Dinner for {this.state.numberOfGuests} guests</div>
        <div className="buttons">
          <Link to="/search">
            <button className="primary-btn">Go back to edit menu</button>
          </Link>
          <Link to="/search">
            <button className="primary-btn">Print full recipe</button>
          </Link>
        </div>
        <div>{selectedDishes}</div>
        <div className="totalPrice">Total price for dinner: ${Math.round(this.props.model.getTotalMenuPrice())/100}</div>
        
      </div>
    );
  }
}

export default Print;
