import React, { Component } from "react";
import MovieTile from '../components/MovieTile';
import MovieDetails from '../components/MovieDetails';

class MoviesDisplay extends Component {

  componentDidMount() {
    this.props.updateSavedList();
  }

  render(props) {
    const { results, clearResults, title } = this.props; 

    // const results = this.props.results;
    const tiles = Array.isArray(results) ? results.map((result, index) => {
      return(<MovieTile key={index} 
                 title={result.Title.toUpperCase()} 
                 year={result.Year} 
                 imdbId={result.imdbID} 
                 url={result.Poster}
                 clearResults={clearResults}
                 />)
    }) : (<div className='no-results'><h3>Sorry, couldn't find that movie!</h3>
          <img src="https://media2.giphy.com/media/iGpkO05xWTl17Vhq6Y/giphy.gif"/></div>);
    return(
      <div>
      <h1 className="centerText">{title}</h1>
        <div className="MoviesDisplay">
          { tiles }
        </div>
      </div>
    )
  }
}

export default MoviesDisplay;
