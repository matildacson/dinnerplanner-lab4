import React, { Component } from 'react';
import './Ingredients.css';
import { Link } from 'react-router-dom';

class Ingredients extends Component {

  constructor(props) {
    super(props)
    
    // we put on state the properties we want to use and modify in the component
    this.state = {
      activeDish: this.props.model.getActiveDish(), 
   //   activeIngredients: this.props.model.getDishDetails({this.state.activeDish.id})
    }
  }

  render() {
    let activeIngredients = this.props.model.getDishDetails().extendedIngredients
    console.log(activeIngredients)
    return (
      <div className="Ingredients">
        <div>
          <div className="dishName">{this.state.activeDish.title}</div>
          <div className="dishImg">Image</div>
          <div className="dishPreparation"></div>
          <Link to="/search">
            <button>Go back to search</button>
          </Link>
        </div>
        <div>
          <div className="ingredientsList">
            <div className="ingredientsTitle"></div>
            <table>
              <tr>
                <td>Hej</td>
                <td>Amount</td>
                <td>Ingredient</td>
              </tr>
            </table>
            <div className="totalPrice"></div>
            <Link to="/search">
              <button>Add to menu</button>
            </Link>
          </div>
        </div>
      </div>

    );
  }
}

export default Ingredients;
