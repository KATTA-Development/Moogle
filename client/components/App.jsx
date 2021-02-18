import React, { Component } from "react";
import "../stylesheets/App.scss"
import Home from "../components/Home";
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import MainContainer from "./MainContainer";
import MovieDetails from "./MovieDetails";

class App extends Component {

  constructor() {
    super();

    this.state = { 
      query: '',
      results: [],
      savedList: [],
      title: '',
      searchCount: 0,
    }

    this.querySearch = this.querySearch.bind(this);
    this.updateQuery = this.updateQuery.bind(this);
    this.clearResults = this.clearResults.bind(this);
    this.updateSavedList = this.updateSavedList.bind(this);
    this.incrementSearchCount = this.incrementSearchCount.bind(this);
  }

  componentDidMount() {
    this.updateSavedList();
  }

  updateSavedList() {
    fetch(`/api/userSavedList`, {
      method: 'GET',
      header: {
        'Content-Type': 'application/json; charset="UTF-8"',
      }
     })
      .then((data) => data.json())
      .then(data => {
        console.log(data);
        this.setState((state) => {

          let newData = [];
          data.forEach(fav => {
            let newObj = {};
            newObj.Title = fav.title;
            newObj.imdbID = fav.imdb_film_id;
            newObj.Year = fav.release_date.substring(7);
            newObj.Poster = fav.poster;
            newData.push(newObj);
          })
          return {
            ...state,
            savedList: newData
          }
        })
      })
  }

  clearResults() {
    this.setState(state => {
      return {
        query: '',
        results: []
      }
    })
  }

  updateQuery(event) {
    const { value } = event.target;
    this.setState(state => {
      return {
        ...state, 
        query: value,
      }
    })
  }

  querySearch(event) {
    //event.preventDefault();

    // Make get api request to backend route
    let query = this.state.query;

     fetch(`/api/search/${query}`, {
      method: 'GET',
      header: {
        'Content-Type': 'application/json; charset="UTF-8"',
      }
     })
      .then((data) => {
        console.log('data', data)
        return data.json();
      })
      .then(movieData => {
        console.log('movieData:', movieData);
        this.setState((state) => {
          return {
            query: '',
            results: movieData,
            title: 'Search Results'
          }
        })
      })
      .catch(error => {
        console.log(error)
      })

      //Update the number of searches:
      this.incrementSearchCount();
  }

  incrementSearchCount () {
    this.setState((state) => {
      return {
        ...state,
        searchCount: this.state.searchCount + 1
      }
    })
  }

  render() {
    return(
      <Router>
        <div className="App">
        <Switch>
          <Route path='/login' exact render={() => <Home 
            query={this.state.query} 
            updateQuery={this.updateQuery} 
            querySearch={this.querySearch}
          />}/>
          <Route path="/search" render={() => <MainContainer 
            query={this.state.query} 
            results={this.state.results}
            savedList={this.state.savedList}
            title={this.state.title}
            firstSearch={this.state.firstSearch}
            updateQuery={this.updateQuery} 
            querySearch={this.querySearch}
            updateSavedList={this.updateSavedList}
            clearResults={this.clearResults}
            searchCount={this.state.searchCount}
          />}/>
        </Switch>
        </div>
      </Router>
    )
  }
}

export default App;