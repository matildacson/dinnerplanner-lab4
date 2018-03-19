import React, { Component } from 'react';
import './Ingredients.css';
import { Link } from 'react-router-dom';

class Ingredients extends Component {

  constructor(props) {
    super(props)
    
    // we put on state the properties we want to use and modify in the component
    this.state = {
      status: 'INITIAL',
      activeDish: this.props.model.getActiveDish(), 
      numberOfGuests: this.props.model.getNumberOfGuests()
   //   activeIngredients: this.props.model.getDishDetails({this.state.activeDish.id})
    }
  }

  componentDidMount = () => {
    // when data is retrieved we update the state
    // this will cause the component to re-render
    this.props.model.getDishDetails(this.state.activeDish.id).then(ingredients => {
      this.setState({
        status: 'LOADED',
        ingredients: ingredients,
        price: ingredients.pricePerServing

      })
    }).catch(() => {
      this.setState({
        status: 'ERROR'
      })
    })
    this.props.model.addObserver(this)
  }
  
  update() {
    this.setState({
      numberOfGuests: this.props.model.getNumberOfGuests()
    })
  }


  render() {
    let price = null;
    let ingredientsList = null;
    switch (this.state.status) {
      case 'INITIAL':
        ingredientsList = <tr><td>Loading..</td></tr>
        break;
      case 'LOADED':
        price = this.state.price;
        ingredientsList = this.state.ingredients.extendedIngredients.map((ingredient) =>
          <tr key={ingredient.id}>
            <td>{ingredient.amount*this.props.model.getNumberOfGuests()}</td>
            <td>{ingredient.unit}</td>
            <td>{ingredient.name}</td>
          </tr>
        )
        
        break;
      default:
        ingredientsList = <tr><td>Failed to load data, please try again</td></tr>
        break;
    }

    return (
      <div className="Ingredients">
        <div className="col-sm-6">
          <div className="col">
            <div className="heading">{this.state.activeDish.title}</div>
            <Link to="/search">
              <button className="primary-btn">Go back to search</button>
            </Link>
            <div className="dishImg"><img alt="" src={"https://spoonacular.com/recipeImages/" + this.state.activeDish.image } /></div>
            <div className="dishPreparation">Här ska det stå en förklaringstext och om den är för lång så kommer det inte se bra ut så det borde jag fixa.</div>
          </div>
        </div>
        <div className="col-sm-6">
          <div className="col">
            <div className="ingredientsList">
              <div className="heading">Ingredients for {this.state.numberOfGuests} guests</div>
              <table id="ingredientTable">
                <tbody>
                 {ingredientsList}
                </tbody>
              </table>
              <div className="totalPrice">Total price: {price*this.state.numberOfGuests}</div>
              <Link onClick={ () => this.props.model.addDishToMenu(this.state.activeDish, this.state.ingredients)} to="/search">
                <button className="primary-btn">Add to menu</button>
              </Link>
            </div>
          </div>
        </div>
      </div>

    );
  }
}

export default Ingredients;
