const httpOptions = { 
  headers: {'X-Mashape-Key': 'Qu9grxVNWpmshA4Kl9pTwyiJxVGUp1lKzrZjsnghQMkFkfA4LB'}
};

const DinnerModel = function () {

  let numberOfGuests = 4;
  let observers = [];
  let activeDish = "";
  let selectedDishes = [];
  let selectedDishesDetails = [];


  this.setActiveDish = function (dish) {
    activeDish = dish;
  };

  this.getActiveDish = function () {
    return activeDish;
  };

  this.getSelectedDishes = function () {
    return selectedDishes;
  };

  this.getSelectedDishesDetails = function () {
    return selectedDishesDetails;
  };

  this.setNumberOfGuests = function (num) {
    if(num === parseInt(num, 10)){
      numberOfGuests = num;
      notifyObservers();

    }
  };

  this.getNumberOfGuests = function () {
    return numberOfGuests;
  };

  this.getDishesAndDetails = function() {
    let result = [];
    for (var i = 0; i < selectedDishes.length; i++) {
      result.push({
        "key" : selectedDishes[i],
        "details" : selectedDishesDetails[i]
      });
    }
    return result;
  }


  // API Calls

  this.getAllDishes = function (type, searchValue) {
    const url = "https://spoonacular-recipe-food-nutrition-v1.p.mashape.com/recipes/search?type="+type+"&number=100&query="+searchValue;
    return fetch(url, httpOptions)
      .then(processResponse)
      .catch(handleError)
  }

  this.getDishDetails = function(id) {
    const url = 'https://spoonacular-recipe-food-nutrition-v1.p.mashape.com/recipes/'+id+'/information'
    return fetch(url, httpOptions)
      .then(processResponse)
      .catch(handleErrorTwo)
  }

  this.addDishToMenu = function(dish, ingredients) {
    if (!selectedDishes.some(d => d.id == dish.id)) {
      selectedDishesDetails.push(ingredients);
      selectedDishes.push(dish);
      notifyObservers();
    }
    
  }

  //Removes dish from menu
  this.removeDishFromMenu = function(id) {
    for(var i = 0; i < selectedDishes.length; i++) {
      if(selectedDishes[i].id === id){
        selectedDishes.splice(i, 1);
        selectedDishesDetails.splice(i, 1);
        notifyObservers();
      }
    }
  }
  
  // API Helper methods

  const processResponse = function (response) {
    if (response.ok) {
      return response.json()
    }
    throw response;
  }
  
  const handleError = function (error) {
    if (error.json) {
      error.json().then(error => {
        console.error('getAllDishes() API Error:', error.message || error)
      })
    } else {
      console.error('getAllDishes() API Error:', error.message || error)
    }
  }

  const handleErrorTwo = function (error) {
    if (error.json) {
      error.json().then(error => {
        console.error('getDishDetails() API Error:', error.message || error)
      })
    } else {
      console.error('getDishDetails() API Error:', error.message || error)
    }
  }


  // Observer pattern

  this.addObserver = function (observer) {
    observers.push(observer);
  };

  this.removeObserver = function (observer) {
    observers = observers.filter(o => o !== observer);
  };

  const notifyObservers = function () {
    observers.forEach(o => o.update());
  };
};

export const modelInstance = new DinnerModel();
