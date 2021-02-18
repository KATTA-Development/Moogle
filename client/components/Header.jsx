import React, { Component } from "react";
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import { faHeart as filledHeart } from '@fortawesome/free-solid-svg-icons';


class Header extends Component {

  render() {

    const { query, updateQuery, querySearch } = this.props;

    return(
        <div className="Header">
            <div className="sample-demo">
              <div id="movie-logo-png">
                <img src="../movie-logo.png"></img>
              </div>
              <div className="SavedMoviesLink"><Link to="/saved">
                <div className="SavedMoviesLinkAlignItems">
                  <span className="mr-2 adjustHeartIcon">
                    <FontAwesomeIcon icon={filledHeart} size="xs"/>
                  </span>
                  <p className="SavedMoviesLinkText">
                    Saved Movies
                  </p>
                </div>
                </Link></div>
            </div>
            <div>
              <input onChange={updateQuery} value={query} className="search-input" type="text"></input>
              <Link to="/"><button onClick={querySearch} className="SearchButton"><FontAwesomeIcon icon={faSearch} size="1x"/></button></Link>
            </div>
            
        </div>
    )
  }
}

export default Header;