import React, { Component } from 'react';
import './App.css';
import { Route } from 'react-router-dom';
import Welcome from './Welcome/Welcome';
import { modelInstance } from './data/DinnerModel'
import SelectDish from "./SelectDish/SelectDish";
import Details from "./Details/Details";
import Overview from "./Overview/Overview";
import Print from "./Print/Print";

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      title: 'Dinner Planner',
    }
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">{this.state.title}</h1>
        </header>
        <div className="App-content">

          {/* We rended diffrent component based on the path */}
          <Route exact path="/" component={Welcome}/>
          <Route path="/search" render={() => <SelectDish model={modelInstance} />} />
          <Route path="/details" render={() => <Details model={modelInstance} />} />
          <Route path="/overview" render={() => <Overview model={modelInstance} />} />
          <Route path="/print" render={() => <Print model={modelInstance} />} />
        </div>
      </div>
    );
  }
}

export default App;
