import React, { Component } from 'react';
import './Ingredients.css';
import { Link } from 'react-router-dom';
import {
  FacebookShareButton,
  TwitterShareButton,
  PinterestShareButton,
  RedditShareButton,
  TumblrShareButton,
} from 'react-share';
import {
  FacebookIcon,
  TwitterIcon,
  PinterestIcon,
  RedditIcon,
  TumblrIcon,
} from 'react-share';

class Ingredients extends Component {

  constructor(props) {
    super(props)
    
    // we put on state the properties we want to use and modify in the component
    

    this.state = {
      status: 'INITIAL',
      activeDish: window.location.href.substr(window.location.href.lastIndexOf('/') + 1), 
      numberOfGuests: this.props.model.getNumberOfGuests()
   //   activeIngredients: this.props.model.getDishDetails({this.state.activeDish.id})
    }
  }

  componentDidMount = () => {
    // when data is retrieved we update the state
    // this will cause the component to re-render
    this.props.model.getDishDetails(this.state.activeDish).then(ingredients => {
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
    let content = null;
    let ingredientsList = null;
    let preparation = null;
    let title = null;
    let image = "https://the-oak.co.uk/images/loading/loading.gif";
  
    switch (this.state.status) {
      case 'INITIAL':
        content = <img src={image}/>;
        break;
      case 'LOADED':
        price = this.state.price;
        preparation = this.state.ingredients.instructions;
        title = this.state.ingredients.title;
        image = this.state.ingredients.image;
        ingredientsList = this.state.ingredients.extendedIngredients.map((ingredient) =>
          <tr key={ingredient.id}>
            <td>{Math.round(ingredient.amount*this.props.model.getNumberOfGuests()*100)/100}</td>
            <td>{ingredient.unit}</td>
            <td>{ingredient.name}</td>
          </tr>
        )
        content = 
        <div>
          <div className="row">
            <div className="heading">{title}</div>
          </div>
          <div className="row">
            <div className="col-sm-6">
              <Link to="/search">
                <button className="primary-btn">Go back to search</button>
              </Link>
              <div className="dishImg"><img alt="" src={image} /></div>
              <div className="dishPreparation"><p>{preparation}</p></div>
              <div className="row">
                <div className="col-xs-1"><FacebookShareButton url={window.location.href}><FacebookIcon size="32" round="true"/></FacebookShareButton></div>
                <div className="col-xs-1"><TwitterShareButton url={window.location.href}><TwitterIcon size="32" round="true"/></TwitterShareButton></div>
                <div className="col-xs-1"><PinterestShareButton url={window.location.href}><PinterestIcon size="32" round="true"/></PinterestShareButton></div>
                <div className="col-xs-1"><RedditShareButton url={window.location.href}><RedditIcon size="32" round="true"/></RedditShareButton></div>
                <div className="col-xs-1"><TumblrShareButton url={window.location.href}><TumblrIcon size="32" round="true"/></TumblrShareButton></div>
              </div>
            </div>
            <div className="col-sm-6">
              <div className="ingredientsList">
                <div className="heading">Ingredients for {this.state.numberOfGuests} guests</div>
                <table id="ingredientTable">
                  <tbody>
                   {ingredientsList}
                  </tbody>
                </table>
                <div className="totalPrice">Total price: ${Math.round(price*this.state.numberOfGuests)/100}</div>
                <Link onClick={ () => this.props.model.addDishToMenu(this.state.ingredients)} to="/search">
                  <button className="primary-btn">Add to menu</button>
                </Link>
              </div>
            </div>
          </div>
         </div>;
        
        break;
      default:
        ingredientsList = <tr><td>Failed to load data, please try again</td></tr>
        break;
    }

    return (
      <div className="Ingredients">
        {content}
      </div>

    );
  }
}

export default Ingredients;
