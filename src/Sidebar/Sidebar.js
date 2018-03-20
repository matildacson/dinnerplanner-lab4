import React, { Component } from 'react';
import './Sidebar.css';
import { Link } from 'react-router-dom';
class Sidebar extends Component {

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

    console.log(this.state.menu);
    let selectedDishes = this.state.menu.map((dish) =>
      <tr key={dish.id}>
        <td className="buttontd"><button onClick={ () => this.props.model.removeDishFromMenu(dish.id)}><img src='/images/remove-symbol.png'/></button></td>
        <td>{dish.title}</td>
        <td className="pricetd">{Math.round(dish.pricePerServing*this.state.numberOfGuests)/100} $</td>
      </tr>
    )
    
    return (
      <div className="Sidebar">
        <div className="heading">My dinner</div>
        <p className="chooseNumberOfGuests">
        How many guests? <br/><input value={this.state.numberOfGuests} onChange={this.onNumberOfGuestsChanged}/>
        </p>
        <table><tbody>{selectedDishes}</tbody></table>
        <div className="totalPrice">Total price: ${Math.round(this.props.model.getTotalMenuPrice())/100}</div>
        <Link to="/overview">
          <button className="ordinaryButton">Create menu</button>
        </Link>
      </div>
    );
  }
}

export default Sidebar;
