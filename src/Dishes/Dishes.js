import React, {Component} from 'react';
import './Dishes.css';
//import logo from 'https://people.kth.se/~davidtra/';
// Alternative to passing the moderl as the component property, 
// we can import the model instance directly
import {modelInstance} from '../data/DinnerModel';
import { Link } from 'react-router-dom';

class Dishes extends Component {
  constructor(props) {
    super(props);
    // We create the state to store the various statuses
    // e.g. API data loading or error 
    this.handleDropdownChange = this.handleDropdownChange.bind(this)
    this.handleInputChange = this.handleInputChange.bind(this)
    this.refresh = this.refresh.bind(this)
    this.state = {
      status: 'INITIAL',
      type: '',
      searchValue: ''
    }
  }

  refresh() {
    modelInstance.getAllDishes(this.state.type, this.state.searchValue).then(dishes => {
      this.setState({
        status: 'LOADED',
        dishes: dishes.results
      })
    }).catch(() => {
      this.setState({
        status: 'ERROR'
      })
    })
  }

  // this methods is called by React lifecycle when the 
  // component is actually shown to the user (mounted to DOM)
  // that's a good place to call the API and get the data
  componentDidMount = () => {
    // when data is retrieved we update the state
    // this will cause the component to re-render

    this.timer = null;
    this.refresh();
  }

  handleDropdownChange(e) {
    this.setState({
      status: 'INITIAL',
      type: e.target.value
    }, this.update)
  }

  handleInputChange(e) {

    clearTimeout(this.timer);

    this.state.searchValue = e.target.value;
    this.setState({
      status: 'INITIAL',
    })

    this.timer = setTimeout(() => this.update(), 400);
  }

  refresh() {
    modelInstance.getAllDishes(this.state.type, this.state.searchValue).then(dishes => {
      this.setState({
        status: 'LOADED',
        dishes: dishes.results
      })
    }).catch(() => {
      this.setState({
        status: 'ERROR'
      })
    })
  }

  render() {
    let dishesList = null;
    // depending on the state we either generate
    // useful message to the user or show the list
    // of returned dishes
    switch (this.state.status) {
      case 'INITIAL':
        dishesList = <img src={"https://the-oak.co.uk/images/loading/loading.gif"}/>
        break;
      case 'LOADED':

        if (this.state.dishes.length == 0) {
          dishesList = <em>No matches.</em>
        }

        else {
          dishesList = this.state.dishes.map((dish) =>
          <Link to={`/details/${dish.id}`} key={dish.id}>
            <div className="dishItemDiv">
              <div className="dishImgDiv"><img alt="" src={"https://spoonacular.com/recipeImages/" + dish.image}/></div>
              <div className="dishTitle">{dish.title}</div>
            </div>
          </Link>
        )
        }
        
        break;
      case 'ERROR':
        dishesList = <em>Error!</em>
      default:
        dishesList = <b>Failed to load data, please try again</b>
        break;
    }

    return (
      <div className="Dishes">
        <div className="row">
          <div className="heading">Dishes</div>
        </div>
        <div className="row">
          <div id="searchBar">
            <input onChange={this.handleInputChange} id="searchForDish" placeholder="Search for a dish..."/>
            <select onChange={this.handleDropdownChange} id="searchDishType">
              <option value="">All dishes</option>
              <option value="Appetizer">Appetizer</option>
              <option value="Main Course">Main Course</option>
              <option value="Dessert">Dessert</option>
              <option value="Salad">Salad</option>
              <option value="Side Dish">Side Dish</option>
              <option value="Bread">Bread</option>
              <option value="Breakfast">Breakfast</option>
              <option value="Soup">Soup</option>
              <option value="Beverage">Beverage</option>
              <option value="Sauce">Sauce</option>
              <option value="Drink">Drink</option>
            </select>
          </div>
        </div>
        <div className="dishItems">{dishesList}</div>
        
      </div>
    );
  }
}

export default Dishes;
